import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import useI18n from '@/hooks/useI18n'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  VerifyEmailDocument,
  VerifyEmailFailureType,
} from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './auth.i18n'

const VerifyEmailPage = () => {
  const router = useRouter()
  const { token } = router.query
  const { openAlert } = useAlert()
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const [verifyEmailMutation, { loading }] = useMutation(VerifyEmailDocument)
  const { showLoading } = useLoading()

  useEffect(() => {
    showLoading(loading)
  }, [loading])

  useEffect(() => {
    if (token) {
      verifyEmailMutation({
        variables: { token: token as string },
        onCompleted: data => {
          const { VerifyEmailSuccess, VerifyEmailFailure } = extractByTypename(
            data.verifyEmail
          )
          if (VerifyEmailSuccess) {
            openAlert({
              text: translation('EmailVerified'),
              onClose: () => router.push('/auth/sign-in'),
            })
          } else {
            const errorType =
              VerifyEmailFailure?.errorType as VerifyEmailFailureType
            if (errorType === VerifyEmailFailureType.VerifiedEmail) {
              return openAlert({
                text: translation('VerifiedEmail'),
              })
            }
            if (errorType === VerifyEmailFailureType.InvalidToken) {
              return openAlert({
                text: translation('InvalidToken'),
              })
            }
          }
        },
        onError: () => {
          openAlert({
            text: translation('EmailVerificationFailed'),
          })
        },
      })
    }
  }, [token])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg font-semibold text-blue-600">
        <p>{translation('onEmailVerification')}</p>
      </div>
    </div>
  )
}

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      ... on VerifyEmailSuccess {
        success
      }
      ... on VerifyEmailFailure {
        errorType
      }
    }
  }
`

export default VerifyEmailPage
