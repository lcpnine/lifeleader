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

export type Mutation = {
  __typename?: 'Mutation';
  deleteAccount: DeleteAccountResponse;
  findPassword: FindPasswordResponse;
  resetPassword: ResetPasswordResponse;
  signIn: SignInResponse;
  signOut: Scalars['Boolean']['output'];
  signUp: SignUpResponse;
  verifyEmail: VerifyEmailResponse;
};


export type MutationDeleteAccountArgs = {
  email: Scalars['String']['input'];
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
  getUser: Maybe<User>;
  recommendationForSubGoals: RecommendationResponse;
};


export type QueryGetUserArgs = {
  _id: Scalars['String']['input'];
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
