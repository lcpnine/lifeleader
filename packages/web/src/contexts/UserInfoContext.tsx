import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

export interface UserInfo {
  isSignedIn: boolean
  email: string
  nickname: string
  setUserInfo: Dispatch<
    SetStateAction<{
      isSignedIn: boolean
      email: string
      nickname: string
      setUserInfo: (userInfo: any) => void
    }>
  >
}

const DefaultUserInfoContext: UserInfo = {
  isSignedIn: false,
  email: '',
  nickname: 'Guest',
  setUserInfo: (userInfo: any) => {},
}

const UserInfoContext = createContext(DefaultUserInfoContext)

export const useUserInfoContext = () => useContext(UserInfoContext)

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [UserInfo, setUserInfo] = useState(DefaultUserInfoContext)

  const value = {
    isSignedIn: UserInfo.isSignedIn,
    email: UserInfo.email,
    nickname: UserInfo.nickname,
    setUserInfo,
  }

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  )
}
