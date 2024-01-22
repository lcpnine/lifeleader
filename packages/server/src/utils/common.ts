import { IS_DEV } from '../constant/common'

export const isPasswordValid = (password: string) => {
  if (IS_DEV) return true
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}
