import { CreateMandalaChartInput } from '../../../gql/graphql'

export const getGridByIndexFromCreateMandalaChartInput = (
  wholeGridValues: CreateMandalaChartInput,
  gridIndex: number
) => {
  if (gridIndex === 4) {
    return wholeGridValues.centerCell
  }
  if (gridIndex < 4) {
    return wholeGridValues.surroundingCells[gridIndex]
  }
  return wholeGridValues.surroundingCells[gridIndex - 1]
}

export const getSquareByIndexFromMandalaCellInput = (
  mandalaCellInput: CreateMandalaChartInput['centerCell'],
  squareIndex: number
) => {
  if (squareIndex === 4) {
    return mandalaCellInput.goal
  }
  if (squareIndex < 4) {
    return mandalaCellInput.tasks[squareIndex]
  }
  return mandalaCellInput.tasks[squareIndex - 1]
}

export const getMainGoalFromMandalaChartInput = (
  wholeGridValues: CreateMandalaChartInput
) => {
  return wholeGridValues.centerCell.goal
}

export const getSubGoalsFromMandalaChartInput = (
  wholeGridValues: CreateMandalaChartInput
) => {
  return wholeGridValues.centerCell.tasks
}

export const getGridByIndexFromMandalaChartInput = (
  wholeGridValues: CreateMandalaChartInput,
  gridIndex: number
) => {
  if (gridIndex === 4) {
    return wholeGridValues.centerCell
  }
  if (gridIndex < 4) {
    return wholeGridValues.surroundingCells[gridIndex]
  }
  return wholeGridValues.surroundingCells[gridIndex - 1]
}

export const getValueByGridIndexAndSquareIndexFromMandalaChartInput = (
  wholeGridValues: CreateMandalaChartInput,
  gridIndex: number,
  squareIndex: number
) => {
  const grid = getGridByIndexFromMandalaChartInput(wholeGridValues, gridIndex)
  return getSquareByIndexFromMandalaCellInput(grid, squareIndex)
}