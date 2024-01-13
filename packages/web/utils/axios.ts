import axios from 'axios'

const setupAxios = () => {
  axios.defaults.baseURL = 'http://localhost:4003' // Your Express server URL

  // You can set other global settings here
  // For example, headers common to all requests:
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  // Add a request interceptor
  axios.interceptors.request.use(
    request => {
      // Modify request here if needed
      return request
    },
    error => {
      // Handle request error
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  axios.interceptors.response.use(
    response => {
      // Any status code within the range of 2xx cause this function to trigger
      return response
    },
    error => {
      // Any status codes outside the range of 2xx cause this function to trigger
      return Promise.reject(error)
    }
  )
}

export { setupAxios }
