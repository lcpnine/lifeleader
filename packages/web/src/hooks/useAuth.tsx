import { DEFAULT_USER, useUserContext } from '@/contexts/UserContext'
import { gql, useMutation } from '@apollo/client'
import axios from 'axios'
import { extractByTypename } from '../../utils/typeguard'
import { SignInDocument } from './useAuth.generated'

const SIGN_IN_MUTATION = gql`
  mutation SignIn(
    $email: String!
    $password: String!
    $keepSignedIn: Boolean!
  ) {
    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {
      token
      user {
        _id
        email
        nickname
        createdAt
        emailVerification {
          isVerified
          token
          expires
        }
        resetPassword {
          token
          expires
          isVerified
        }
        purchasedInfo {
          isPurchased
          purchasedAt
          expiresAt
        }
      }
    }
  }
`

const useAuth = () => {
  const { setUser } = useUserContext()
  const [signInMutation] = useMutation(SignInDocument)

  const handleSignIn = async (
    email: string,
    password: string,
    keepSignedIn: boolean
  ) => {
    const { data } = await signInMutation({
      variables: { email, password, keepSignedIn },
    })
    const { SignInSuccessResponse } = extractByTypename(data?.signIn)

    // TODO: Change how to deliver error message
    if (!SignInSuccessResponse) return { success: false, status: 400 }

    const { token, user } = SignInSuccessResponse
    // setUser({
    //   isSignedIn: true,
    //   ...user,
    // })

    return { success: true, status: 200 }
  }

  const handleSignOut = async () => {
    await axios.delete('/auth/sign-out')
    setUser(DEFAULT_USER)
    window.location.reload()
  }

  return {
    handleSignIn,
    handleSignOut,
  }
}

export default useAuth
