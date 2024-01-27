import { IS_DEV } from '@/constants/common'

export const deepCopy = (obj: any) => {
  if (typeof obj !== 'object') {
    return obj
  }
  const newObj: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}

export const isPasswordValid = (password: string) => {
  if (IS_DEV) return true
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
