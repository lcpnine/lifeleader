import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { User } from '../../gql/graphql'

export interface UserContext {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  isSignedIn: boolean
}

export const DEFAULT_USER = {
  _id: '',
  email: '',
  nickname: 'Guest',
  createdAt: '',
  emailVerification: {
    isVerified: false,
    token: '',
    expires: '',
  },
  resetPassword: {
    token: '',
    expires: '',
    isVerified: false,
  },
  purchasedInfo: {
    isPurchased: false,
    purchasedAt: '',
    expiresAt: '',
  },
}

const DefaultUserInfoContext: UserContext = {
  user: DEFAULT_USER,
  setUser: (userInfo: any) => {},
  isSignedIn: false,
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
    isSignedIn: user._id !== '',
  }

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  )
}
