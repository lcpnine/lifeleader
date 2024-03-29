import { CLIENT_URL, IS_DEV } from './common'

export const createEmailVerificationTemplate = (
  nickname: string,
  token: string
) => {
  return `
    <div
      style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; background-size: cover; margin: 0; padding: 50px;">
      <table
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; text-align: center; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);"
        cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" style="width: 100%;">
              <tr>
                <td style="padding: 20px 0; text-align: center;">
                  <a href="${CLIENT_URL}" target="_blank" style="display: inline-block;">
                    <div style="color: #1ab394; font-weight: 600; font-size: 32px; margin: 0;">Life Leader</div>
                  </a>
                </td>  
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <div style="color: #000000; font-weight: 500; margin: 0; font-size: 28px; line-height: 1.4; margin: 20px;">Hi, ${nickname}!</div>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4;">Thanks for signing up for Life Leader! We're excited to have you as an early user.</p>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4;">To get started, please verify your email address by clicking the button below.</p>
                  <a href="${CLIENT_URL}/auth/verify-email?token=${token}"
                    style="background-color: #1ab394; border: none; border-radius: 5px; display: inline-block; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; margin-top:
                    30px; margin-bottom: 30px; padding: 15px 30px;">Verify your email</a>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4; margin-bottom: 30px;">If you did not create an account using this email address, please ignore this email or reply to let us know.</p>
                  ${
                    IS_DEV
                      ? '<p style="margin: 0; font-size: 16px; line-height: 1.4; margin-bottom: 30px;">Token: ' +
                        token +
                        '</p>'
                      : ''
                  }
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `
}

export const createResetPasswordTemplate = (
  nickname: string,
  token: string
) => {
  return `
    <div
      style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; background-size: cover; margin: 0; padding: 50px;">
      <table
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; text-align: center; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);"
        cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" style="width: 100%;">
              <tr>
                <td style="padding: 20px 0; text-align: center;">
                  <a href="${CLIENT_URL}" target="_blank" style="display: inline-block;">
                    <div style="color: #1ab394; font-weight: 600; font-size: 32px; margin: 0;">Life Leader</div>
                  </a>
                </td>  
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <div style="color: #000000; font-weight: 500; margin: 0; font-size: 28px; line-height: 1.4; margin: 20px;">Hi, ${nickname}!</div>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4;">You recently requested to
                    reset your password for your Life Leader account. Click the button below to reset it.</p>
                  <a href="${CLIENT_URL}/auth/reset-password?token=${token}"
                    style="background-color: #1ab394; border: none; border-radius: 5px; display: inline-block; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; margin-top: 30px; margin-bottom: 30px; padding: 15px 30px;">Reset
                    your password</a>
                  <p style="margin: 0; font-size: 16px; line-height: 1.4; margin-bottom: 30px;">If you did not request a
                    password reset, please ignore this email or reply to let us know. This password reset is only valid for
                    the next 60 minutes.</p>
                  ${
                    IS_DEV
                      ? '<p style="margin: 0; font-size: 16px; line-height: 1.4; margin-bottom: 30px;">Token: ' +
                        token +
                        '</p>'
                      : ''
                  }
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `
}
