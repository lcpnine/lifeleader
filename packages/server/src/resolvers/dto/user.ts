import { Field, ObjectType } from 'type-graphql'
import { User } from '../../types/user'

@ObjectType()
export class SignInSuccessResponse {
  @Field()
  token: string

  @Field(() => User)
  user: User
}

@ObjectType()
export class SignInFailResponse {
  @Field()
  message: string
}

@ObjectType()
export class SignUpResponse {
  @Field()
  message: string
}
