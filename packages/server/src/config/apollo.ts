import { ApolloServerExpressConfig } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '../resolvers/user.resolver'

const createSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver],
  })

const createApolloConfig = async () => {
  const schema = await createSchema()

  const apolloConfig: ApolloServerExpressConfig = {
    schema,
    context: ({ req, res }) => ({ req, res }),
  }

  return apolloConfig
}

export default createApolloConfig
