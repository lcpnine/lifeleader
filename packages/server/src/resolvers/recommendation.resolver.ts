import 'reflect-metadata'
import { Arg, Query, Resolver } from 'type-graphql'
import { ErrorResponse } from '../types/common'
import Recommendation from '../types/recommendation'
import { RecommendationInNeed, getRecommendations } from '../utils/openai'

@Resolver()
export class RecommendationResolver {
  @Query(() => [Recommendation])
  async subGoals(
    @Arg('mainGoal') mainGoal: string,
    @Arg('selectedSubGoals', () => [String], { nullable: true })
    selectedSubGoals: string[] = [],
    @Arg('currentLanguage', { defaultValue: 'en' }) currentLanguage: string
  ): Promise<Recommendation[] | ErrorResponse> {
    if (!mainGoal) {
      return {
        displayMessage: 'Main goal is required',
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
