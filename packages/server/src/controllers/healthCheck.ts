import { Request, Response } from 'express'

const healthCheckController = {
  get: (req: Request, res: Response) => {
    const name = req.query.name || 'default'
    res.send({ name })
  },
}

export default healthCheckController
