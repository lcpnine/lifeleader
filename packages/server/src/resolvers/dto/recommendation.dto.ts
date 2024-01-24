import {
  Field,
  ObjectType,
  createUnionType,
  registerEnumType,
} from 'type-graphql'
import { BaseError } from './common.dto'

@ObjectType()
export class Recommendation {
  @Field()
  text: string
}

@ObjectType()
export class RecommendationSuccess {
  @Field(() => [Recommendation])
  recommendations: Recommendation[]
}

export enum RecommendationFailureType {
  INVALID_REQUEST = 'INVALID_REQUEST',
  OPENAI_ERROR = 'OPENAI_ERROR',
}

registerEnumType(RecommendationFailureType, {
  name: 'RecommendationFailureType',
})

@ObjectType()
export class RecommendationFailure implements BaseError {
  @Field(type => RecommendationFailureType)
  errorType: RecommendationFailureType
}

export const RecommendationResponse = createUnionType({
  name: 'RecommendationResponse',
  types: () => [RecommendationSuccess, RecommendationFailure] as const,
  resolveType: (value: any) => {
    if ('errorType' in value) {
      return RecommendationFailure.name
    }
    return RecommendationSuccess.name
  },
})
