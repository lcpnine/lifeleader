import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class BaseError {
  @Field()
  displayMessage: string
}
