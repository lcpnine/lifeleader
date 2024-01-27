import { gql, useQuery } from '@apollo/client'
import {
  GetRecommendationForSubGoalsDocument,
  Recommendation,
} from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'
import useI18n from '../useI18n'
import { recommendationCardVar } from '../useRecommendationCard'

interface Props {
  wholeGridValues: { text: string }[][]
  isAIModeOn: boolean
}

const useAIRecommendation = ({ wholeGridValues, isAIModeOn }: Props) => {
  const { currentLanguage } = useI18n()
  const mainGoal = wholeGridValues[4][4]
  const subGoals = wholeGridValues[4].filter((_, index) => index !== 4)
  const selectedSubGoals = subGoals.filter(item => item.text !== '')

  const { data, loading, refetch } = useQuery(
    GetRecommendationForSubGoalsDocument,
    {
      variables: {
        mainGoal: mainGoal.text,
        selectedSubGoals: selectedSubGoals.map(item => item.text),
        currentLanguage,
      },
      skip: !(isAIModeOn && mainGoal.text),
      onCompleted(data) {
        if (data) {
          const { RecommendationSuccess, RecommendationFailure } =
            extractByTypename(data.recommendationForSubGoals)
          if (RecommendationSuccess?.recommendations) {
            recommendationCardVar(
              RecommendationSuccess.recommendations.map(
                (item: Recommendation, index: number) => ({
                  id: index,
                  text: item.text,
                  isClicked: false,
                })
              )
            )
          }
        }
      },
    }
  )

  const { RecommendationFailure } = extractByTypename(
    data?.recommendationForSubGoals
  )

  const errorType = RecommendationFailure?.errorType

  return {
    data,
    loading,
    refetch,
    errorType,
  }
}

const RECOMMENDATION_FOR_SUB_GOALS_QUERY = gql`
  query GetRecommendationForSubGoals(
    $mainGoal: String!
    $selectedSubGoals: [String!]
    $currentLanguage: String!
  ) {
    recommendationForSubGoals(
      mainGoal: $mainGoal
      selectedSubGoals: $selectedSubGoals
      currentLanguage: $currentLanguage
    ) {
      ... on RecommendationSuccess {
        recommendations {
          text
        }
      }
      ... on RecommendationFailure {
        errorType
      }
    }
  }
`

export default useAIRecommendation
