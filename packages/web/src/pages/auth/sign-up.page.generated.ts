import * as Types from '../../../types/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SignUpMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  passwordConfirm: Types.Scalars['String']['input'];
  nickname: Types.Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpFailure', errorType: Types.SignUpFailureType } | { __typename?: 'SignUpSuccess', isMailSent: boolean } };


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"passwordConfirm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirm"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMailSent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;