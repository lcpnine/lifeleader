import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { COMMON_TRANSLATIONS } from '@/constants/common.i18n'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import {
  ResetPasswordDocument,
  ResetPasswordFailureType,
} from '../../../gql/graphql'
import { isPasswordValid } from '../../../utils/common'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const router = useRouter()
  const { token } = router.query
  const { goTo } = useGoTo()
  const { showLoading } = useLoading()
  const { openAlert } = useAlert()
  const { getTranslation, metaTranslation } = useI18n()
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const translation = getTranslation(TRANSLATIONS)
  const isPasswordMatch = password === passwordConfirm
  const [handleResetPassword] = useMutation(ResetPasswordDocument)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!isPasswordValid(password)) {
      openAlert({ text: translation('InvalidPassword') })
      return
    }

    if (!isPasswordMatch) {
      openAlert({ text: translation('passwordMismatch') })
      return
    }

    try {
      showLoading(true)
      const { data } = await handleResetPassword({
        variables: {
          token: token as string,
          newPassword: password,
          newPasswordConfirm: passwordConfirm,
        },
        onCompleted: () => showLoading(false),
      })
      const { ResetPasswordSuccess, ResetPasswordFailure } = extractByTypename(
        data?.resetPassword
      )
      if (ResetPasswordSuccess) {
        goTo('/auth/sign-in', { replace: true })
        return
      }
      const errorType = ResetPasswordFailure?.errorType
      if (errorType) {
        if (errorType === ResetPasswordFailureType.InvalidToken) {
          openAlert({ text: translation('InvalidToken') })
          return
        }
        if (errorType === ResetPasswordFailureType.InvalidPassword) {
          openAlert({ text: translation('InvalidPassword') })
          return
        }
      }
    } catch (error) {
      openAlert({ text: commonTranslation('ServerError') })
    }
  }

  if (!token) {
    goTo('/auth/sign-in', { replace: true })
    return null
  }

  return (
    <>
      <Head>
        <title>{metaTranslation('ResetPasswordTitle')}</title>
        <meta
          name="description"
          content={metaTranslation('ResetPasswordDescription')}
        />
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
            invalidAlert={translation('InvalidPassword')}
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

const RESET_PASSWORD_MUTATOIN = gql`
  mutation ResetPassword(
    $newPassword: String!
    $newPasswordConfirm: String!
    $token: String!
  ) {
    resetPassword(
      token: $token
      newPassword: $newPassword
      newPasswordConfirm: $newPasswordConfirm
    ) {
      ... on ResetPasswordSuccess {
        success
      }
      ... on ResetPasswordFailure {
        errorType
      }
    }
  }
`

export default ResetPassword
