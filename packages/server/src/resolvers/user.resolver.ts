import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { COOKIE_DOMAIN, IS_DEV } from '../constant/common'
import {
  createEmailVerificationTemplate,
  createResetPasswordTemplate,
} from '../constant/nodemailer'
import UserModel, { IUser } from '../models/User.model'
import { MyContext } from '../types/common'
import { User } from '../types/user'
import { isPasswordValid } from '../utils/common'
import { sendEmail } from '../utils/nodemailer'
import { SignInResponse, SignUpResponse } from './dto/user'

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
    if (!user) return { displayMessage: 'User not found' }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return { displayMessage: 'Invalid password' }

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
      maxAge: keepSignedIn ? 10 * 365 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    })

    return { token, user: user.toJSON() }
  }

  @Mutation(() => User)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('passwordConfirm') passwordConfirm: string,
    @Arg('nickname') nickname: string
  ): Promise<SignUpResponse> {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) throw new Error('User already exists')

    const isValidPassword = isPasswordValid(password)
    if (!isValidPassword || password !== passwordConfirm) {
      throw new Error('Invalid password')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const emailToken = crypto.randomBytes(20).toString('hex')
    const emailVerification = {
      token: emailToken,
      expires: new Date(Date.now() + 60 * 60 * 1000),
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

    return { message: 'Verification email sent' }
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Arg('token') token: string): Promise<boolean> {
    const user = await UserModel.findOne({
      'emailVerification.token': token,
      'emailVerification.expires': { $gt: new Date() },
    })

    if (!user) throw new Error('Invalid or expired token')

    user.emailVerification.token = null
    user.emailVerification.expires = null
    user.emailVerification.isVerified = true
    await user.save()

    return true
  }

  @Mutation(() => Boolean)
  async findPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email })
    if (!user) return false

    const token = crypto.randomBytes(20).toString('hex')
    user.resetPassword.token = token
    user.resetPassword.expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    await user.save()

    await sendEmail(
      email,
      'Password Reset',
      createResetPasswordTemplate(user.nickname, token)
    )

    return true
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Arg('newPasswordConfirm') newPasswordConfirm: string
  ): Promise<boolean> {
    if (newPassword !== newPasswordConfirm) {
      throw new Error('Passwords do not match')
    }

    if (!isPasswordValid(newPassword)) {
      throw new Error('Invalid password')
    }

    const user = await UserModel.findOne({
      'resetPassword.token': token,
      'resetPassword.expires': { $gt: new Date() },
    })

    if (!user) throw new Error('Invalid or expired token')

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.resetPassword.token = null
    user.resetPassword.expires = null
    await user.save()

    return true
  }
}
