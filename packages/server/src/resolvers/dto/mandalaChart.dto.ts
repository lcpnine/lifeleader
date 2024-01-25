import {
  Field,
  ID,
  InputType,
  ObjectType,
  createUnionType,
  registerEnumType,
} from 'type-graphql'
import { MandalaChart } from '../../types/mandalaChart'
import { BaseError } from './common.dto'

@InputType()
export class MandalaCellInput {
  @Field()
  goal: string

  @Field(() => [String])
  tasks: string[]
}

@InputType()
export class GetMandalaChartInput {
  @Field(() => ID)
  mandalaChartId: string
}

@ObjectType()
export class GetMandalaChartSuccess {
  @Field(() => MandalaChart)
  mandalaChart: MandalaChart
}

export enum GetMandalaChartFailureType {
  CHART_NOT_FOUND = 'CHART_NOT_FOUND',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SERVER_ERROR = 'SERVER_ERROR',
}

registerEnumType(GetMandalaChartFailureType, {
  name: 'GetMandalaChartFailureType',
})

@ObjectType()
export class GetMandalaChartFailure implements BaseError {
  @Field(() => GetMandalaChartFailureType)
  errorType: GetMandalaChartFailureType
}

export const GetMandalaChartResponse = createUnionType({
  name: 'GetMandalaChartResponse',
  types: () => [GetMandalaChartSuccess, GetMandalaChartFailure] as const,
  resolveType: (value: any) => {
    if ('mandalaChart' in value) {
      return GetMandalaChartSuccess.name
    }
    return GetMandalaChartFailure.name
  },
})

@InputType()
export class CreateMandalaChartInput {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  private: boolean

  @Field(() => MandalaCellInput)
  centerCell: MandalaCellInput

  @Field(() => [MandalaCellInput])
  surroundingCells: MandalaCellInput[]
}

@ObjectType()
export class CreateMandalaChartSuccess {
  @Field(() => ID)
  _id: string
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

@InputType()
export class UpdateMandalaChartInput {
  @Field(() => ID)
  mandalaChartId: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  private: boolean

  @Field(() => MandalaCellInput, { nullable: true })
  centerCell: MandalaCellInput

  @Field(() => [MandalaCellInput], { nullable: 'itemsAndList' })
  surroundingCells: MandalaCellInput[]
}

@ObjectType()
export class UpdateMandalaChartSuccess {
  @Field(() => ID)
  _id: string
}

export enum UpdateMandalaChartFailureType {
  CHART_NOT_FOUND = 'CHART_NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SERVER_ERROR = 'SERVER_ERROR',
}

registerEnumType(UpdateMandalaChartFailureType, {
  name: 'UpdateMandalaChartFailureType',
})

@ObjectType()
export class UpdateMandalaChartFailure implements BaseError {
  @Field(() => UpdateMandalaChartFailureType)
  errorType: UpdateMandalaChartFailureType
}

export const UpdateMandalaChartResponse = createUnionType({
  name: 'UpdateMandalaChartResponse',
  types: () => [UpdateMandalaChartSuccess, UpdateMandalaChartFailure] as const,
  resolveType: (value: any) => {
    if ('_id' in value) {
      return UpdateMandalaChartSuccess.name
    }
    return UpdateMandalaChartFailure.name
  },
})

@InputType()
export class DeleteMandalaChartInput {
  @Field(() => ID)
  mandalaChartId: string
}

@ObjectType()
export class DeleteMandalaChartSuccess {
  @Field(() => ID)
  _id: string
}

export enum DeleteMandalaChartFailureType {
  CHART_NOT_FOUND = 'CHART_NOT_FOUND',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SERVER_ERROR = 'SERVER_ERROR',
}

registerEnumType(DeleteMandalaChartFailureType, {
  name: 'DeleteMandalaChartFailureType',
})

@ObjectType()
export class DeleteMandalaChartFailure implements BaseError {
  @Field(() => DeleteMandalaChartFailureType)
  errorType: DeleteMandalaChartFailureType
}

export const DeleteMandalaChartResponse = createUnionType({
  name: 'DeleteMandalaChartResponse',
  types: () => [DeleteMandalaChartSuccess, DeleteMandalaChartFailure] as const,
  resolveType: (value: any) => {
    if ('_id' in value) {
      return DeleteMandalaChartSuccess.name
    }
    return DeleteMandalaChartFailure.name
  },
})