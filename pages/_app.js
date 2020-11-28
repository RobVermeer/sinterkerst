import App from 'next/app'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Firebase, { FirebaseContext } from '~/components/Firebase'
import Head from 'next/head'
import { Global } from '@emotion/react'
import globalStyles from '~/styles/global'
import nookies from 'nookies'
import absoluteUrl from 'next-absolute-url'

const firebase = new Firebase()

const MyApp = ({ Component, pageProps, ...initialProps }) => {
  const { user: initialUser = null, lists: initialLists = [] } = initialProps
  const [user, setUser] = useState(initialUser)
  const [lists, setLists] = useState(initialLists)
  const data = useMemo(() => ({ user, lists, firebase }), [user, lists, firebase])
  const memoizedAuthChange = useCallback(
    () => firebase.onIdTokenChanged(async (u) => {
      setUser(u)

      if (!u) {
        nookies.destroy(undefined, 'token')
      } else {
        const token = await u.getIdToken()
        nookies.set(undefined, 'token', token, {
          maxAge: 7 * 24 * 60 * 60,
        })
      }
    }),
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

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const { ctx } = appContext
  const { req } = ctx
  const { origin } = absoluteUrl(req)
  const { token } = nookies.get(ctx)
  let user = null
  let lists = []

  if (req) {
    const result = await fetch(`${origin}/api/validateToken`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const { user: u = null } = await result.json()
    user = u
    firebase.onListsChange((l) => (lists = l))
  }

  return { ...appProps, user, lists }
}

export default MyApp
