import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { COMMON_TRANSLATIONS } from '@/constants/i18n'
import { useAlert } from '@/contexts/AlertContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import { isPasswordValid } from '../../../utils/common'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const router = useRouter()
  const { token } = router.query
  const { goTo } = useGoTo()
  const { openAlert } = useAlert()
  const { getTranslation } = useI18n()
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const translation = getTranslation(TRANSLATIONS)
  const isPasswordMatch = password === passwordConfirm

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(
        '/auth/reset-password',
        { token, password },
        { validateStatus: status => status === 200 || status === 400 }
      )
      if (res.status === 400) {
        openAlert({ text: translation('invalidToken') })
        return
      }
      goTo('/auth/sign-in', { replace: true })
    } catch (error) {
      openAlert({ text: commonTranslation('serverError') })
    }
  }

  if (!token) {
    goTo('/auth/sign-in', { replace: true })
    return null
  }

  return (
    <>
      <Head>
        <title>{translation('resetPassword')}</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <GeneralInput
            label={translation('newPasswordLabel')}
            type="password"
            placeholder={translation('newPasswordPlaceholder')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            invalidCondition={password.length > 0 && !isPasswordValid(password)}
            invalidAlert={translation('invalidPassword')}
            guide={translation('passwordGuide')}
          />
          <GeneralInput
            label={translation('confirmNewPasswordLabel')}
            type="password"
            placeholder={translation('confirmNewPasswordPlaceholder')}
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            invalidCondition={passwordConfirm.length > 0 && !isPasswordMatch}
            invalidAlert={translation('passwordMismatch')}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {translation('resetPassword')}
            </button>
          </div>
        </form>
        <div className="mt-4">
          <AuthLink
            destination={AuthPage.SignIn}
            descriptoinText={translation('signInFromForgotPasswordDescription')}
          />
        </div>
      </div>
    </>
  )
}

export default ResetPassword
