import {
  Field,
  ObjectType,
  createUnionType,
  registerEnumType,
} from 'type-graphql'
import { User } from '../../types/user'
import { BaseError } from './common.dto'

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

@ObjectType()
export class FindPasswordSuccess {
  @Field()
  success: boolean
}

export enum FindPasswordFailureType {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

registerEnumType(FindPasswordFailureType, {
  name: 'FindPasswordFailureType',
})

@ObjectType()
export class FindPasswordFailure implements BaseError {
  @Field(type => FindPasswordFailureType)
  errorType: FindPasswordFailureType
}

export const FindPasswordResponse = createUnionType({
  name: 'FindPasswordResponse',
  types: () => [FindPasswordSuccess, FindPasswordFailure] as const,
  resolveType: (value: any) => {
    if ('success' in value) {
      return FindPasswordSuccess.name
    }
    return FindPasswordFailure.name
  },
})

@ObjectType()
export class ResetPasswordSuccess {
  @Field()
  success: boolean
}

export enum ResetPasswordFailureType {
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_TOKEN = 'INVALID_TOKEN',
}

registerEnumType(ResetPasswordFailureType, {
  name: 'ResetPasswordFailureType',
})

@ObjectType()
export class ResetPasswordFailure implements BaseError {
  @Field(type => ResetPasswordFailureType)
  errorType: ResetPasswordFailureType
}

export const ResetPasswordResponse = createUnionType({
  name: 'ResetPasswordResponse',
  types: () => [ResetPasswordSuccess, ResetPasswordFailure] as const,
  resolveType: (value: any) => {
    if ('success' in value) {
      return ResetPasswordSuccess.name
    }
    return ResetPasswordFailure.name
  },
})

@ObjectType()
export class DeleteAccountSuccess {
  @Field()
  success: boolean
}

export enum DeleteAccountFailureType {
  INVALID_REQUEST = 'INVALID_REQUEST',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

registerEnumType(DeleteAccountFailureType, {
  name: 'DeleteAccountFailureType',
})

@ObjectType()
export class DeleteAccountFailure implements BaseError {
  @Field(type => DeleteAccountFailureType)
  errorType: DeleteAccountFailureType
}

export const DeleteAccountResponse = createUnionType({
  name: 'DeleteAccountResponse',
  types: () => [DeleteAccountSuccess, DeleteAccountFailure] as const,
  resolveType: (value: any) => {
    if ('success' in value) {
      return DeleteAccountSuccess.name
    }
    return DeleteAccountFailure.name
  },
})
