import { gql, useQuery } from '@apollo/client'

const MandalaChartsPage = () => {
  const { loading, error, data } = useQuery(GetUserMandalaChartsDocument)

  if (loading) return <p>Loading...</p> // Or a spinner component
  if (error) return <p>Error: {error.message}</p>

  const mandalaCharts = data?.getUserMandalaCharts?.mandalaCharts || []

  return (
    <div>
      <h1>Your Mandala Charts</h1>
      {mandalaCharts.length === 0 ? (
        <p>You have no Mandala charts.</p>
      ) : (
        <ul>
          {mandalaCharts.map(chart => (
            <li key={chart._id}>
              <h2>{chart.title}</h2>
              <p>{chart.description}</p>
              <p>{chart.private ? 'Private' : 'Public'}</p>
            </li>
          ))}
        </ul>
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

export default MandalaChartsPage
