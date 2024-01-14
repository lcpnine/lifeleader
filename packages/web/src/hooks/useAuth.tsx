import { useUserInfoContext } from '@/contexts/UserInfoContext'
import axios from 'axios'

const useAuth = () => {
  const { setUserInfo } = useUserInfoContext()

  const handleSignIn = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/sign-in', {
      email,
      password,
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
    await axios.get('/api/auth/sign-out')

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
