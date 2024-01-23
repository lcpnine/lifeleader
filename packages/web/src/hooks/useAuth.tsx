import { DEFAULT_USER, useUserContext } from '@/contexts/UserContext'
import { useMutation } from '@apollo/client'
import axios from 'axios'
import { extractByTypename } from '../../utils/typeguard'

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
    const { SignInSuccess, BaseError } = extractByTypename(data?.signIn)

    if (!SignInSuccess) return { errorType: BaseError?.errorType as string }

    const { token, user } = SignInSuccess
    // setUser({
    //   isSignedIn: true,
    //   ...user,
    // })

    return { token }
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
