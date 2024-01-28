import { LANGUAGE_NAMES_SHORT, SUPPORTING_LANGUAGES } from '@/constants/i18n'
import { useUserContext } from '@/contexts/UserContext'
import useI18n from '@/hooks/useI18n'
import useSignOut from '@/hooks/useSignOut/useSignOut'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface SidebarProps {
  isSidebarOpen: boolean
  closeSidebar: () => void
}

const Sidebar = ({ isSidebarOpen, closeSidebar }: SidebarProps) => {
  const { currentLanguage, changeLanguage } = useI18n()
  const { isSignedIn } = useUserContext()
  const signOut = useSignOut()
  const handleSignOut = async () => {
    await signOut()
    closeSidebar()
  }

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity ${
        isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed inset-0 z-50 transform bg-white p-4 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-semibold">Navigation</span>
          <button onClick={closeSidebar}>
            <XMarkIcon width="32" height="32" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mb-4">
          <Link
            href="/mandala/my-list"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Your Charts
          </Link>
          <Link
            href="/mandala/chart"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Create a New Chart
          </Link>
          {isSignedIn ? (
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/sign-in"
              className="block px-3 py-2 rounded hover:bg-gray-100"
              onClick={closeSidebar}
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Language Selector */}
        <div>
          <span className="font-semibold">Choose Language</span>
          <select
            className="border rounded p-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500 mt-2 w-full"
            value={currentLanguage}
            onChange={e =>
              changeLanguage(e.target.value as SUPPORTING_LANGUAGES)
            }
          >
            {Object.entries(LANGUAGE_NAMES_SHORT).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
