import { useLoading } from '@/contexts/LoadingContext'
import { useUserContext } from '@/contexts/UserContext'
import useGoTo from '@/hooks/useGoTo'
import useMandalaChartDelete from '@/hooks/useMandalaChartDelete'
import { gql, useQuery } from '@apollo/client'
import {
  InboxIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { GetUserMandalaChartsDocument } from '../../../gql/graphql'
import { formatDate } from '../../../utils/common'
import { extractByTypename } from '../../../utils/typeguard'

const MyMandalaChartsPage = () => {
  const { user } = useUserContext()
  const { goTo } = useGoTo()
  const { loading, error, data, refetch } = useQuery(
    GetUserMandalaChartsDocument,
    {
      variables: {
        input: {
          userId: user._id,
        },
      },
    }
  )
  const { handleDeleteChart, deleteLoading } = useMandalaChartDelete()
  const { showLoading } = useLoading()

  if (error) return <p>Error: {error.message}</p>

  const { GetUserMandalaChartsSuccess } = extractByTypename(
    data?.getUserMandalaCharts
  )

  const mandalaCharts = GetUserMandalaChartsSuccess?.mandalaCharts || []

  const handleCreateChart = () => {
    goTo('/mandala/chart')
  }

  const handleViewChart = (mandalaChartId: string) => {
    goTo(`/mandala/chart`, {
      params: {
        _id: mandalaChartId,
      },
    })
  }

  useEffect(() => {
    if (loading || deleteLoading) {
      showLoading(true)
    } else {
      showLoading(false)
    }
  }, [loading, deleteLoading])

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-center">Your Mandala Charts</h1>
      {mandalaCharts.length !== 0 && (
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center text-gray-900 hover:text-blue-700 font-bold py-1 px-2 text-sm"
            onClick={() => goTo('/mandala/chart')}
          >
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            Create Mandala Chart
          </button>
        </div>
      )}
      {mandalaCharts.length === 0 ? (
        <div className="text-center mt-10">
          <InboxIcon className="mx-auto h-36 w-36 text-gray-400" />
          <h3 className="mt-2 text-xl font-bold text-gray-900">
            No Mandala Charts Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first Mandala chart.
          </p>
          <div
            className="flex justify-center items-center text-gray-900 hover:text-blue-700 hover:cursor-pointer font-bold py-4 px-2 text-l"
            onClick={() => goTo('/create-mandala-chart')}
          >
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            Create Mandala Chart
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {mandalaCharts.map(chart => (
            <div
              key={chart._id}
              className={`bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                isMobile ? 'w-96' : 'w-[720px]'
              }`}
              onClick={() => handleViewChart(chart._id)}
            >
              <div className="p-4 flex justify-between items-center">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    {chart.private ? (
                      <LockClosedIcon className="h-5 w-5 text-gray-700 mr-2" />
                    ) : (
                      <LockOpenIcon className="h-5 w-5 text-gray-700 mr-2" />
                    )}
                    <h2 className="text-xl font-semibold">{chart.title}</h2>
                  </div>
                  {chart.description && (
                    <p className="italic whitespace-normal break-all w-11/12 mb-2">
                      {chart.description}
                    </p>
                  )}
                  <div className="text-sm">
                    <p>{chart.private ? 'Private' : 'Public'}</p>
                    <p>Created: {formatDate(chart.createdAt)}</p>
                    {chart.lastModifiedAt && (
                      <p>Updated: {formatDate(chart.lastModifiedAt)}</p>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="flex items-center text-gray-900 hover:text-red-500 font-bold py-1 px-2 text-sm"
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteChart(chart._id, refetch)
                    }}
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </div>
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
          createdAt
          lastModifiedAt
        }
      }
      ... on GetUserMandalaChartsFailure {
        errorType
      }
    }
  }
`

export default MyMandalaChartsPage
