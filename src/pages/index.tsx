import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import MainControl from '~/components/MainControl'
import globalStyle from '~/styles/global.style'
import { theme } from '~/styles/libs/mui.style'

// セッティング用定数
const URL = 'https://www.nict.go.jp/JST/JST5.html' // 比較対象のURL

const Home: NextPage = () => {
  const Title = styled.h1`
    text-align: center;
  `

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='format-detection' content='telephone=no, email=no, address=no' />
        <meta name='description' content='サイトの差分比較アプリ dfsite' />
        <meta name='ui-version' content={process.env.APP_VERSION} />
        <title>サイトの差分比較アプリ dfsite</title>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <main>
          <Title>サイトの差分比較アプリ</Title>
          <MainControl />
        </main>
      </ThemeProvider>
    </>
  )
}

export default Home
