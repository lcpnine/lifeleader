import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class MandalaCell {
  @Field(() => ID)
  _id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [String])
  goals: string[]

  @Field(() => [String])
  tasks: string[]
}

@ObjectType()
export class MandalaChart {
  @Field(() => ID)
  _id: string

  @Field(() => ID)
  userId: string

  @Field(() => MandalaCell)
  centerCell: MandalaCell

  @Field(() => [MandalaCell])
  surroundingCells: MandalaCell[]
}
