import useI18n from '@/hooks/useI18n'
import Link from 'next/link'
import TRANSLATIONS from './auth.i18n'

export enum AuthPage {
  SignUp = 'sign-up',
  SignIn = 'sign-in',
  FindPassword = 'find-password',
}

interface Props {
  destination: AuthPage
  descriptoinText: string
}

const AuthLink = ({ destination, descriptoinText }: Props) => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  const getDestinationHref = (destination: AuthPage) => {
    switch (destination) {
      case AuthPage.SignUp:
        return '/auth/sign-up'
      case AuthPage.SignIn:
        return '/auth/sign-in'
      case AuthPage.FindPassword:
        return '/auth/find-password'
    }
  }

  const getButtonText = (destination: AuthPage) => {
    switch (destination) {
      case AuthPage.SignUp:
        return translation('signUp')
      case AuthPage.SignIn:
        return translation('signIn')
      case AuthPage.FindPassword:
        return translation('findPassword')
      default:
        return ''
    }
  }

  const href = getDestinationHref(destination)
  const buttonText = getButtonText(destination)

  return (
    <div>
      {descriptoinText}{' '}
      <Link href={href} className="text-blue-500 hover:text-blue-700">
        {buttonText}
      </Link>
    </div>
  )
}

export default AuthLink
