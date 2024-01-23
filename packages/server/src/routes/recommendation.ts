import express, { Request, Response } from 'express'
import { RecommendationInNeed, getRecommendations } from '../utils/openai'

const router = express.Router()

router.post('/sub-goals', async (req: Request, res: Response) => {
  const { mainGoal, selectedSubGoals = [], currentLanguage = 'en' } = req.body
  if (!mainGoal) {
    res.status(200).json({
      message: 'Main goal is required',
      recommendations: [],
    })
    return
  }

  const { recommendations } = await getRecommendations({
    recommendationInNeed: RecommendationInNeed.SubGoals,
    params: {
      mainGoal,
      selectedSubGoals,
      currentLanguage,
    },
  })

  res.status(200).json({
    message: 'User successfully registered',
    recommendations,
  })
})

export default router
