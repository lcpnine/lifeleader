import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { handleSignIn } = useAuth()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      await handleSignIn(email, password)

      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4">
          Don't have an account?{' '}
          <a href="/auth/sign-up" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </a>
        </div>
        <div className="mt-2">
          Forgot password?{' '}
          <a
            href="/auth/find-password"
            className="text-blue-500 hover:text-blue-700"
          >
            Find Password
          </a>
        </div>
      </div>
    </>
  )
}

export default SignIn
