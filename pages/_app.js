import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Firebase, { FirebaseContext } from '~/components/Firebase'
import Head from 'next/head'
import { Global } from '@emotion/react'
import globalStyles from '~/styles/global'

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
