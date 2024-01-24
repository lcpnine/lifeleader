import 'reflect-metadata'
import { Arg, Query, Resolver } from 'type-graphql'
import { RecommendationInNeed, getRecommendations } from '../utils/openai'
import {
  RecommendationFailureType,
  RecommendationResponse,
} from './dto/recommendation.dto'

@Resolver()
export class RecommendationResolver {
  @Query(() => RecommendationResponse)
  async recommendationForSubGoals(
    @Arg('mainGoal') mainGoal: string,
    @Arg('selectedSubGoals', () => [String], { nullable: true })
    selectedSubGoals: string[] = [],
    @Arg('currentLanguage', { defaultValue: 'en' }) currentLanguage: string
  ): Promise<typeof RecommendationResponse> {
    if (!mainGoal) {
      return {
        errorType: RecommendationFailureType.INVALID_REQUEST,
      }
    }

    try {
      const { recommendations } = await getRecommendations({
        recommendationInNeed: RecommendationInNeed.SubGoals,
        params: {
          mainGoal,
          selectedSubGoals,
          currentLanguage,
        },
      })
      return {
        recommendations: recommendations.map(recommendation => ({
          text: recommendation,
        })),
      }
    } catch (e) {
      return {
        errorType: RecommendationFailureType.OPENAI_ERROR,
      }
    }
  }
}
