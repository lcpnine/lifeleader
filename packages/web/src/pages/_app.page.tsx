import { BASE_URL, IS_DEV } from '@/constants/common'
import { AlertProvider } from '@/contexts/AlertContext'
import { EntryProvider } from '@/contexts/EntryContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import axios from 'axios'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import Favicon from 'public/favicon.ico'
import { User } from '../../gql/graphql'
import { setupAxios } from '../../utils/axios'
import './globals.css'
import Layout from './layout'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID

const WebApp = ({ Component, pageProps }: AppProps) => {
  setupAxios()

  const client = new ApolloClient({
    uri: BASE_URL + '/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
  })

  if (IS_DEV) {
    loadDevMessages()
    loadErrorMessages()
  }

  return (
    <>
      <Head>
        <link rel="icon" href={Favicon.src} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.90, maximum-scale=1"
        />
      </Head>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <ApolloProvider client={client}>
        <EntryProvider serverProps={pageProps}>
          <UserProvider initialUser={pageProps.user}>
            <AlertProvider>
              <ThemeProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </AlertProvider>
          </UserProvider>
        </EntryProvider>
      </ApolloProvider>
    </>
  )
}

WebApp.getInitialProps = async (context: AppContext) => {
  const props = await App.getInitialProps(context)

  // @ts-ignore
  const cookies = (context.ctx.req?.cookies || {}) as Record<string, any>
  const token = cookies['token']

  const res = await axios.post(
    BASE_URL + '/graphql',
    {
      query: CHECK_USER_QUERY,
      variables: { token },
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    }
  )
  const user: User | null = res.data?.data?.checkUser
    ? { isSignedIn: true, ...res.data.data.checkUser }
    : null

  const acceptLanguage = context.ctx.req?.headers['accept-language']
  const userAgent = context.ctx.req?.headers['user-agent']
  const referrer = context.ctx.req?.headers['referrer']

  return {
    ...props,
    pageProps: {
      acceptLanguage,
      userAgent,
      referrer,
      user,
    },
  }
}

const CHECK_USER_QUERY = `
query checkUser {
    checkUser {
      _id
      nickname
      email
      createdAt
      emailVerification {
        isVerified
        token
        expiresAt
      }
      resetPassword {
        token
        expiresAt
        isVerified
      }
      purchasedInfo {
        isPurchased
        purchasedAt
        expiresAt
      }
    }
  }
`

export default WebApp
