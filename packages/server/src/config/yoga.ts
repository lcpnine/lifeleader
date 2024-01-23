import type { YogaServerOptions } from 'graphql-yoga'
import { buildSchema } from 'type-graphql'
import { RecommendationResolver } from '../resolvers/recommendation.resolver'
import { UserResolver } from '../resolvers/user.resolver'

const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver, RecommendationResolver],
    emitSchemaFile: 'src/schema.gql',
  })

const createYogaConfig = async () => {
  const schema = await createSchema()

  const yogaConfig = {
    schema,
  } as YogaServerOptions<{}, {}>

  return yogaConfig
}

export default createYogaConfig
