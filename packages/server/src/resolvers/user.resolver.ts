import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { COOKIE_DOMAIN, IS_DEV, ONE_DAY, ONE_HOUR } from '../constant/common'
import {
  createEmailVerificationTemplate,
  createResetPasswordTemplate,
} from '../constant/nodemailer'
import UserModel, { IUser } from '../models/User.model'
import { MyContext } from '../types/common'
import { User } from '../types/user'
import { isPasswordValid } from '../utils/common'
import { sendEmail } from '../utils/nodemailer'
import {
  FindPasswordFailureType,
  FindPasswordResponse,
  ResetPasswordFailureType,
  ResetPasswordResponse,
  SignInFailureType,
  SignInResponse,
  SignUpFailureType,
  SignUpResponse,
  VerifyEmailFailureType,
  VerifyEmailResponse,
} from './dto/user.dto'

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg('_id') _id: string): Promise<IUser | null> {
    return await UserModel.findById(_id)
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('keepSignedIn') keepSignedIn: boolean = false,
    @Ctx() ctx: MyContext
  ): Promise<typeof SignInResponse> {
    const user = await UserModel.findOne({ email })
    if (!user)
      return {
        errorType: SignInFailureType.USER_NOT_FOUND,
      }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid)
      return {
        errorType: SignInFailureType.WRONG_PASSWORD,
      }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: keepSignedIn ? '10y' : '1h',
      }
    )
    ctx.res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      domain: COOKIE_DOMAIN,
      secure: !IS_DEV,
      maxAge: keepSignedIn ? 10 * 365 * ONE_DAY : ONE_HOUR,
    })

    return { token, user: user.toJSON() }
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() ctx: MyContext): Promise<boolean> {
    ctx.res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      domain: COOKIE_DOMAIN,
      secure: !IS_DEV,
    })
    return true
  }

  @Mutation(() => SignUpResponse)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('passwordConfirm') passwordConfirm: string,
    @Arg('nickname') nickname: string
  ): Promise<typeof SignUpResponse> {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) return { errorType: SignUpFailureType.EXISTING_EMAIL }

    const isValidPassword = isPasswordValid(password)
    if (!isValidPassword || password !== passwordConfirm) {
      return { errorType: SignUpFailureType.INVALID_PASSWORD }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const emailToken = crypto.randomBytes(20).toString('hex')
    const emailVerification = {
      token: emailToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      isVerified: false,
    }

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      nickname,
      emailVerification,
    })
    await newUser.save()
    await sendEmail(
      email,
      'Verify Email',
      createEmailVerificationTemplate(nickname, emailToken)
    )

    return { isMailSent: true }
  }

  @Mutation(() => VerifyEmailResponse)
  async verifyEmail(
    @Arg('token') token: string
  ): Promise<typeof VerifyEmailResponse> {
    const user = await UserModel.findOne({
      'emailVerification.token': token,
      'emailVerification.expiresAt': { $gt: new Date() },
    })

    if (!user) return { errorType: VerifyEmailFailureType.INVALID_TOKEN }
    if (user.emailVerification.isVerified)
      return {
        errorType: VerifyEmailFailureType.VERIFIED_EMAIL,
      }

    user.emailVerification.isVerified = true
    await user.save()

    return { success: true }
  }

  @Mutation(() => FindPasswordResponse)
  async findPassword(
    @Arg('email') email: string
  ): Promise<typeof FindPasswordResponse> {
    const user = await UserModel.findOne({ email })
    if (!user) return { errorType: FindPasswordFailureType.USER_NOT_FOUND }

    try {
      const token = crypto.randomBytes(20).toString('hex')
      user.resetPassword.token = token
      user.resetPassword.expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      await user.save()

      await sendEmail(
        email,
        'Password Reset',
        createResetPasswordTemplate(user.nickname, token)
      )

      return { success: true }
    } catch (e) {
      console.error(e)
      return { errorType: FindPasswordFailureType.SERVER_ERROR }
    }
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Arg('newPasswordConfirm') newPasswordConfirm: string
  ): Promise<typeof ResetPasswordResponse> {
    if (newPassword !== newPasswordConfirm) {
      return { errorType: ResetPasswordFailureType.INVALID_PASSWORD }
    }

    if (!isPasswordValid(newPassword)) {
      return { errorType: ResetPasswordFailureType.INVALID_PASSWORD }
    }

    const user = await UserModel.findOne({
      'resetPassword.token': token,
      'resetPassword.expiresAt': { $gt: new Date() },
    })

    if (!user) return { errorType: ResetPasswordFailureType.INVALID_TOKEN }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.resetPassword.token = null
    user.resetPassword.expiresAt = null
    await user.save()

    return { success: true }
  }
}
