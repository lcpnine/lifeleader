import type { CodegenConfig } from '@graphql-codegen/cli'

const scalarMap: Record<string, string> = {
  DateTime: 'string',
  Date: 'string',
  Time: 'string',
  ObjectID: 'string',
  URL: 'string',
}

const config: CodegenConfig = {
  overwrite: true,
  schema: '../server/src/schema.gql',
  documents: 'src/**/*.tsx',
  generates: {
    'types/possible-types.ts': {
      plugins: ['fragment-matcher'],
    },
    'types/graphql.ts': {
      plugins: ['typescript'],
      config: {
        avoidOptionals: { field: true, inputValue: false },
        strictScalars: true,
        scalars: scalarMap,
      },
    },
    'libs/apollo/typePolicies.helper.ts': {
      plugins: ['typescript-apollo-client-helpers'],
    },
    // './': {
    //   documents: [
    //     './graphql/**/*.graphql',
    //     './pages/**/*.{ts,tsx,graphql}',
    //     './components/**/*.{ts,tsx}',
    //     './hooks/**/*.{ts,tsx,graphql}',
    //     './contexts/**/*.{ts,tsx,graphql}',
    //   ],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.generated.ts',
    //     baseTypesPath: 'types/graphql.ts',
    //   },
    //   plugins: ['typescript-operations', 'typed-document-node'],
    // },
    './gql/': {
      documents: ['./pages/setting/tags/**/*.tsx'],
      preset: 'client',
      plugins: [],
      config: {
        avoidOptionals: { field: true, inputValue: false },
        strictScalars: true,
        scalars: scalarMap,
      },
    },
  },
}

export default config
