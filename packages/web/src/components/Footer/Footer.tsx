import { useUserContext } from '@/contexts/UserContext'
import useSignOut from '@/hooks/useSignOut/useSignOut'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const signOut = useSignOut()
  const { isSignedIn } = useUserContext()

  const handleLogout = () => {
    signOut().then(() => {
      router.push('/')
    })
  }

  return (
    <footer className="w-full bg-gray-200 py-4">
      <div className="text-center">
        <p className="font-semibold mb-2 text-gray-700">Achieve Your Dreams</p>
        <div className="inline-flex gap-4 justify-center">
          {isSignedIn && (
            <>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 hover:underline"
              >
                Log Out
              </button>
              <span className="text-gray-600">|</span>
              <a
                href="/auth/delete-account"
                className="text-gray-600 hover:text-gray-800 hover:underline"
              >
                Delete Account
              </a>
              <span className="text-gray-600">|</span>
            </>
          )}
          <a
            href="mailto:life.leader.me@gmail.com"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
