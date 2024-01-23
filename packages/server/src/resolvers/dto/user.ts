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
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

registerEnumType(SignInFailureType, {
  name: 'SignInFailureType',
  valuesConfig: {
    USER_NOT_FOUND: {
      description: 'User not found',
    },
    INVALID_PASSWORD: {
      description: 'Invalid password',
    },
  },
})

@ObjectType()
export class SignInFailure implements BaseError {
  @Field()
  errorType: SignInFailureType
}

export const SignInResponse = createUnionType({
  name: 'SignInResponse',
  types: () => [SignInSuccess, BaseError] as const,
  resolveType: (value: any) => {
    if ('token' in value) {
      return SignInSuccess.name
    }
    return BaseError.name
  },
})

@ObjectType()
export class SignUpResponse {
  @Field()
  message: string
}
