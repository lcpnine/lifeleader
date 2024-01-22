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

export function isPasswordValid(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}
