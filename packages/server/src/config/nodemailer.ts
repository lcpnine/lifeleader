import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'life.leader@gmail.com',
    pass: process.env.LIFE_LEADER_EMAIL_PASSWORD,
  },
  secure: true,
})

export default transporter
