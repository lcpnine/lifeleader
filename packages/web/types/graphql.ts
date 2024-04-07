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

export type Agreement = {
  __typename?: 'Agreement';
  agreementDate: Maybe<Scalars['DateTime']['output']>;
  isAgreed: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  revocationDate: Maybe<Scalars['DateTime']['output']>;
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
  mandalaChart: MandalaChart;
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
  PrivateChart = 'PRIVATE_CHART',
  ServerError = 'SERVER_ERROR'
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
  _id: Scalars['ID']['input'];
  centerCell: MandalaCellInput;
  description?: InputMaybe<Scalars['String']['input']>;
  private: Scalars['Boolean']['input'];
  surroundingCells?: InputMaybe<Array<InputMaybe<MandalaCellInput>>>;
  title: Scalars['String']['input'];
};

export type UpdateMandalaChartResponse = UpdateMandalaChartFailure | UpdateMandalaChartSuccess;

export type UpdateMandalaChartSuccess = {
  __typename?: 'UpdateMandalaChartSuccess';
  mandalaChart: MandalaChart;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  agreements: Array<Agreement>;
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
