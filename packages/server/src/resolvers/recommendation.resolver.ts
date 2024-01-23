import 'reflect-metadata'
import { Arg, Query, Resolver } from 'type-graphql'
import Recommendation from '../types/recommendation'
import { RecommendationInNeed, getRecommendations } from '../utils/openai'
import { BASE_ERROR, BaseError } from './dto/common'

@Resolver()
export class RecommendationResolver {
  @Query(() => [Recommendation])
  async subGoals(
    @Arg('mainGoal') mainGoal: string,
    @Arg('selectedSubGoals', () => [String], { nullable: true })
    selectedSubGoals: string[] = [],
    @Arg('currentLanguage', { defaultValue: 'en' }) currentLanguage: string
  ): Promise<Recommendation[] | BaseError> {
    if (!mainGoal) {
      return {
        errorType: BASE_ERROR.errorType,
      }
    }

    const { recommendations } = await getRecommendations({
      recommendationInNeed: RecommendationInNeed.SubGoals,
      params: {
        mainGoal,
        selectedSubGoals,
        currentLanguage,
      },
    })

    return recommendations.map(recommendation => ({
      text: recommendation,
    }))
  }
}
