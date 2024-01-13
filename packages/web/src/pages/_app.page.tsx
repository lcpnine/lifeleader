import { EntryProvider } from '@/contexts/EntryContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { UserInfoProvider } from '@/contexts/UserInfoContext'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import Favicon from 'public/favicon.ico'
import { setupAxios } from '../../utils/axios'
import './globals.css'
import Layout from './layout'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID

const WebApp = ({ Component, pageProps }: AppProps) => {
  setupAxios()

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
      <EntryProvider serverProps={pageProps}>
        <UserInfoProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </UserInfoProvider>
      </EntryProvider>
    </>
  )
}

WebApp.getInitialProps = async (context: AppContext) => {
  const props = await App.getInitialProps(context)

  const acceptLanguage = context.ctx.req?.headers['accept-language']
  const userAgent = context.ctx.req?.headers['user-agent']
  const referrer = context.ctx.req?.headers['referrer']

  return {
    ...props,
    pageProps: {
      acceptLanguage,
      userAgent,
      referrer,
    },
  }
}

export default WebApp
