import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { COMMON_TRANSLATIONS } from '@/constants/common.i18n'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import useI18n from '@/hooks/useI18n'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import {
  FindPasswordDocument,
  FindPasswordFailureType,
} from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const FindPassword = () => {
  const { getTranslation, metaTranslation } = useI18n()
  const { showLoading } = useLoading()
  const translation = getTranslation(TRANSLATIONS)
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const [findPasswordMutation] = useMutation(FindPasswordDocument)
  const { openAlert } = useAlert()

  const [email, setEmail] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!email) {
      openAlert({ text: translation('InvalidForm') })
      return
    }

    try {
      showLoading(true)
      const { data } = await findPasswordMutation({
        variables: { email },
        onCompleted: () => showLoading(false),
      })
      const { FindPasswordSuccess, FindPasswordFailure } = extractByTypename(
        data?.findPassword
      )
      const errorType = FindPasswordFailure?.errorType
      if (errorType) {
        if (errorType === FindPasswordFailureType.UserNotFound)
          return openAlert({ text: translation('UserNotFound') })
        if (errorType === FindPasswordFailureType.ServerError)
          return openAlert({ text: commonTranslation('ServerError') })
      }
      if (!!FindPasswordSuccess?.success) {
        openAlert({ text: translation('SendResetPasswordMail') })
        return
      }
    } catch (error) {
      return openAlert({ text: commonTranslation('ServerError') })
    }
  }

  return (
    <>
      <Head>
        <title>{metaTranslation('FindPasswordTitle')}</title>
        <meta
          name="description"
          content={metaTranslation('FindPasswordDescription')}
        />
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

const FIND_PASSWORD_MUTATION = gql`
  mutation FindPassword($email: String!) {
    findPassword(email: $email) {
      ... on FindPasswordSuccess {
        success
      }
      ... on FindPasswordFailure {
        errorType
      }
    }
  }
`

export default FindPassword
