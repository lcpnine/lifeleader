import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import axios from 'axios'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import TRANSLATIONS from './auth.i18n'
import AuthLink, { AuthPage } from './authLink'

const SignUp = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const { goTo } = useGoTo()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/sign-up', {
        email,
        password,
        nickname,
      })
      if (response.status === 201) goTo('/auth/sign-in', { replace: true })
      else console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
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
          <input
            type="text"
            placeholder="Nickname"
            className="border p-2 w-full mb-4"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
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

export default SignUp
