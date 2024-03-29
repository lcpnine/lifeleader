import GeneralInput from '@/components/GeneralInput/GeneralInput'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import { useUserContext } from '@/contexts/UserContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import { SignInDocument, SignInFailureType, User } from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const SignIn = () => {
  const { getTranslation, metaTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const { setUser } = useUserContext()
  const { openAlert } = useAlert()
  const { showLoading } = useLoading()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [signInMutation] = useMutation(SignInDocument)

  const router = useRouter()
  const { goTo } = useGoTo()
  const query = router.query
  const nextPath = query.nextPath as string | undefined

  const isFormValid = email && password

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!isFormValid) {
      openAlert({ text: translation('InvalidForm') })
      return
    }

    showLoading(true)
    const { data } = await signInMutation({
      variables: { email, password, keepSignedIn },
      onCompleted: () => showLoading(false),
    })

    const { SignInSuccess, SignInFailure } = extractByTypename(data?.signIn)

    const errorType = SignInFailure?.errorType

    if (errorType) {
      if (errorType === SignInFailureType.UserNotFound) {
        openAlert({ text: translation('UserNotFound') })
        return
      }

      if (errorType === SignInFailureType.WrongPassword) {
        openAlert({ text: translation('WrongPassword') })
        return
      }
    }

    if (SignInSuccess?.user) {
      setUser(SignInSuccess.user as User)
      // for the users who saved chart without login
      if (nextPath) return goTo(nextPath, { keepParams: true, alias: nextPath })
      return goTo('/', { replace: true })
    }
  }

  return (
    <>
      <Head>
        <title>{metaTranslation('SignInTitle')}</title>
        <meta
          name="description"
          content={metaTranslation('SignInDescription')}
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
          <GeneralInput
            label={translation('passwordLabel')}
            type="password"
            placeholder={translation('passwordPlaceholder')}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex justify-center items-center mb-4">
            <label htmlFor="keep-signed-in" className="flex items-center">
              <input
                type="checkbox"
                id="keep-signed-in"
                checked={keepSignedIn}
                onChange={e => setKeepSignedIn(e.target.checked)}
                className="mr-2"
              />
              {translation('keepSignedIn')}
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {translation('signIn')}
            </button>
          </div>
        </form>
        <div className="mt-4">
          <AuthLink
            destination={AuthPage.SignUp}
            descriptoinText={translation('signUpDescription')}
          />
        </div>
        <div className="mt-2">
          <AuthLink
            destination={AuthPage.FindPassword}
            descriptoinText={translation('findPasswordDescription')}
          />
        </div>
      </div>
    </>
  )
}

const SIGN_IN_MUTATION = gql`
  mutation SignIn(
    $email: String!
    $password: String!
    $keepSignedIn: Boolean!
  ) {
    signIn(email: $email, password: $password, keepSignedIn: $keepSignedIn) {
      ... on SignInSuccess {
        token
        user {
          _id
          email
          nickname
          createdAt
          emailVerification {
            isVerified
            token
            expiresAt
          }
          resetPassword {
            token
            expiresAt
            isVerified
          }
          purchasedInfo {
            isPurchased
            purchasedAt
            expiresAt
          }
        }
      }
      ... on SignInFailure {
        errorType
      }
    }
  }
`

export default SignIn
