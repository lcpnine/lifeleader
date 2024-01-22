import { COMMON_TRANSLATIONS } from '@/constants/i18n'
import { useAlert } from '@/contexts/AlertContext'
import useI18n from '@/hooks/useI18n'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const VerifyEmailPage = () => {
  const router = useRouter()
  const { token } = router.query
  const { openAlert } = useAlert()
  const [isVerified, setIsVerified] = useState(false)
  const { getTranslation } = useI18n()
  const commonTranslations = getTranslation(COMMON_TRANSLATIONS)

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-blue-600">
          <p>{commonTranslations('loading')}</p>
        </div>
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="text-xl font-bold text-green-600 mb-4">
          Email successfully verified!
        </div>
        <div className="text-lg text-gray-700">Redirecting to sign in...</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg font-semibold text-blue-600">
        Verifying your email...
      </div>
    </div>
  )
}

export default VerifyEmailPage
