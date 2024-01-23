import { buildSchema } from 'type-graphql'
import { RecommendationResolver } from '../resolvers/recommendation.resolver'
import { UserResolver } from '../resolvers/user.resolver'

const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver, RecommendationResolver],
  })

const createApolloConfig = async () => {
  const schema = await createSchema()

  const apolloConfig = {
    schema,
  }

  return apolloConfig
}

export default createApolloConfig
