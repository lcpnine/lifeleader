import { IS_SSR } from '@/constants/common'
import axios from 'axios'
import fileSaver from 'file-saver'
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

  const takeScreenShot = useCallback(async () => {
    const screenshotRoot = document.getElementById(SCREENSHOT_ROOT_ID)

    if (screenshotRoot) {
      screenshotRoot.classList.remove('hidden')

      const res = await axios.post(
        '/screenshot',
        {
          html: JSON.stringify(screenshotRoot?.innerHTML),
        },
        {
          responseType: 'blob',
          responseEncoding: 'binary',
        }
      )

      const blob = new Blob([res.data], { type: 'image/png' })
      fileSaver.saveAs(blob, 'mandala_chart.png')
    }
  }, [])

  return { takeScreenShot, ScreenShotComponent }
}

export default useScreenShot
