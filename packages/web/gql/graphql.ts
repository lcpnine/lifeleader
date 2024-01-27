/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: string; output: string; }
};

export type CreateMandalaChartFailure = {
  __typename?: 'CreateMandalaChartFailure';
  errorType: CreateMandalaChartFailureType;
};

export enum CreateMandalaChartFailureType {
  InvalidInput = 'INVALID_INPUT',
  NoTitle = 'NO_TITLE',
  ServerError = 'SERVER_ERROR',
  UnauthorizedAccess = 'UNAUTHORIZED_ACCESS'
}

export type CreateMandalaChartInput = {
  centerCell: MandalaCellInput;
  description?: InputMaybe<Scalars['String']['input']>;
  private: Scalars['Boolean']['input'];
  surroundingCells: Array<MandalaCellInput>;
  title: Scalars['String']['input'];
};

export type CreateMandalaChartResponse = CreateMandalaChartFailure | CreateMandalaChartSuccess;

export type CreateMandalaChartSuccess = {
  __typename?: 'CreateMandalaChartSuccess';
  _id: Scalars['ID']['output'];
};

export type DeleteAccountFailure = {
  __typename?: 'DeleteAccountFailure';
  errorType: DeleteAccountFailureType;
};

export enum DeleteAccountFailureType {
  InvalidRequest = 'INVALID_REQUEST',
  UserNotFound = 'USER_NOT_FOUND'
}

export type DeleteAccountResponse = DeleteAccountFailure | DeleteAccountSuccess;

export type DeleteAccountSuccess = {
  __typename?: 'DeleteAccountSuccess';
  success: Scalars['Boolean']['output'];
};

export type DeleteMandalaChartFailure = {
  __typename?: 'DeleteMandalaChartFailure';
  errorType: DeleteMandalaChartFailureType;
};

export enum DeleteMandalaChartFailureType {
  ChartNotFound = 'CHART_NOT_FOUND',
  ServerError = 'SERVER_ERROR',
  UnauthorizedAccess = 'UNAUTHORIZED_ACCESS'
}

export type DeleteMandalaChartInput = {
  mandalaChartId: Scalars['ID']['input'];
};

export type DeleteMandalaChartResponse = DeleteMandalaChartFailure | DeleteMandalaChartSuccess;

export type DeleteMandalaChartSuccess = {
  __typename?: 'DeleteMandalaChartSuccess';
  _id: Scalars['ID']['output'];
};

export type FindPasswordFailure = {
  __typename?: 'FindPasswordFailure';
  errorType: FindPasswordFailureType;
};

export enum FindPasswordFailureType {
  ServerError = 'SERVER_ERROR',
  UserNotFound = 'USER_NOT_FOUND'
}

export type FindPasswordResponse = FindPasswordFailure | FindPasswordSuccess;

export type FindPasswordSuccess = {
  __typename?: 'FindPasswordSuccess';
  success: Scalars['Boolean']['output'];
};

export type GetMandalaChartFailure = {
  __typename?: 'GetMandalaChartFailure';
  errorType: GetMandalaChartFailureType;
};

export enum GetMandalaChartFailureType {
  ChartNotFound = 'CHART_NOT_FOUND',
  ServerError = 'SERVER_ERROR',
  UnauthorizedAccess = 'UNAUTHORIZED_ACCESS'
}

export type GetMandalaChartInput = {
  mandalaChartId: Scalars['ID']['input'];
};

export type GetMandalaChartResponse = GetMandalaChartFailure | GetMandalaChartSuccess;

export type GetMandalaChartSuccess = {
  __typename?: 'GetMandalaChartSuccess';
  mandalaChart: MandalaChart;
};

export type GetUserMandalaChartsFailure = {
  __typename?: 'GetUserMandalaChartsFailure';
  errorType: GetUserMandalaChartsFailureType;
};

export enum GetUserMandalaChartsFailureType {
  ServerError = 'SERVER_ERROR'
}

export type GetUserMandalaChartsInput = {
  userId: Scalars['ID']['input'];
};

export type GetUserMandalaChartsResponse = GetUserMandalaChartsFailure | GetUserMandalaChartsSuccess;

export type GetUserMandalaChartsSuccess = {
  __typename?: 'GetUserMandalaChartsSuccess';
  mandalaCharts: Array<MandalaChart>;
};

export type MandalaCell = {
  __typename?: 'MandalaCell';
  _id: Scalars['ID']['output'];
  goal: Scalars['String']['output'];
  tasks: Array<Scalars['String']['output']>;
};

export type MandalaCellInput = {
  goal: Scalars['String']['input'];
  tasks: Array<Scalars['String']['input']>;
};

