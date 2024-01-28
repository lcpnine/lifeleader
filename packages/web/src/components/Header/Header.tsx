import { LANGUAGE_NAMES_SHORT, SUPPORTING_LANGUAGES } from '@/constants/i18n'
import { useUserContext } from '@/contexts/UserContext'

import { useEntryContext } from '@/contexts/EntryContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import useSignOut from '@/hooks/useSignOut/useSignOut'
import TRANSLATIONS from '@/pages/auth/auth.i18n'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LifeLeaderIcon from 'public/logo/image-only.png'
import { useState } from 'react'
import Sidebar from '../Sidebar'

const Header = () => {
  const { locale, locales } = useRouter()
  const { isMobile } = useEntryContext()
  const { changeLanguage, getTranslation } = useI18n()
  const signOut = useSignOut()
  const translation = getTranslation(TRANSLATIONS)
  const {
    user: { nickname },
    isSignedIn,
  } = useUserContext()
  const handleSignOut = async () => {
    await signOut()
  }
  const { goTo } = useGoTo()

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <>
      <header className="w-full py-4 bg-gray-400 flex justify-between items-center px-4 md:px-10">
        <div
          className="flex items-center"
          onClick={() => goTo('/')}
          style={{ cursor: 'pointer' }}
        >
          <img src={LifeLeaderIcon.src} alt="Logo" className="h-8 mr-2" />
          <span
            className="text-white text-xl font-semibold"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Life Leader
          </span>
        </div>
        <div className="flex items-center">
          {!isMobile && (
            <>
              {/* Page Navigation */}
              <div className="hidden md:flex items-center mr-4">
                {isSignedIn && (
                  <Link
                    href="/mandala/my-list"
                    className="text-slate-100 px-3 py-1 font-bold transition duration-300 mr-2"
                  >
                    Your Charts
                  </Link>
                )}
                <Link
                  href="/mandala/chart"
                  className="text-slate-100 px-3 py-1 font-bold transition duration-300"
                >
                  Create a New Chart
                </Link>
              </div>
              {/* Authentication Section */}
              {isSignedIn ? (
                <div className="flex items-center mr-4">
                  <span className="text-white font-medium mr-4">
                    {nickname}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition duration-300"
                  >
                    {translation('signOut')}
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition duration-300 mr-4"
                >
                  {translation('signIn')}
                </Link>
              )}
              {/* Language Selector */}
              <select
                className="border rounded p-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500 mr-4"
                value={locale}
                onChange={e =>
                  changeLanguage(e.target.value as SUPPORTING_LANGUAGES)
                }
              >
                {locales?.map(locale => (
                  <option key={locale} value={locale}>
                    {
                      LANGUAGE_NAMES_SHORT[
                        locale as keyof typeof SUPPORTING_LANGUAGES
                      ]
                    }
                  </option>
                ))}
              </select>
            </>
          )}
          <button onClick={toggleSidebar} className="md:hidden">
            Menu
          </button>
        </div>
      </header>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
    </>
  )
}

export default Header
