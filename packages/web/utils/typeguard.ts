/* eslint-disable indent */
export const isTypename = <
  N extends { __typename?: string },
  T extends N extends { __typename?: infer Typename } ? Typename : never,
>(
  node: N | undefined,

  typename: T
): node is Extract<N, { __typename?: T }> =>
  !!node && node.__typename === typename

/**
 * `typename`별로 유효한 값을 할당한 객체를 반환하는 유틸함수
 * @param node `__typename` 필드를 가진 `graphql` 스키마
 * @returns `node`가 해당하는 `typename` key에 값이 할당된 객체
 */
export const extractByTypename = <
  N extends { __typename?: string },
  T extends N extends { __typename?: infer Typename } ? Typename : never,
  ReturnType extends {
    [key in T]?: Extract<N, { __typename?: key }>
  },
>(
  node: N | undefined | null
): Partial<ReturnType> => {
  const typename = node?.__typename as T

  if (!typename) return {} as ReturnType

  return {
    [typename]: node,
  } as unknown as ReturnType
}
