import {
  Field,
  ObjectType,
  createUnionType,
  registerEnumType,
} from 'type-graphql'
import { User } from '../../types/user'
import { BaseError } from './common'

@ObjectType()
export class SignInSuccess {
  @Field()
  token: string

  @Field(() => User)
  user: User
}

export enum SignInFailureType {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
}

registerEnumType(SignInFailureType, {
  name: 'SignInFailureType',
})

@ObjectType()
export class SignInFailure implements BaseError {
  @Field(type => SignInFailureType)
  errorType: SignInFailureType
}

export const SignInResponse = createUnionType({
  name: 'SignInResponse',
  types: () => [SignInSuccess, SignInFailure] as const,
  resolveType: (value: any) => {
    if ('token' in value) {
      return SignInSuccess.name
    }
    return SignInFailure.name
  },
})

@ObjectType()
export class SignUpSuccess {
  @Field()
  isMailSent: boolean
}

export enum SignUpFailureType {
  EXISTING_EMAIL = 'EXISTING_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

registerEnumType(SignUpFailureType, {
  name: 'SignUpFailureType',
})

@ObjectType()
export class SignUpFailure implements BaseError {
  @Field(type => SignUpFailureType)
  errorType: SignUpFailureType
}

export const SignUpResponse = createUnionType({
  name: 'SignUpResponse',
  types: () => [SignUpSuccess, SignUpFailure] as const,
  resolveType: (value: any) => {
    if ('isMailSent' in value) {
      return SignUpSuccess.name
    }
    return SignUpFailure.name
  },
})

@ObjectType()
export class VerifyEmailSuccess {
  @Field()
  success: boolean
}

export enum VerifyEmailFailureType {
  INVALID_TOKEN = 'INVALID_TOKEN',
  VERIFIED_EMAIL = 'VERIFIED_EMAIL',
}

registerEnumType(VerifyEmailFailureType, {
  name: 'VerifyEmailFailureType',
})

@ObjectType()
export class VerifyEmailFailure implements BaseError {
  @Field(type => VerifyEmailFailureType)
  errorType: VerifyEmailFailureType
}

export const VerifyEmailResponse = createUnionType({
  name: 'VerifyEmailResponse',
  types: () => [VerifyEmailSuccess, VerifyEmailFailure] as const,
  resolveType: (value: any) => {
    if ('success' in value) {
      return VerifyEmailSuccess.name
    }
    return VerifyEmailFailure.name
  },
})
