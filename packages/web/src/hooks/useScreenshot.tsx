import { IS_SSR } from '@/constants/common'
import html2canvas from 'html2canvas'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  component: ReactNode
}

export const SCREENSHOT_ROOT_ID = 'screenshot-root'

const useScreenShot = ({ component }: Props) => {
  const [isReady, setIsReady] = useState(false)

  const ScreenShotComponent = () => {
    return (
      !IS_SSR &&
      isReady &&
      createPortal(
        <div className="m-2">{component}</div>,
        document.getElementById(SCREENSHOT_ROOT_ID) as HTMLElement
      )
    )
  }

  useEffect(() => {
    setIsReady(true)
    return () => {
      setIsReady(false)
    }
  }, [])

  const takeScreenShot = useCallback(() => {
    const screenshotRoot = document.getElementById(SCREENSHOT_ROOT_ID)

    if (screenshotRoot) {
      screenshotRoot.classList.remove('hidden')
      html2canvas(screenshotRoot)
        .then(canvas => {
          const image = canvas.toDataURL('image/png')

          const link = document.createElement('a')
          link.download = 'mandala_chart.png'
          link.href = image
          link.click()
        })
        .catch(err => {
          console.error('Error taking screenshot:', err)
        })
        .finally(() => {
          screenshotRoot.classList.add('hidden')
        })
    }
  }, [])

  return { takeScreenShot, ScreenShotComponent }
}

export default useScreenShot
