import mongoose, { Document, Schema } from 'mongoose'
import 'reflect-metadata'
import { PurchasedInfo, TokenInfo } from '../types/user'

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
