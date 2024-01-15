import { COMMON_TRANSLATIONS } from '@/constants/i18n'
import { useAlert } from '@/contexts/AlertContext'
import useGoTo from '@/hooks/useGoTo'
import useI18n from '@/hooks/useI18n'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { token } = router.query
  const { goTo } = useGoTo()
  const { openAlert } = useAlert()
  const { getTranslation } = useI18n()
  const commonTranslation = getTranslation(COMMON_TRANSLATIONS)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      await axios.post('/auth/reset-password', { token, password })
      goTo('/auth/sign-in', { replace: true })
    } catch (error) {
      openAlert(commonTranslation('serverError'))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword
