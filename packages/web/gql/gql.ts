/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation SignOut {\n    signOut\n  }\n": types.SignOutDocument,
    "\n  mutation FindPassword($email: String!) {\n    findPassword(email: $email) {\n      ... on FindPasswordSuccess {\n        success\n      }\n      ... on FindPasswordFailure {\n        errorType\n      }\n    }\n  }\n": types.FindPasswordDocument,
    "\n  mutation SignIn(\n    $email: String!\n    $password: String!\n    $keepSignedIn: Boolean!\n  ) {\n    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {\n      ... on SignInSuccess {\n        token\n        user {\n          _id\n          email\n          nickname\n          createdAt\n          emailVerification {\n            isVerified\n            token\n            expiresAt\n          }\n          resetPassword {\n            token\n            expiresAt\n            isVerified\n          }\n          purchasedInfo {\n            isPurchased\n            purchasedAt\n            expiresAt\n          }\n        }\n      }\n      ... on SignInFailure {\n        errorType\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $passwordConfirm: String!\n    $nickname: String!\n  ) {\n    signUp(\n      email: $email\n      password: $password\n      passwordConfirm: $passwordConfirm\n      nickname: $nickname\n    ) {\n      ... on SignUpSuccess {\n        isMailSent\n      }\n      ... on SignUpFailure {\n        errorType\n      }\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token) {\n      ... on VerifyEmailSuccess {\n        success\n      }\n      ... on VerifyEmailFailure {\n        errorType\n      }\n    }\n  }\n": types.VerifyEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignOut {\n    signOut\n  }\n"): (typeof documents)["\n  mutation SignOut {\n    signOut\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FindPassword($email: String!) {\n    findPassword(email: $email) {\n      ... on FindPasswordSuccess {\n        success\n      }\n      ... on FindPasswordFailure {\n        errorType\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FindPassword($email: String!) {\n    findPassword(email: $email) {\n      ... on FindPasswordSuccess {\n        success\n      }\n      ... on FindPasswordFailure {\n        errorType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn(\n    $email: String!\n    $password: String!\n    $keepSignedIn: Boolean!\n  ) {\n    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {\n      ... on SignInSuccess {\n        token\n        user {\n          _id\n          email\n          nickname\n          createdAt\n          emailVerification {\n            isVerified\n            token\n            expiresAt\n          }\n          resetPassword {\n            token\n            expiresAt\n            isVerified\n          }\n          purchasedInfo {\n            isPurchased\n            purchasedAt\n            expiresAt\n          }\n        }\n      }\n      ... on SignInFailure {\n        errorType\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn(\n    $email: String!\n    $password: String!\n    $keepSignedIn: Boolean!\n  ) {\n    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {\n      ... on SignInSuccess {\n        token\n        user {\n          _id\n          email\n          nickname\n          createdAt\n          emailVerification {\n            isVerified\n            token\n            expiresAt\n          }\n          resetPassword {\n            token\n            expiresAt\n            isVerified\n          }\n          purchasedInfo {\n            isPurchased\n            purchasedAt\n            expiresAt\n          }\n        }\n      }\n      ... on SignInFailure {\n        errorType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $passwordConfirm: String!\n    $nickname: String!\n  ) {\n    signUp(\n      email: $email\n      password: $password\n      passwordConfirm: $passwordConfirm\n      nickname: $nickname\n    ) {\n      ... on SignUpSuccess {\n        isMailSent\n      }\n      ... on SignUpFailure {\n        errorType\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $passwordConfirm: String!\n    $nickname: String!\n  ) {\n    signUp(\n      email: $email\n      password: $password\n      passwordConfirm: $passwordConfirm\n      nickname: $nickname\n    ) {\n      ... on SignUpSuccess {\n        isMailSent\n      }\n      ... on SignUpFailure {\n        errorType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token) {\n      ... on VerifyEmailSuccess {\n        success\n      }\n      ... on VerifyEmailFailure {\n        errorType\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token) {\n      ... on VerifyEmailSuccess {\n        success\n      }\n      ... on VerifyEmailFailure {\n        errorType\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;