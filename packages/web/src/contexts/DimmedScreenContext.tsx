import { ReactNode, createContext, useContext, useState } from 'react'

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

  const openDimmedScreen = () => {
    setIsDimmedScreenOpen(true)
  }

  const closeDimmedScreen = () => {
    setIsDimmedScreenOpen(false)
  }

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
