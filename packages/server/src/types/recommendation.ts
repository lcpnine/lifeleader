import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Recommendation {
  @Field()
  text: string
}

export default Recommendation
