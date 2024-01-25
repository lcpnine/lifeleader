import {
  Field,
  ID,
  InputType,
  ObjectType,
  createUnionType,
  registerEnumType,
} from 'type-graphql'
import { BaseError } from './common.dto'

@InputType()
export class MandalaCellInput {
  @Field(() => [String], { nullable: true })
  goals?: string[]

  @Field(() => [String], { nullable: true })
  tasks?: string[]
}

@InputType()
export class CreateMandalaChartInput {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field(() => ID)
  userId: string

  @Field(() => MandalaCellInput)
  centerCell: MandalaCellInput

  @Field(() => [MandalaCellInput])
  surroundingCells: MandalaCellInput[]
}

@ObjectType()
export class CreateMandalaChartSuccess {
  @Field(() => ID)
  _id: string

  @Field()
  message: string
}

export enum CreateMandalaChartFailureType {
  INVALID_INPUT = 'INVALID_INPUT',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

registerEnumType(CreateMandalaChartFailureType, {
  name: 'CreateMandalaChartFailureType',
})

@ObjectType()
export class CreateMandalaChartFailure implements BaseError {
  @Field(() => CreateMandalaChartFailureType)
  errorType: CreateMandalaChartFailureType
}

export const CreateMandalaChartResponse = createUnionType({
  name: 'CreateMandalaChartResponse',
  types: () => [CreateMandalaChartSuccess, CreateMandalaChartFailure] as const,
  resolveType: (value: any) => {
    if ('_id' in value) {
      return CreateMandalaChartSuccess.name
    }
    return CreateMandalaChartFailure.name
  },
})
