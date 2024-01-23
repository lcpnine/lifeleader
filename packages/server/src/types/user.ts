import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class TokenInfo {
  @Field(() => String, { nullable: true })
  token: string | null

  @Field(() => Date, { nullable: true })
  expires: Date | null

  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean
}

@ObjectType()
export class PurchasedInfo {
  @Field()
  isPurchased: boolean

  @Field(() => Date, { nullable: true })
  purchasedAt: Date | null

  @Field(() => Date, { nullable: true })
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

  @Field(() => Date)
  createdAt: Date

  // Note: Typically, you wouldn't expose sensitive fields like password via GraphQL
  // @Field()
  // password: string;

  @Field(() => TokenInfo)
  emailVerification: TokenInfo

  @Field(() => TokenInfo)
  resetPassword: TokenInfo

  @Field(() => PurchasedInfo)
  purchasedInfo: PurchasedInfo
}
