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

export type Mutation = {
  __typename?: 'Mutation';
  findPassword: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signIn: SignInResponse;
  signOut: Scalars['Boolean']['output'];
  signUp: User;
  verifyEmail: Scalars['Boolean']['output'];
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
  getUser: Maybe<User>;
  subGoals: Array<Recommendation>;
};


export type QueryGetUserArgs = {
  _id: Scalars['String']['input'];
};


export type QuerySubGoalsArgs = {
  currentLanguage?: InputMaybe<Scalars['String']['input']>;
  mainGoal: Scalars['String']['input'];
  selectedSubGoals?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Recommendation = {
  __typename?: 'Recommendation';
  text: Scalars['String']['output'];
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
