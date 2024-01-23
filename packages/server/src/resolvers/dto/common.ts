import { Field, ObjectType } from 'type-graphql'

export const BASE_ERROR = {
  errorType: 'SERVER_ERROR',
}

@ObjectType()
export class BaseError {
  @Field()
  errorType: string
}
