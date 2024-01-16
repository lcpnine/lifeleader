import axios from 'axios'
import { useEffect, useState } from 'react'

type Props = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}

const useAxiosQuery = <T = unknown,>({ url, method, body }: Props) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios({
        url,
        method,
        data: body,
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
    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

export default useAxiosQuery
