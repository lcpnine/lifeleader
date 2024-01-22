import { useAlert } from '@/contexts/AlertContext'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const VerifyEmailPage = () => {
  const router = useRouter()
  const { token } = router.query
  const { openAlert } = useAlert()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (token) {
      verifyEmailToken(token as string)
    }
  }, [token])

  const verifyEmailToken = async (token: string) => {
    try {
      const response = await axios.post('/auth/verify-email', { token })
      if (response.status === 200) {
        setIsVerified(true)
        openAlert({
          text: 'Email verified successfully!',
          onClose: () => router.push('/auth/sign-in'),
        })
      }
    } catch (error) {
      openAlert({
        text: 'Verification failed. Please try again or contact support.',
      })
    }
  }

  if (!token) {
    return <div>Loading...</div>
  }

  if (isVerified) {
    return <div>Email successfully verified! Redirecting to sign in...</div>
  }

  return <div>Verifying your email...</div>
}

export default VerifyEmailPage
