import { ApolloServerExpressConfig } from 'apollo-server-express'

const apolloConfig: ApolloServerExpressConfig = {
  typeDefs: undefined,
  resolvers: undefined,
  context: ({ req, res }) => ({ req, res }), // Passes Express request object to resolvers
}

export default apolloConfig
