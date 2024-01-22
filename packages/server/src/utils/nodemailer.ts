import nodemailer from 'nodemailer'

const emailTransporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: 'life.leader.me@gmail.com',
    pass: process.env.LIFE_LEADER_EMAIL_PASSWORD,
  },
})

export const sendEmail = async (
  destinationEmail: string,
  subject: string,
  html: string
) => {
  return await emailTransporter.sendMail({
    from: 'life.leader.me@gmail.com',
    to: destinationEmail,
    subject,
    html,
  })
}
