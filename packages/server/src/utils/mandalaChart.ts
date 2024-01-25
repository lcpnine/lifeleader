import { MandalaCellInput } from '../resolvers/dto/mandalaChart.dto'

export const isMandalaChartInputValid = (
  centerCell: MandalaCellInput,
  surroundingCells: MandalaCellInput[]
) => {
  if (surroundingCells.length !== 8) return false

  for (let i = 0; i < 8; i++) {
    if (surroundingCells[i].tasks.length !== 8) return false
    if (centerCell.tasks[i] !== surroundingCells[i].goal) return false
    return true
  }

  return true
}
