import { useAlert } from '@/contexts/AlertContext'
import useAuth from '@/hooks/useAuth'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const SignIn = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const { openAlert } = useAlert()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)

  const { goTo } = useGoTo()
  const { handleSignIn } = useAuth()

  const isFormValid = email && password

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!isFormValid) {
      openAlert(translation('invalidForm'))
      return
    }

    try {
      await handleSignIn(email, password, keepSignedIn)

      goTo('/', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>{translation('signIn')}</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4"
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

export default SignIn
