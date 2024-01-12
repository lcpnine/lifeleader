import { MandalaChartView } from '@/constants/mandalaChart'
import { useEntryContext } from '@/contexts/EntryContext'
import { Dispatch, useEffect, useRef } from 'react'
import { deepCopy } from '../../../utils/common'
import FullViewMandalaChart from './FullViewMandalaChart'
import SingleViewMandalaChart from './SingleViewMandalaChart'

interface Props {
  viewOption: MandalaChartView
  wholeGridValues: string[][]
  setWholeGridValues: Dispatch<React.SetStateAction<string[][]>>
}

const MandalaChart = ({
  viewOption,
  wholeGridValues,
  setWholeGridValues,
}: Props) => {
  const { isMobile } = useEntryContext()
  const focusRef = useRef<HTMLDivElement>(null)

  const handleGridValue = (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => {
    const newGridValues = deepCopy(wholeGridValues)
    newGridValues[gridIndex][squareIndex] = newValue
    if (gridIndex === 4 && squareIndex !== 4) {
      newGridValues[squareIndex][gridIndex] = newValue
    }
    setWholeGridValues(newGridValues)
  }

  useEffect(() => {
    if (
      isMobile &&
      focusRef.current &&
      viewOption === MandalaChartView.FULL_VIEW
    ) {
      const div = focusRef.current
      const x = div.scrollWidth / 2
      const y = div.scrollHeight / 2
      div.scrollLeft = x - div.offsetWidth / 2
      div.scrollTop = y - div.clientHeight / 2
    }
  }, [isMobile, viewOption])

  return (
    <div
      className={`relative ${
        isMobile ? 'max-w-[400px] max-h-[400px]' : 'max-w-fit'
      } overflow-auto`}
      ref={focusRef}
    >
      {viewOption === MandalaChartView.FULL_VIEW ? (
        <FullViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
        />
      ) : (
        <SingleViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
        />
      )}
    </div>
  )
}

export default MandalaChart
