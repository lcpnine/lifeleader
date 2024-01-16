import axios from 'axios'
import { useEffect, useState } from 'react'

type Props = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  skip?: boolean
}

const useAxiosQuery = <T = unknown,>({
  url,
  method,
  body,
  skip = false,
}: Props) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  const fetchData = async (newData?: { newBody?: any }) => {
    const { newBody } = newData || {}
    setLoading(true)
    try {
      const response = await axios({
        url,
        method,
        data: newBody ? newBody : body,
      })
      setData(response.data)
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!skip) fetchData()
  }, [url, skip])

  return { data, loading, error, refetch: fetchData }
}

export default useAxiosQuery
