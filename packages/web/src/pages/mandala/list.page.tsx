import { useLoading } from '@/contexts/LoadingContext'
import { useUserContext } from '@/contexts/UserContext'
import useGoTo from '@/hooks/useGoTo'
import { gql, useQuery } from '@apollo/client'
import {
  DocumentTextIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { GetUserMandalaChartsDocument } from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'

const MyMandalaChartsPage = () => {
  const { user } = useUserContext()
  const { goTo } = useGoTo()
  const { loading, error, data } = useQuery(GetUserMandalaChartsDocument, {
    variables: {
      input: {
        userId: user._id,
      },
    },
  })
  const { showLoading } = useLoading()

  if (error) return <p>Error: {error.message}</p>

  const { GetUserMandalaChartsSuccess } = extractByTypename(
    data?.getUserMandalaCharts
  )

  const mandalaCharts = GetUserMandalaChartsSuccess?.mandalaCharts || []

  const handleViewChart = (mandalaChartId: string) => {
    goTo(`/mandala-chart/${mandalaChartId}`)
  }

  const handleDeleteChart = (mandalaChartId: string) => {
    console.log('Delete chart:', mandalaChartId)
  }

  useEffect(() => {
    if (loading) {
      showLoading(true)
    } else {
      showLoading(false)
    }
  }, [loading])

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Mandala Charts</h1>
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center text-gray-900 hover:text-gray-700 font-bold py-1 px-2 text-sm"
          onClick={() => goTo('/create-mandala-chart')}
        >
          <PlusCircleIcon className="h-5 w-5 mr-1" />
          Create Mandala Chart
        </button>
      </div>
      {mandalaCharts.length === 0 ? (
        <p>You have no Mandala charts.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {mandalaCharts.map(chart => (
            <div
              key={chart._id}
              className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{chart.title}</h2>
                {chart.description && (
                  <p className="italic whitespace-normal break-all w-11/12 mb-2">
                    {chart.description}
                  </p>
                )}
                <p className="text-sm">
                  {chart.private ? 'Private' : 'Public'}
                </p>
              </div>
              <div className="flex">
                <button
                  className="flex items-center text-gray-900 hover:text-gray-700 font-bold py-1 px-2 mr-2 text-sm"
                  onClick={() => handleViewChart(chart._id)}
                >
                  <DocumentTextIcon className="h-5 w-5 mr-1" />
                  View
                </button>
                <button
                  className="flex items-center text-gray-900 hover:text-red-500 font-bold py-1 px-2 text-sm"
                  onClick={() => handleDeleteChart(chart._id)}
                >
                  <TrashIcon className="h-5 w-5 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const GET_USER_MANDALA_CHARTS_QUERY = gql`
  query GetUserMandalaCharts($input: GetUserMandalaChartsInput!) {
    getUserMandalaCharts(input: $input) {
      ... on GetUserMandalaChartsSuccess {
        mandalaCharts {
          _id
          title
          description
          private
        }
      }
      ... on GetUserMandalaChartsFailure {
        errorType
      }
    }
  }
`

export default MyMandalaChartsPage
