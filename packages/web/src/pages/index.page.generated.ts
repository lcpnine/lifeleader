import * as Types from '../../types/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetRecommendationForSubGoalsQueryVariables = Types.Exact<{
  mainGoal: Types.Scalars['String']['input'];
  selectedSubGoals?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  currentLanguage: Types.Scalars['String']['input'];
}>;


export type GetRecommendationForSubGoalsQuery = { __typename?: 'Query', recommendationForSubGoals: { __typename?: 'RecommendationFailure', errorType: Types.RecommendationFailureType } | { __typename?: 'RecommendationSuccess', recommendations: Array<{ __typename?: 'Recommendation', text: string }> } };


export const GetRecommendationForSubGoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecommendationForSubGoals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mainGoal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selectedSubGoals"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentLanguage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendationForSubGoals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mainGoal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mainGoal"}}},{"kind":"Argument","name":{"kind":"Name","value":"selectedSubGoals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selectedSubGoals"}}},{"kind":"Argument","name":{"kind":"Name","value":"currentLanguage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentLanguage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecommendationSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecommendationFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecommendationForSubGoalsQuery, GetRecommendationForSubGoalsQueryVariables>;