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
  const { user } = useUserContext()
  const { goTo } = useGoTo()
  const translation = getTranslation(TRANSLATIONS)
  const { openAlert } = useAlert()
  const router = useRouter()
  const chartId = router.query.chartId as string | undefined
  const { showLoading } = useLoading()

  const {
    Title,
    Description,
    ThemeSelector,
    AIModeSwitch,
    MandalaChart,
    Recommendations,
    ScreenShotComponent,
    SaveChartButton,
    DownloadImageButton,
    wholeGridValues,
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
        {Title}
        <div className="flex items-center justify-center w-4/5">
          {Description}
        </div>
        <div className="pt-4">{MandalaChart}</div>
        {user.purchasedInfo.isPurchased && (
          <div className="pt-4 flex flex-col items-center justify-center">
            {AIModeSwitch}
          </div>
        )}
        <div className="pt-4">{ThemeSelector}</div>
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
