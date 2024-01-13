import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/sign-up', {
        email,
        password,
        nickname,
      })
      if (response.status === 201) router.replace('/auth/sign-in')
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
          Already have an account?{' '}
          <a href="/auth/sign-in" className="text-blue-500 hover:text-blue-700">
            Sign In
          </a>
        </div>
      </div>
    </>
  )
}

export default SignUp
