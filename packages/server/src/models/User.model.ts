import mongoose, { Document, Schema } from 'mongoose'

export interface ResetPassword {
  token: string | null
  expires: Date | null
}

export interface PurchasedInfo {
  isPurchased: boolean
  purchasedAt: Date | null
  expiresAt: Date | null
}

export interface IUser extends Document {
  email: string
  password: string
  nickname: string
  resetPassword: ResetPassword
  purchasedInfo: PurchasedInfo
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resetPassword: {
    token: { type: String, default: null },
    expires: { type: Date, default: null },
  },
  purchasedInfo: {
    isPurchased: { type: Boolean, default: false },
    purchasedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: null },
  },
})

export default mongoose.model<IUser>('User', UserSchema)
