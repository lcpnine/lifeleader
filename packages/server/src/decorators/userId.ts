import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const token = request.cookies?.token

    if (!token) {
      return null
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload
      return decoded.userId
    } catch (error) {
      return null
    }
  }
)

export default UserId
