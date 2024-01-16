import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/sub-goals', async (req: Request, res: Response) => {
  const { mainGoal, subGoals } = req.body
  const recommendations = [
    'You can do it!',
    "You're doing great!",
    'Keep it up!',
    "You're almost there!",
    "You're almost done!",
  ]

  res.status(200).json({
    mainGoal,
    message: 'User successfully registered',
    recommendations,
  })
})

export default router
