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
    "\n  mutation SignIn(\n    $email: String!\n    $password: String!\n    $keepSignedIn: Boolean!\n  ) {\n    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {\n      ... on SignInSuccess {\n        token\n        user {\n          _id\n          email\n          nickname\n          createdAt\n          emailVerification {\n            isVerified\n            token\n            expiresAt\n          }\n          resetPassword {\n            token\n            expiresAt\n            isVerified\n          }\n          purchasedInfo {\n            isPurchased\n            purchasedAt\n            expiresAt\n          }\n        }\n      }\n      ... on SignInFailure {\n        errorType\n      }\n    }\n  }\n": types.SignInDocument,
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
export function graphql(source: "\n  mutation SignIn(\n    $email: String!\n    $password: String!\n    $keepSignedIn: Boolean!\n  ) {\n    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {\n      ... on SignInSuccess {\n        token\n        user {\n          _id\n          email\n          nickname\n          createdAt\n          emailVerification {\n            isVerified\n            token\n            expiresAt\n          }\n          resetPassword {\n            token\n            expiresAt\n            isVerified\n          }\n          purchasedInfo {\n            isPurchased\n            purchasedAt\n            expiresAt\n          }\n        }\n      }\n      ... on SignInFailure {\n        errorType\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn(\n    $email: String!\n    $password: String!\n    $keepSignedIn: Boolean!\n  ) {\n    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {\n      ... on SignInSuccess {\n        token\n        user {\n          _id\n          email\n          nickname\n          createdAt\n          emailVerification {\n            isVerified\n            token\n            expiresAt\n          }\n          resetPassword {\n            token\n            expiresAt\n            isVerified\n          }\n          purchasedInfo {\n            isPurchased\n            purchasedAt\n            expiresAt\n          }\n        }\n      }\n      ... on SignInFailure {\n        errorType\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;