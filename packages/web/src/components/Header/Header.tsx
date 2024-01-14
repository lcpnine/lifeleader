import { LANGUAGE_NAMES_SHORT, SUPPORTING_LANGUAGES } from '@/constants/i18n'
import { useUserInfoContext } from '@/contexts/UserInfoContext'
import useAuth from '@/hooks/useAuth'
import useI18n from '@/hooks/useI18n'
import TRANSLATIONS from '@/pages/auth/auth.i18n'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LifeLeaderIcon from 'public/logo/image-only.png'

const Header = () => {
  const { locale, locales } = useRouter()
  const { changeLanguage, getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const { isSignedIn, nickname } = useUserInfoContext()
  const { handleSignOut } = useAuth()

  return (
    <header className="w-full py-4 bg-gray-400 flex justify-between items-center px-4 md:px-10">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img src={LifeLeaderIcon.src} alt="Logo" className="h-8 mr-2" />
        <span
          className="text-white text-xl font-semibold"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Life Leader
        </span>
      </div>

      {/* Language Selector and Authentication */}
      <div className="flex items-center">
        {/* Language Selector */}
        <select
          className="border rounded p-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500 mr-4"
          value={locale}
          onChange={e => changeLanguage(e.target.value as SUPPORTING_LANGUAGES)}
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

        {/* Authentication Section */}
        {isSignedIn ? (
          <div className="flex items-center">
            <span className="text-white mr-4 text-lg font-medium">
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
            className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition duration-300"
          >
            {translation('signIn')}
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
