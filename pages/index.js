import React from 'react'
import { useFirebase } from '../components/Firebase'
import Link from 'next/link'
import Header from '../components/Header'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import Form from '../components/Form'

export default function Home() {
  const { user, lists } = useFirebase()

  return (
    <Container>
      <Header />

      {!user && (
        <Form as="div">
          <PageTitle>Maak een account aan of login</PageTitle>
          <Link href="/login" passhref><Button as="a">Inloggen</Button></Link>
          <br />
          <Link href="/signup" passhref><Button as="a">Registreren</Button></Link>
        </Form>
      )}

      {user && (
        <>
          <PageTitle>Lijstjes</PageTitle>

          {Object.keys(lists).map((name) => {
            const userGroup = user.displayName.charAt(0)
            const listGroup = name.charAt(0)
            const listName = name.substring(2).split(' ')[0]

            if (listGroup !== '0' && userGroup > 0 && userGroup !== listGroup) return null

            return (
              <Link key={name} href={`/list/${name}`} passHref>
                <Card as="a">{listName}</Card>
              </Link>
            )
          })}
        </>
      )}
    </Container>
  )
}
