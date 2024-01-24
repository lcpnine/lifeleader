import Image from 'next/image'
import loadingSpinner from 'public/images/spinner.svg'
import { FC, ReactNode, createContext, useContext, useState } from 'react'

interface LoadingContextType {
  showLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType>({
  showLoading: () => {},
})

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, showLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ showLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
          <Image src={loadingSpinner} alt="Loading" />
        </div>
      )}
    </LoadingContext.Provider>
  )
}
