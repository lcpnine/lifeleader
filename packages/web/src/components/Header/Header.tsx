import { SUPPORTING_LANGUAGES } from '@/constants/i18n'
import useI18n from '@/hooks/usei18n'
import { useRouter } from 'next/router'
import LifeLeaderIcon from './LifeLeader.png'

const Header = () => {
  const { locale, locales } = useRouter()
  const { changeLanguage } = useI18n()

  return (
    <header className="w-full py-4 bg-gray-400 flex justify-between items-center px-4 md:px-10">
      <div className="flex items-center">
        <img src={LifeLeaderIcon.src} alt="Logo" className="h-8 mr-2" />
        <span
          className="text-white text-xl font-semibold"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Life Leader
        </span>
      </div>
      <div>
        <select
          className="border rounded p-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          value={locale}
          onChange={e => changeLanguage(e.target.value)}
        >
          {locales?.map(locale => (
            <option key={locale} value={locale}>
              {
                SUPPORTING_LANGUAGES[
                  locale as keyof typeof SUPPORTING_LANGUAGES
                ]
              }
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}

export default Header
