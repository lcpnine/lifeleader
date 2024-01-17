import OpenAI from 'openai'
import {
  ACTIONS_RECOMMENDATION_INSTRUCTION,
  SUB_GOALS_RECOMMENDATION_INSTRUCTION,
} from './../src/constant/prompot'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export enum RecommendationInNeed {
  SubGoals = 'sub-goals',
  Actions = 'actions',
}

export interface SubGoalsRecommendationParams {
  mainGoal: string
  selectedSubGoals: string[]
  currentLanguage: string
}

export interface ActionsRecommendationParams {
  mainGoal: string
  subGoal: string[]
  selectedActions: string[]
  currentLanguage: string
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
  // web의 SUPPORTING_LANGUAGES 참고 / 현재 en, ko, zh-Hant
  currentLanguage?: string
}

export const getRecommendations = async (
  props: Props
): Promise<JSONResponse> => {
  const { recommendationInNeed, params } = props

  const createMessages = (): OpenAI.ChatCompletionMessageParam[] => {
    switch (recommendationInNeed) {
      case RecommendationInNeed.SubGoals:
        return [
          { role: 'system', content: SUB_GOALS_RECOMMENDATION_INSTRUCTION },
          {
            role: 'user',
            content: `mainGoal: ${
              params.mainGoal
            }, selectedSubGoals: ${params.selectedSubGoals.join(
              ', '
            )}, locale: ${params.currentLanguage}`,
          },
        ]
      case RecommendationInNeed.Actions:
        return [
          { role: 'system', content: ACTIONS_RECOMMENDATION_INSTRUCTION },
          {
            role: 'user',
            content: `mainGoal: ${
              params.mainGoal
            }, subGoal: ${params.subGoal.join(
              ', '
            )}, selectedActions: ${params.selectedActions.join(
              ', '
            )}, Locale: ${params.currentLanguage}`,
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
