import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { COMMON_TRANSLATIONS } from '@/constants/i18n'
import { useAlert } from '@/contexts/AlertContext'
import useI18n from '@/hooks/useI18n'
import axios from 'axios'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const FindPassword = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const { openAlert } = useAlert()

  const [email, setEmail] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!email) {
      openAlert({ text: translation('invalidForm') })
      return
    }

    try {
      const response = await axios.post(
        '/auth/find-password',
        { email },
        {
          validateStatus: status => status === 200 || status === 404,
        }
      )
      if (response.status === 404)
        return openAlert({ text: translation('noUser') })
      if (response.status === 200) {
        openAlert({ text: translation('notifyResetPasswordMail') })
        return
      }
    } catch (error) {
      openAlert({ text: commonTranslation('serverError') })
    }
  }

  return (
    <>
      <Head>
        <title>{translation('findPassword')}</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <GeneralInput
            label={translation('emailLabel')}
            type="email"
            placeholder={translation('emailPlaceholder')}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {translation('findPassword')}
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

export default FindPassword