export type MandalaChart = {
  __typename?: 'MandalaChart';
  _id: Scalars['ID']['output'];
  centerCell: MandalaCell;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  lastModifiedAt: Maybe<Scalars['DateTime']['output']>;
  private: Scalars['Boolean']['output'];
  surroundingCells: Array<MandalaCell>;
  title: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMandalaChart: CreateMandalaChartResponse;
  deleteAccount: DeleteAccountResponse;
  deleteMandalaChart: DeleteMandalaChartResponse;
  findPassword: FindPasswordResponse;
  resetPassword: ResetPasswordResponse;
  signIn: SignInResponse;
  signOut: Scalars['Boolean']['output'];
  signUp: SignUpResponse;
  updateMandalaChart: UpdateMandalaChartResponse;
  verifyEmail: VerifyEmailResponse;
};


export type MutationCreateMandalaChartArgs = {
  input: CreateMandalaChartInput;
};


export type MutationDeleteAccountArgs = {
  email: Scalars['String']['input'];
};


export type MutationDeleteMandalaChartArgs = {
  input: DeleteMandalaChartInput;
};


export type MutationFindPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  newPasswordConfirm: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  keepSignedIn: Scalars['Boolean']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
};


export type MutationUpdateMandalaChartArgs = {
  input: UpdateMandalaChartInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type PurchasedInfo = {
  __typename?: 'PurchasedInfo';
  expiresAt: Maybe<Scalars['DateTime']['output']>;
  isPurchased: Scalars['Boolean']['output'];
  purchasedAt: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  checkUser: Maybe<User>;
  getMandalaChart: GetMandalaChartResponse;
  getUser: Maybe<User>;
  getUserMandalaCharts: GetUserMandalaChartsResponse;
  recommendationForSubGoals: RecommendationResponse;
};


export type QueryGetMandalaChartArgs = {
  input: GetMandalaChartInput;
};


export type QueryGetUserArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetUserMandalaChartsArgs = {
  input: GetUserMandalaChartsInput;
};


export type QueryRecommendationForSubGoalsArgs = {
  currentLanguage?: InputMaybe<Scalars['String']['input']>;
  mainGoal: Scalars['String']['input'];
  selectedSubGoals?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Recommendation = {
  __typename?: 'Recommendation';
  text: Scalars['String']['output'];
};

export type RecommendationFailure = {
  __typename?: 'RecommendationFailure';
  errorType: RecommendationFailureType;
};

export enum RecommendationFailureType {
  InvalidRequest = 'INVALID_REQUEST',
  OpenaiError = 'OPENAI_ERROR'
}

export type RecommendationResponse = RecommendationFailure | RecommendationSuccess;

export type RecommendationSuccess = {
  __typename?: 'RecommendationSuccess';
  recommendations: Array<Recommendation>;
};

export type ResetPasswordFailure = {
  __typename?: 'ResetPasswordFailure';
  errorType: ResetPasswordFailureType;
};

export enum ResetPasswordFailureType {
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidToken = 'INVALID_TOKEN'
}

export type ResetPasswordResponse = ResetPasswordFailure | ResetPasswordSuccess;

export type ResetPasswordSuccess = {
  __typename?: 'ResetPasswordSuccess';
  success: Scalars['Boolean']['output'];
};

export type SignInFailure = {
  __typename?: 'SignInFailure';
  errorType: SignInFailureType;
};

export enum SignInFailureType {
  UserNotFound = 'USER_NOT_FOUND',
  WrongPassword = 'WRONG_PASSWORD'
}

export type SignInResponse = SignInFailure | SignInSuccess;

export type SignInSuccess = {
  __typename?: 'SignInSuccess';
  token: Scalars['String']['output'];
  user: User;
};

export type SignUpFailure = {
  __typename?: 'SignUpFailure';
  errorType: SignUpFailureType;
};

export enum SignUpFailureType {
  ExistingEmail = 'EXISTING_EMAIL',
  InvalidPassword = 'INVALID_PASSWORD'
}

export type SignUpResponse = SignUpFailure | SignUpSuccess;

export type SignUpSuccess = {
  __typename?: 'SignUpSuccess';
  isMailSent: Scalars['Boolean']['output'];
};

export type TokenInfo = {
  __typename?: 'TokenInfo';
  expiresAt: Maybe<Scalars['DateTime']['output']>;
  isVerified: Maybe<Scalars['Boolean']['output']>;
  token: Maybe<Scalars['String']['output']>;
};

export type UpdateMandalaChartFailure = {
  __typename?: 'UpdateMandalaChartFailure';
  errorType: UpdateMandalaChartFailureType;
};

export enum UpdateMandalaChartFailureType {
  ChartNotFound = 'CHART_NOT_FOUND',
  InvalidInput = 'INVALID_INPUT',
  NoTitle = 'NO_TITLE',
  ServerError = 'SERVER_ERROR',
  UnauthorizedAccess = 'UNAUTHORIZED_ACCESS'
}

export type UpdateMandalaChartInput = {
  centerCell: MandalaCellInput;
  description?: InputMaybe<Scalars['String']['input']>;
  mandalaChartId: Scalars['ID']['input'];
  private: Scalars['Boolean']['input'];
  surroundingCells?: InputMaybe<Array<InputMaybe<MandalaCellInput>>>;
  title: Scalars['String']['input'];
};

export type UpdateMandalaChartResponse = UpdateMandalaChartFailure | UpdateMandalaChartSuccess;

export type UpdateMandalaChartSuccess = {
  __typename?: 'UpdateMandalaChartSuccess';
  _id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerification: TokenInfo;
  nickname: Scalars['String']['output'];
  purchasedInfo: PurchasedInfo;
  resetPassword: TokenInfo;
};

export type VerifyEmailFailure = {
  __typename?: 'VerifyEmailFailure';
  errorType: VerifyEmailFailureType;
};

export enum VerifyEmailFailureType {
  InvalidToken = 'INVALID_TOKEN',
  VerifiedEmail = 'VERIFIED_EMAIL'
}

export type VerifyEmailResponse = VerifyEmailFailure | VerifyEmailSuccess;

export type VerifyEmailSuccess = {
  __typename?: 'VerifyEmailSuccess';
  success: Scalars['Boolean']['output'];
};

export type GetRecommendationForSubGoalsQueryVariables = Exact<{
  mainGoal: Scalars['String']['input'];
  selectedSubGoals?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  currentLanguage: Scalars['String']['input'];
}>;


export type GetRecommendationForSubGoalsQuery = { __typename?: 'Query', recommendationForSubGoals: { __typename?: 'RecommendationFailure', errorType: RecommendationFailureType } | { __typename?: 'RecommendationSuccess', recommendations: Array<{ __typename?: 'Recommendation', text: string }> } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type DeleteAccountMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'DeleteAccountFailure', errorType: DeleteAccountFailureType } | { __typename?: 'DeleteAccountSuccess', success: boolean } };

export type FindPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type FindPasswordMutation = { __typename?: 'Mutation', findPassword: { __typename?: 'FindPasswordFailure', errorType: FindPasswordFailureType } | { __typename?: 'FindPasswordSuccess', success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  newPasswordConfirm: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordFailure', errorType: ResetPasswordFailureType } | { __typename?: 'ResetPasswordSuccess', success: boolean } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  keepSignedIn: Scalars['Boolean']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInFailure', errorType: SignInFailureType } | { __typename?: 'SignInSuccess', token: string, user: { __typename?: 'User', _id: string, email: string, nickname: string, createdAt: string, emailVerification: { __typename?: 'TokenInfo', isVerified: boolean | null, token: string | null, expiresAt: string | null }, resetPassword: { __typename?: 'TokenInfo', token: string | null, expiresAt: string | null, isVerified: boolean | null }, purchasedInfo: { __typename?: 'PurchasedInfo', isPurchased: boolean, purchasedAt: string | null, expiresAt: string | null } } } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpFailure', errorType: SignUpFailureType } | { __typename?: 'SignUpSuccess', isMailSent: boolean } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailFailure', errorType: VerifyEmailFailureType } | { __typename?: 'VerifyEmailSuccess', success: boolean } };

