import mongoose, { Document, Schema } from 'mongoose'
import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class TokenInfo {
  @Field({ nullable: true })
  token: string | null

  @Field({ nullable: true })
  expires: Date | null

  @Field({ nullable: true })
  isVerified?: boolean
}

@ObjectType()
export class PurchasedInfo {
  @Field()
  isPurchased: boolean

  @Field({ nullable: true })
  purchasedAt: Date | null

  @Field({ nullable: true })
  expiresAt: Date | null
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  nickname: string

  // Note: Typically, you wouldn't expose sensitive fields like password via GraphQL
  // @Field()
  // password: string;

  @Field()
  createdAt: Date

  @Field(() => TokenInfo)
  emailVerification: TokenInfo

  @Field(() => TokenInfo)
  resetPassword: TokenInfo

  @Field(() => PurchasedInfo)
  purchasedInfo: PurchasedInfo
}

const tokenInfoSchema: Schema = new Schema({
  token: { type: String, default: null },
  expires: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
})

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emailVerification: { type: tokenInfoSchema, default: () => ({}) },
  resetPassword: { type: tokenInfoSchema, default: () => ({}) },
  purchasedInfo: {
    type: {
      isPurchased: { type: Boolean, default: false },
      purchasedAt: { type: Date, default: null },
      expiresAt: { type: Date, default: null },
    },
    default: () => ({}),
  },
})

export interface IUser extends Document {
  email: string
  password: string
  nickname: string
  emailVerification: TokenInfo
  resetPassword: TokenInfo
  purchasedInfo: PurchasedInfo
}

export default mongoose.model<IUser>('User', UserSchema)
