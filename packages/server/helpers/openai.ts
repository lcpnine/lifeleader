import OpenAI from 'openai'
import { MANDALA_RECOMMENDATION_INSTRUCTION } from './../src/constant/prompot'

const openai = new OpenAI()

export enum RecommendationInNeed {
  SubGoals = 'sub-goals',
  Actions = 'actions',
}

export interface SubGoalsRecommendationParams {
  mainGoal: string
  selectedSubGoals: string[]
}

export interface ActionsRecommendationParams {
  mainGoal: string
  subGoal: string[]
  selectedActions: string[]
}

type Props =
  | {
      recommendationInNeed: RecommendationInNeed.SubGoals
      params: SubGoalsRecommendationParams
    }
  | {
      recommendationInNeed: RecommendationInNeed.Actions
      params: ActionsRecommendationParams
    }

// TODO: type의 return이 불확실. Prompt와 함께 수정 필요
export interface JSONResponse {
  type: RecommendationInNeed
  recommendations: string[]
}

export const getRecommendations = async (
  props: Props
): Promise<JSONResponse> => {
  const { recommendationInNeed, params } = props

  const createMessages = (): OpenAI.ChatCompletionMessageParam[] => {
    switch (recommendationInNeed) {
      case RecommendationInNeed.SubGoals:
        return [
          { role: 'system', content: MANDALA_RECOMMENDATION_INSTRUCTION },
          {
            role: 'user',
            content: `Main Goal: ${
              params.mainGoal
            }, Sub Goals: ${params.selectedSubGoals.join(', ')}`,
          },
        ]
      case RecommendationInNeed.Actions:
        return [
          { role: 'system', content: MANDALA_RECOMMENDATION_INSTRUCTION },
          {
            role: 'user',
            content: `Main Goal: ${
              params.mainGoal
            }, Sub Goals: ${params.subGoal.join(
              ', '
            )}, Actions: ${params.selectedActions.join(', ')}`,
          },
        ]
      default:
        return []
    }
  }

  const messages = createMessages()

  const response = await openai.chat.completions.create({
    messages,
    model: 'gpt-4-1106-preview',
    response_format: {
      type: 'json_object',
    },
  })

  const responseInText = response.choices[0].message.content
  const responseInJson = JSON.parse(responseInText as string)

  return responseInJson
}
