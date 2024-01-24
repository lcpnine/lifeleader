import { makeVar } from '@apollo/client'

export interface RecommendationCard {
  id: number
  text: string
  isClicked: boolean
}

export const recommendationCardVar = makeVar<RecommendationCard[]>([])
