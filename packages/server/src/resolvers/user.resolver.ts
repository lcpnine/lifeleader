import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import {
  createEmailVerificationTemplate,
  createResetPasswordTemplate,
} from '../constant/nodemailer'
import UserModel, { IUser } from '../models/User.model'
import { User } from '../types/user'
import { isPasswordValid } from '../utils/common'
import { sendEmail } from '../utils/nodemailer'

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: string): Promise<IUser | null> {
    return await UserModel.findById(id)
  }

  @Mutation(() => String)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const user = await UserModel.findOne({ email })
    if (!user) throw new Error('User not found')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password')

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    )

    return token
  }

  @Mutation(() => User)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('passwordConfirm') passwordConfirm: string,
    @Arg('nickname') nickname: string
  ): Promise<IUser> {
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

    return newUser
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string
  ): Promise<boolean> {
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
}
