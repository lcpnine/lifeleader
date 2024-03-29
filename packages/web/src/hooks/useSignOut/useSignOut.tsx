import { DEFAULT_USER, useUserContext } from '@/contexts/UserContext'
import { gql, useMutation } from '@apollo/client'
import { SignOutDocument } from '../../../gql/graphql'
import useGoTo from '../useGoTo'

const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`

const useSignOut = () => {
  const [signOutMutation] = useMutation(SignOutDocument)
  const { setUser } = useUserContext()
  const { goTo } = useGoTo()

  const signOut = async () => {
    await signOutMutation()
    setUser(DEFAULT_USER)
    goTo('/')
  }

  return signOut
}

export default useSignOut
