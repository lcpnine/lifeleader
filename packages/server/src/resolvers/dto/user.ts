import { Field, ObjectType, createUnionType } from 'type-graphql'
import { User } from '../../types/user'
import { BaseError } from './common'

@ObjectType()
export class SignInSuccess {
  @Field()
  token: string

  @Field(() => User)
  user: User
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
