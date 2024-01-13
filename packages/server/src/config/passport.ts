import bcrypt from 'bcryptjs'
import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User, { IUser } from '../models/User.model'

const initializePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = (await User.findOne({ email })) as IUser
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered',
            })
          }

          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            return done(null, false, { message: 'Password incorrect' })
          }

          return done(null, user)
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, (user as IUser).id)
  })

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = (await User.findById(id)) as IUser
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}

export default initializePassport
