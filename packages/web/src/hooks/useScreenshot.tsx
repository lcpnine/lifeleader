import html2canvas from 'html2canvas'
import { useCallback, useRef } from 'react'

const useScreenShot = () => {
  const screenShotRef = useRef(null)

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

  return { takeScreenShot, screenShotRef }
}

export default useScreenShot
