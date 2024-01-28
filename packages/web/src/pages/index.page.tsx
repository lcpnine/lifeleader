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

const Home = () => {
  const { currentLanguage } = useI18n()
  const { isSignedIn } = useUserContext()
  const { goTo } = useGoTo()

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
        Welcome to Life Leader
      </h1>
      <p className="mb-8 text-lg">
        At Life Leader, we're dedicated to providing tools that not only help
        you visualize your goals but also support you in achieving your dreams.
        With our latest offerings, including the insightful Mandala Chart and an
        AI recommendation system powered by GPT-4, we aim to guide you on your
        journey to success.
      </p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          What is a Mandala Chart?
        </h2>
        <p className="mb-4">
          The Mandala Chart, a concept developed in Japan, is a dynamic
          framework for organizing thoughts and goals. It's a versatile tool for
          breaking down complex objectives into smaller, actionable components,
          aiding in comprehensive planning and execution.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Structure of a Mandala Chart
        </h2>
        <p className="mb-4">
          The Mandala Chart is visually represented as a large square divided
          into nine smaller squares. The central square encapsulates the primary
          goal or theme, while the eight surrounding squares represent related
          sub-goals or aspects, offering a holistic perspective.
        </p>
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
        <h2 className="text-2xl font-semibold mb-4">
          Creating Your Mandala Chart
        </h2>
        <p className="mb-4">
          Begin by placing your central goal in the middle square. Surround it
          with eight related elements, each representing a sub-goal or aspect.
          Elaborate each section with specific actions or thoughts, creating a
          detailed roadmap for your objective.
        </p>
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
          Benefits of Using a Mandala Chart
        </h2>
        <p className="mb-4">
          Utilizing a Mandala Chart ensures a comprehensive view of your goals,
          promoting structured thinking and clarity. It's an invaluable tool for
          both personal and professional growth, adaptable to diverse scenarios
          and objectives.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Adapting the Chart to Your Needs
        </h2>
        <p className="mb-4">
          The Mandala Chart's versatility lies in its adaptability. Whether for
          educational purposes, career planning, or personal development, the
          chart can be customized to align with your unique aspirations and
          challenges.
        </p>
      </section>

      <section className="mb-8">
        <p className="mb-4 text-lg">
          By signing up with Life Leader, you gain the ability to save, modify,
          and revisit your Mandala Charts at any time. Plus, as part of our
          opening event, new sign-ups can now fully utilize the Chat GPT
          recommendation feature without any charge until February. Don’t miss
          this opportunity to enhance your journey to success with our advanced
          tools.
        </p>
      </section>

      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          className="sm:text-xs md:text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateChartClick}
        >
          Start Creating Your Mandala Chart
        </button>
        {!isSignedIn && (
          <button
            className="sm:text-xs md:text-base bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignUpClick}
          >
            Sign Up
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
            Registered already? Sign in to your account.
          </a>
        </div>
      )}
    </div>
  )
}

export default Home
