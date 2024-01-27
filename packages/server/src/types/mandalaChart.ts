import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class MandalaCell {
  @Field(() => ID)
  _id: string

  @Field(() => String)
  goal: string

  @Field(() => [String])
  tasks: string[]
}

@ObjectType()
export class MandalaChart {
  @Field(() => ID)
  _id: string

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => ID)
  userId: string

  @Field(() => Boolean)
  private: boolean

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  lastModifiedAt?: Date

  @Field(() => MandalaCell)
  centerCell: MandalaCell

  @Field(() => [MandalaCell])
  surroundingCells: MandalaCell[]
}
