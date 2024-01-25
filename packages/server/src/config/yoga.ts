import type { YogaServerOptions } from 'graphql-yoga'
import { buildSchema } from 'type-graphql'
import { IS_DEV } from '../constant/common'
import renewJwt from '../middlewares/renewJwt.middleware'
import { MandalaChartResolver } from '../resolvers/mandalaChart.resolver'
import { RecommendationResolver } from '../resolvers/recommendation.resolver'
import { UserResolver } from '../resolvers/user.resolver'
import { MyContext } from '../types/common'

const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver, MandalaChartResolver, RecommendationResolver],
    emitSchemaFile: 'src/schema.gql',
    validate: {
      forbidUnknownValues: false,
    },
  })

const createYogaConfig = async () => {
  const schema = await createSchema()

  const yogaConfig = {
    schema,
    graphiql: IS_DEV,
    context: async ({ req, res }: MyContext) => {
      await renewJwt(req, res)
      return { req, res }
    },
  } as YogaServerOptions<{}, {}>

  return yogaConfig
}

export default createYogaConfig
