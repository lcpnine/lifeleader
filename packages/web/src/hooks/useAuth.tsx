import { DEFAULT_USER, useUserContext } from '@/contexts/UserContext'
import axios from 'axios'

const useAuth = () => {
  const { setUser } = useUserContext()

  const handleSignIn = async (
    email: string,
    password: string,
    keepSignedIn: boolean
  ) => {
    const response = await axios.post(
      '/auth/sign-in',
      {
        email,
        password,
        keepSignedIn,
      },
      {
        validateStatus: status =>
          status === 200 || status === 400 || status === 500,
      }
    )

    if (response.status === 400 || response.status === 500)
      return { success: false, status: response.status }

    const { user } = response.data

    setUser({
      isSignedIn: true,
      ...user,
    })

    return { success: true, status: response.status }
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
