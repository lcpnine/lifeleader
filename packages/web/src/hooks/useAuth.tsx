import { useUserInfoContext } from '@/contexts/UserInfoContext'
import axios from 'axios'

const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

const useAuth = () => {
  const { setUserInfo } = useUserInfoContext()

  const handleSignIn = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/sign-in', {
      email,
      password,
    })

    if (response.status === 400) return { success: false }

    const { user, token } = response.data

    localStorage.setItem('token', token)
    setAuthToken(token)
    setUserInfo({
      isSignedIn: true,
      email: user.email,
      nickname: user.nickname,
      setUserInfo,
    })

    return { success: true }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setAuthToken(null)
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
