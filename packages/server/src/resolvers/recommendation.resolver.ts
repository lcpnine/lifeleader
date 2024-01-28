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
      if (IS_DEV) {
        const make6RandomNumbersBetween0to100 = () =>
          Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
        const randomNumbers = make6RandomNumbersBetween0to100()

        return {
          recommendations: randomNumbers.map(number => ({
            text: `Recommendation ${number}`,
          })),
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
