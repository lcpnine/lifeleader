import { COMMON_TRANSLATIONS } from '@/constants/i18n'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import { useUserContext } from '@/contexts/UserContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import useMandalaChart from '@/hooks/useMandalaChart.tsx'
import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  GetMandalaChartDocument,
  GetMandalaChartFailureType,
} from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './chart.i18n'

const MandalaChartPage = () => {
  const { getTranslation } = useI18n()
  const { user, isSignedIn } = useUserContext()
  const { goTo } = useGoTo()
  const translation = getTranslation(TRANSLATIONS)
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const { openAlert } = useAlert()
  const router = useRouter()
  const chartId = router.query.chartId as string | undefined
  const { showLoading } = useLoading()

  const {
    ThemeSelector,
    AIModeSwitch,
    MandalaChart,
    Recommendations,
    ScreenShotComponent,
    SaveChartButton,
    DownloadImageButton,
    setWholeGridValues,
  } = useMandalaChart()

  const { loading } = useQuery(GetMandalaChartDocument, {
    variables: {
      input: { mandalaChartId: chartId as string },
    },
    onCompleted: data => {
      const { GetMandalaChartSuccess, GetMandalaChartFailure } =
        extractByTypename(data.getMandalaChart)

      const errorType = GetMandalaChartFailure?.errorType
      if (errorType) {
        if (errorType === GetMandalaChartFailureType.ChartNotFound) {
          openAlert({
            text: translation('ChartNotFound'),
          })
          return goTo('/mandala/my-list')
        }
        if (errorType === GetMandalaChartFailureType.PrivateChart) {
          openAlert({
            text: translation('PrivateChart'),
          })
          return goTo('/mandala/my-list')
        }
      }

      const mandalaChart = GetMandalaChartSuccess?.mandalaChart
      if (mandalaChart) setWholeGridValues(mandalaChart)
    },
    skip: chartId === undefined,
  })

  const handleLoadSavedChartClick = () => {
    if (!isSignedIn) {
      openAlert({
        text: commonTranslation('NeedToSignIn'),
      })
      return goTo('/auth/sign-in')
    }
    goTo('/mandala/my-list')
  }

  useEffect(() => {
    if (loading) {
      showLoading(true)
    } else {
      showLoading(false)
    }
  }, [loading])

  return (
    <>
      <Head>
        <title>{translation('tabTitle')}</title>
        <meta name="description" content={translation('description')} />
      </Head>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold text-center text-blue-600 my-4 shadow-sm">
          {translation('title')}
        </h1>
        <div className="flex items-center justify-center w-3/5">
          <p className="break-words">{translation('description')}</p>
        </div>
        <div className="pt-4">
          <p
            className="inline-block px-4 py-2 text-gray-500 hover:text-gray-900 italic underline transition duration-300
          focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mb-4 hover:cursor-pointer"
            onClick={handleLoadSavedChartClick}
          >
            {translation('loadSavedChart')}
          </p>
        </div>
        <div className="pb-4">{ThemeSelector}</div>
        {user.purchasedInfo.isPurchased && (
          <div className="pt-4 flex flex-col items-center justify-center">
            {AIModeSwitch}
          </div>
        )}
        <div className="pt-4">{MandalaChart}</div>
        <div className="pt-4 flex gap-2">
          {SaveChartButton}
          {DownloadImageButton}
        </div>
      </div>
      {Recommendations}
      {ScreenShotComponent}
    </>
  )
}

const GET_MANDALA_CHART_QUERY = gql`
  query GetMandalaChart($input: GetMandalaChartInput!) {
    getMandalaChart(input: $input) {
      ... on GetMandalaChartSuccess {
        mandalaChart {
          _id
          title
          description
          private
          createdAt
          lastModifiedAt
          centerCell {
            goal
            tasks
          }
          surroundingCells {
            goal
            tasks
          }
        }
      }
      ... on GetMandalaChartFailure {
        errorType
      }
    }
  }
`

export default MandalaChartPage
