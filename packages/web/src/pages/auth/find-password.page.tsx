import axios from 'axios'
import Head from 'next/head'
import { FormEventHandler, useState } from 'react'

const FindPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/findpassword', { email })
      alert('Password reset instructions sent to your email.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Find Password</title>
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Find Password
            </button>
          </div>
        </form>
        <div className="mt-4">
          Remembered your password?{' '}
          <a href="/auth/sign-in" className="text-blue-500 hover:text-blue-700">
            Sign In
          </a>
        </div>
      </div>
    </>
  )
}

export default FindPassword
