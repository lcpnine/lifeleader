import { COMMON_TRANSLATIONS } from '@/constants/common.i18n'
import { useAlert } from '@/contexts/AlertContext'
import { useUserContext } from '@/contexts/UserContext' // Adjust the import according to your project structure
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DeleteAccountDocument } from '../../../gql/graphql'
import TRANSLATIONS from './auth.i18n'

const DeleteAccount = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)
  const { user, isSignedIn } = useUserContext() // Assuming useUserContext provides user info
  const { openAlert } = useAlert()
  const { goTo } = useGoTo()
  const [email, setEmail] = useState('')
  const [deleteAccount, { loading }] = useMutation(DeleteAccountDocument, {
    onCompleted: () => {
      openAlert({
        text: translation('AccountDeleted'),
        onClose: () => goTo('/', { replace: true }),
      })
    },
    onError: () => {
      openAlert({ text: commonTranslation('ServerError') })
    },
  })

  const handleDeleteAccount = () => {
    if (email !== user.email) {
      openAlert({ text: translation('TypeYourEmailCorrectly') })
      return
    }

    deleteAccount({ variables: { email } })
  }

  useEffect(() => {
    if (!isSignedIn) {
      goTo('/', { replace: true })
    }
  }, [])

  return (
    <>
      <Head>
        <title>{translation('DeleteAccount')}</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold mb-4">
          {translation('DeleteAccount')}
        </h1>
        <p className="mb-4">{translation('DeleteAccountWarning')}</p>
        <input
          type="email"
          placeholder={user.email}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full max-w-xs mb-4"
        />
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? translation('Deleting') : translation('DeleteAccount')}
        </button>
      </div>
    </>
  )
}

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccount($email: String!) {
    deleteAccount(email: $email) {
      ... on DeleteAccountSuccess {
        success
      }
      ... on DeleteAccountFailure {
        errorType
      }
    }
  }
`

export default DeleteAccount
