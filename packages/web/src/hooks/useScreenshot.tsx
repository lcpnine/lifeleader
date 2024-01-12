import { IS_SSR } from '@/constants/common'
import html2canvas from 'html2canvas'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  component: ReactNode
}

const useScreenShot = ({ component }: Props) => {
  const [isReady, setIsReady] = useState(false)
  const screenShotRef = useRef(null)

  const ScreenShotComponent = () => {
    return (
      !IS_SSR &&
      isReady &&
      createPortal(
        <div className="m-2" ref={screenShotRef}>
          {component}
        </div>,
        document.getElementById('screenshot-root') as HTMLElement
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
    if (screenShotRef.current) {
      html2canvas(screenShotRef.current)
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
    }
  }, [])

  return { takeScreenShot, ScreenShotComponent }
}

export default useScreenShot
