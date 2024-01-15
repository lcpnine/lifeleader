import { CLIENT_URL } from './common'

export const createResetPasswordTemplate = (
  nickname: string,
  token: string
) => {
  return `
    <div style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px
    ; margin: 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding: 20px 0 30px 0; text-align: center;">
                  <a href="
                  ${CLIENT_URL}
                  " target="_blank">
                    <img src="https://i.imgur.com/8jZ4miq.png" alt="Life Leader" width="200" height="200" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
                  </a>
                </td>
              </tr>
              <tr>
                <td style="background-color: #ffffff; border-radius: 5px; text-align: center;">
                  <h1 style="color: #000000; font-weight: 400; margin: 0; font-size: 28px; line-height: 1.4; margin-bottom: 30px;">Hi ${nickname}!</h1>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4; margin-bottom: 30px;">You recently requested to reset your password for your Life Leader account. Click the button below to reset it.</p>
                  <a href="
                  ${CLIENT_URL}/reset-password?token=${token}
                  " style="background-color: #1ab394; border-top: 10px solid #1ab394; border-right: 18px solid #1ab394; border-bottom: 10px solid #1ab394; border-left: 18px solid #1ab394; border-radius: 5px; display: inline-block; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; margin-top: 30px; margin-bottom: 30px; padding: 15px 30px;">Reset your password</a>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4; margin-bottom: 30px;">If you did not request a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next 60 minutes.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `
}
