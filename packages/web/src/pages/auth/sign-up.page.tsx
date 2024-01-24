import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import { SignUpDocument, SignUpFailureType } from '../../../gql/graphql'
import { isPasswordValid } from '../../../utils/common'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const SignUp = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const { openAlert } = useAlert()
  const [useSignUpMutation] = useMutation(SignUpDocument)
  const { showLoading } = useLoading()

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

    showLoading(true)
    const { data } = await useSignUpMutation({
      variables: { email, password, passwordConfirm, nickname },
      onCompleted: () => showLoading(false),
    })
    const { SignUpSuccess, SignUpFailure } = extractByTypename(data?.signUp)
    if (SignUpFailure?.errorType) {
      const errorType = SignUpFailure.errorType
      if (errorType === SignUpFailureType.ExistingEmail)
        return openAlert({ text: translation('ExistingEmail') })
      if (errorType === SignUpFailureType.InvalidPassword)
        return openAlert({ text: translation('InvalidPassword') })
    }
    const isMailSent = !!SignUpSuccess?.isMailSent
    if (isMailSent) {
      return openAlert({
        text: translation('SendVerificationEmail'),
        onClose: () => goTo('/'),
      })
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
            invalidAlert={translation('InvalidPassword')}
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
      ... on SignUpSuccess {
        isMailSent
      }
      ... on SignUpFailure {
        errorType
      }
    }
  }
`

export default SignUp
