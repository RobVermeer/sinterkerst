import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Firebase, { FirebaseContext } from '../components/Firebase'
import Head from 'next/head'
import { Global, css } from '@emotion/react'

const globalStyles = css`
  @font-face {
    font-family: sint;
    src: url('/stnicholas.ttf');
  }
  
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  
  body {
    color: white;
    text-shadow: 1px 1px 1px #00000073;
    background: url('/sint.jpg');
    background-size: cover;
    background-position: bottom;
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }
  
  h1, h2 {
    font-family: sint, serif;
  }
`

const firebase = new Firebase()

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])
  const data = useMemo(() => ({ user, lists, firebase }), [user, lists, firebase])
  const memoizedAuthChange = useCallback(
    () => firebase.onAuthChange(setUser),
    [firebase],
  )
  const memoizedListChange = useCallback(
    () => firebase.onListsChange(setLists),
    [firebase],
  )

  useEffect(() => {
    memoizedAuthChange()
    memoizedListChange()
  }, [memoizedAuthChange, memoizedListChange])


  return (
    <FirebaseContext.Provider value={data}>
      <Head>
        <title>SinterKerst</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Global styles={globalStyles} />

      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
