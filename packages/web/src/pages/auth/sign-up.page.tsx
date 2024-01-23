import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { COMMON_TRANSLATIONS } from '@/constants/i18n'
import { useAlert } from '@/contexts/AlertContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import { gql } from '@apollo/client'
import axios from 'axios'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import { isPasswordValid } from '../../../utils/common'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const SignUp = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const { openAlert } = useAlert()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const { goTo } = useGoTo()

  const isFormValid = email && isPasswordValid(password) && nickname
  const isPasswordMatch = password === passwordConfirm

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!isFormValid) {
      openAlert({ text: translation('InvalidForm') })
      return
    }

    if (!isPasswordMatch) {
      openAlert({ text: translation('passwordMismatch') })
      return
    }

    try {
      const response = await axios.post(
        '/auth/sign-up',
        {
          email,
          password,
          passwordConfirm,
          nickname,
        },
        {
          validateStatus: status =>
            status === 200 || status === 400 || status === 409,
        }
      )
      if (response.status === 409)
        return openAlert({ text: translation('duplicatedUser') })
      if (response.status === 400)
        return openAlert({ text: translation('InvalidForm') })
      if (response.status === 200) {
        return openAlert({
          text: translation('sendVerificationEmail'),
          onClose: () => goTo('/'),
        })
      }
    } catch (error) {
      openAlert({ text: commonTranslation('serverError') })
    }
  }

  return (
    <>
      <Head>
        <title>{translation('signUp')}</title>
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
          <GeneralInput
            label={translation('passwordLabel')}
            type="password"
            placeholder={translation('passwordPlaceholder')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            invalidCondition={password.length > 0 && !isPasswordValid(password)}
            invalidAlert={translation('invalidPassword')}
            guide={translation('passwordGuide')}
          />
          <GeneralInput
            label={translation('passwordConfirmLabel')}
            type="password"
            placeholder={translation('confirmPasswordPlaceholder')}
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            invalidCondition={passwordConfirm.length > 0 && !isPasswordMatch}
            invalidAlert={translation('passwordMismatch')}
          />
          <GeneralInput
            label={translation('nicknameLabel')}
            type="text"
            placeholder={translation('nicknamePlaceholder')}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {translation('signUp')}
            </button>
          </div>
        </form>
        <div className="mt-4">
          <AuthLink
            destination={AuthPage.SignIn}
            descriptoinText={translation('signInDescription')}
          />
        </div>
      </div>
    </>
  )
}

const SIGN_UP_MUTATION = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $passwordConfirm: String!
    $nickname: String!
  ) {
    signUp(
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
      nickname: $nickname
    ) {
    }
  }
`

export default SignUp
