import type { YogaServerOptions } from 'graphql-yoga'
import { buildSchema } from 'type-graphql'
import renewJwt from '../middlewares/renewJwt.middleware'
import { RecommendationResolver } from '../resolvers/recommendation.resolver'
import { UserResolver } from '../resolvers/user.resolver'
import { MyContext } from '../types/common'

const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver, RecommendationResolver],
    emitSchemaFile: 'src/schema.gql',
  })

const createYogaConfig = async () => {
  const schema = await createSchema()

  const yogaConfig = {
    schema,
    context: async ({ req, res }: MyContext) => {
      await renewJwt(req, res)
      return { req, res }
    },
  } as YogaServerOptions<{}, {}>

  return yogaConfig
}

export default createYogaConfig
