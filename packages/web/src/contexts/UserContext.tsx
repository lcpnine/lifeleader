import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

export interface User {
  isSignedIn: boolean
  email: string
  nickname: string
  createdAt: string
  purchasedInfo: {
    isPurchased: boolean
    purchasedAt: string
    expiresAt: string
  }
}

export interface UserContext {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

export const DEFAULT_USER = {
  isSignedIn: false,
  email: '',
  nickname: 'Guest',
  createdAt: '',
  purchasedInfo: {
    isPurchased: false,
    purchasedAt: '',
    expiresAt: '',
  },
}

const DefaultUserInfoContext: UserContext = {
  user: DEFAULT_USER,
  setUser: (userInfo: any) => {},
}

const UserInfoContext = createContext(DefaultUserInfoContext)

export const useUserContext = () => useContext(UserInfoContext)

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser?: User
}) => {
  const [user, setUser] = useState<User>(
    initialUser || DefaultUserInfoContext.user
  )

  const value: UserContext = {
    user,
    setUser,
  }

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  )
}
