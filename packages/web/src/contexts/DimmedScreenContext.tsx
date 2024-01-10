import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export const DIMMED_Z_INDEX = 50

const DefaultDimmedScreenContext = {
  isDimmedScreenOpen: false,
  openDimmedScreen: () => {},
  closeDimmedScreen: () => {},
}

const DimmedScreenContext = createContext(DefaultDimmedScreenContext)

export const useDimmedScreenContext = () => useContext(DimmedScreenContext)

export const DimmedScreenProvider = ({ children }: { children: ReactNode }) => {
  const [isDimmedScreenOpen, setIsDimmedScreenOpen] = useState(false)

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth
  }
  const openDimmedScreen = () => {
    const scrollbarWidth = getScrollbarWidth()
    setIsDimmedScreenOpen(true)
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px` // Compensate for scrollbar width
  }

  const closeDimmedScreen = () => {
    setIsDimmedScreenOpen(false)
    document.body.style.overflow = ''
    document.body.style.paddingRight = '' // Remove compensation padding
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  const DimmedScreen = () => {
    return (
      isDimmedScreenOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[${DIMMED_Z_INDEX}]`}
          onClick={closeDimmedScreen}
        ></div>
      )
    )
  }

  return (
    <DimmedScreenContext.Provider
      value={{ isDimmedScreenOpen, openDimmedScreen, closeDimmedScreen }}
    >
      {DimmedScreen()}
      {children}
    </DimmedScreenContext.Provider>
  )
}
