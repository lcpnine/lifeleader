import 'reflect-metadata'
import { Arg, Query, Resolver } from 'type-graphql'
import { IS_DEV } from '../constant/common'
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
      if (IS_DEV)
        return {
          recommendations: [
            {
              text: 'This is a recommendation 1',
            },
            {
              text: 'This is a recommendation 2',
            },
            {
              text: 'This is a recommendation 3',
            },
            {
              text: 'This is a recommendation 4',
            },
            {
              text: 'This is a recommendation 5',
            },
            {
              text: 'This is a recommendation 6',
            },
          ],
        }
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
