import { useUserInfoContext } from '@/contexts/UserInfoContext'
import axios from 'axios'

const useAuth = () => {
  const { setUserInfo } = useUserInfoContext()

  const handleSignIn = async (
    email: string,
    password: string,
    keepSignedIn: boolean
  ) => {
    const response = await axios.post('/auth/sign-in', {
      email,
      password,
      keepSignedIn,
    })

    if (response.status === 400) return { success: false }

    const { user } = response.data

    setUserInfo({
      isSignedIn: true,
      email: user.email,
      nickname: user.nickname,
      setUserInfo,
    })

    return { success: true }
  }

  const handleSignOut = async () => {
    await axios.get('/auth/sign-out')

    setUserInfo({
      isSignedIn: false,
      email: '',
      nickname: 'Guest',
      setUserInfo,
    })
  }

  return {
    handleSignIn,
    handleSignOut,
  }
}

export default useAuth