export type GetUserMandalaChartsQueryVariables = Exact<{
  input: GetUserMandalaChartsInput;
}>;


export type GetUserMandalaChartsQuery = { __typename?: 'Query', getUserMandalaCharts: { __typename?: 'GetUserMandalaChartsFailure', errorType: GetUserMandalaChartsFailureType } | { __typename?: 'GetUserMandalaChartsSuccess', mandalaCharts: Array<{ __typename?: 'MandalaChart', _id: string, title: string, description: string | null, private: boolean, createdAt: string, lastModifiedAt: string | null }> } };


export const GetRecommendationForSubGoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecommendationForSubGoals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mainGoal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selectedSubGoals"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentLanguage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendationForSubGoals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mainGoal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mainGoal"}}},{"kind":"Argument","name":{"kind":"Name","value":"selectedSubGoals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selectedSubGoals"}}},{"kind":"Argument","name":{"kind":"Name","value":"currentLanguage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentLanguage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecommendationSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecommendationFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecommendationForSubGoalsQuery, GetRecommendationForSubGoalsQueryVariables>;
export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAccountSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAccountFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const FindPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FindPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FindPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FindPasswordFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<FindPasswordMutation, FindPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPasswordConfirm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPasswordConfirm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPasswordConfirm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keepSignedIn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"keepSignedIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keepSignedIn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignInSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"purchasedInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"purchasedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignInFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"passwordConfirm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirm"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMailSent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const GetUserMandalaChartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserMandalaCharts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserMandalaChartsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserMandalaCharts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserMandalaChartsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mandalaCharts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedAt"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserMandalaChartsFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorType"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMandalaChartsQuery, GetUserMandalaChartsQueryVariables>;