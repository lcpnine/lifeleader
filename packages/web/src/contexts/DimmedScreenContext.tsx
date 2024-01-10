import { createContext, useContext, useState } from 'react'

export const DIMMED_Z_INDEX = 50

const DefaultDimmedScreenContext = {
  openDimmedScreen: () => {},
  closeDimmedScreen: () => {},
  DimmedScreen: () => {},
}

const DimmedScreenContext = createContext(DefaultDimmedScreenContext)

export const useDimmedScreenContext = () => useContext(DimmedScreenContext)

export const DimmedScreenProvider = () => {
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
      value={{ openDimmedScreen, closeDimmedScreen, DimmedScreen }}
    >
      {DimmedScreen()}
    </DimmedScreenContext.Provider>
  )
}
