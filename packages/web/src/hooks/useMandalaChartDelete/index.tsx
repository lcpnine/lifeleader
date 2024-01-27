import { useAlert } from '@/contexts/AlertContext'
import { gql, useMutation } from '@apollo/client'
import { DeleteMandalaChartDocument } from '../../../gql/graphql'
import useI18n from '../useI18n'
import { TRANSLATIONS } from './index.i18n'

const useMandalaChartDelete = () => {
  const [deleteMandalaChart, { loading: deleteLoading }] = useMutation(
    DeleteMandalaChartDocument
  )
  const { openAlert } = useAlert()
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  const handleDeleteChart = (mandalaChartId: string, onDelete?: () => void) => {
    deleteMandalaChart({
      variables: {
        input: {
          mandalaChartId,
        },
      },
      onCompleted: () => {
        openAlert({
          text: translation('DeleteSuccess'),
        })
        onDelete?.()
      },
    })
  }

  return {
    handleDeleteChart,
    deleteLoading,
  }
}

const DELETE_MANDALA_CHART_MUTATION = gql`
  mutation DeleteMandalaChart($input: DeleteMandalaChartInput!) {
    deleteMandalaChart(input: $input) {
      ... on DeleteMandalaChartSuccess {
        _id
      }
      ... on DeleteMandalaChartFailure {
        errorType
      }
    }
  }
`

export default useMandalaChartDelete
