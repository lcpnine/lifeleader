import { SUPPORTING_LANGUAGES } from '@/constants/common.i18n'
import { useUserContext } from '@/contexts/UserContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import Image from 'next/image'
import EnglishMandalaChartExample from 'public/images/example/en.png'
import EnglishMandalaEmptyChartExample from 'public/images/example/en_empty.png'
import KoreanMandalaChartExample from 'public/images/example/ko.png'
import KoreanMandalaEmptyChartExample from 'public/images/example/ko_empty.png'
import ChineseTraditioanlMandalaChartExample from 'public/images/example/zh.png'
import ChineseTraditioanlMandalaEmptyChartExample from 'public/images/example/zh_empty.png'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { currentLanguage, getTranslation } = useI18n()
  const { isSignedIn } = useUserContext()
  const { goTo } = useGoTo()
  const translation = getTranslation(TRANSLATIONS)

  const getExampleChart = () => {
    if (currentLanguage === SUPPORTING_LANGUAGES.ko)
      return KoreanMandalaChartExample
    if (currentLanguage === SUPPORTING_LANGUAGES['zh-Hant'])
      return ChineseTraditioanlMandalaChartExample
    return EnglishMandalaChartExample
  }

  const getExampleEmptyChart = () => {
    if (currentLanguage === SUPPORTING_LANGUAGES.ko)
      return KoreanMandalaEmptyChartExample
    if (currentLanguage === SUPPORTING_LANGUAGES['zh-Hant'])
      return ChineseTraditioanlMandalaEmptyChartExample
    return EnglishMandalaEmptyChartExample
  }

  const handleCreateChartClick = () => {
    goTo('/mandala/chart')
  }

  const handleSignUpClick = () => {
    goTo('/auth/sign-up')
  }

  const handleSignInClick = () => {
    goTo('/auth/sign-in')
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {translation('WelcomeToLifeLeader')}
      </h1>
      <p className="mb-8 text-lg">{translation('WelcomingParagraph')}</p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {translation('WhatIsMandalaChart')}
        </h2>
        <p className="mb-4">{translation('MandalaChartExplanation')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {translation('StructureOfMandalaChart')}
        </h2>
        <p className="mb-4">{translation('StructureExplanation')}</p>
        <div className="flex justify-center">
          <Image
            src={getExampleEmptyChart().src}
            width={500}
            height={500}
            alt="empty chart"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {translation('CreatingYourMandalaChart')}
        </h2>
        <p className="mb-4">{translation('CreatingChartExplanation')}</p>
        <div className="flex justify-center">
          <Image
            src={getExampleChart().src}
            width={500}
            height={500}
            alt="example chart"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {translation('BenefitsOfUsingMandalaChart')}
        </h2>
        <p className="mb-4">{translation('BenefitsExplanation')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {translation('AdaptingChartToYourNeeds')}
        </h2>
        <p className="mb-4">
          {translation('AdaptingChartToYourNeedsExplanation')}
        </p>
      </section>

      <section className="mb-8">
        <p className="mb-4 text-lg">{translation('SignUpInvitation')}</p>
      </section>

      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          className="sm:text-xs md:text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateChartClick}
        >
          {translation('StartCreatingYourMandalaChart')}
        </button>
        {!isSignedIn && (
          <button
            className="sm:text-xs md:text-base bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignUpClick}
          >
            {translation('SignUp')}
          </button>
        )}
      </div>
      {!isSignedIn && (
        <div className="text-center">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 visited:text-purple-800"
            onClick={handleSignInClick}
          >
            {translation('AlreadyRegisteredSignIn')}
          </a>
        </div>
      )}
    </div>
  )
}

export default Home
