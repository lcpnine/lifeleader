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
export class SignUpResponse {
  @Field()
  message: string
}
