import React, { useState } from 'react'
import { useFirebase } from '~/components/Firebase'
import { useRouter } from 'next/router'
import Container from '~/components/Container'
import Header from '~/components/Header'
import PageTitle from '~/components/PageTitle'
import Button from '~/components/Button'
import Form, { Input, Label } from '~/components/Form'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { firebase } = useFirebase()
  const disabled = email.length === 0 || password.length === 0 || loading

  const onSubmit = async (event) => {
    event.preventDefault()
    await setLoading(true)

    try {
      await firebase.signIn(email, password)
    } catch({ message }) {
      alert(message)
      return setLoading(false)
    }

    await router.push('/')
  }

  return (
    <Container>
      <Header />

      <Form onSubmit={onSubmit}>
        <PageTitle>Inloggen</PageTitle>

        <Label htmlFor="email">E-mailadres:</Label>
        <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <Label htmlFor="password">Wachtwoord:</Label>
        <Input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <Button disabled={disabled} onClick={onSubmit}>
          Inloggen
        </Button>
      </Form>
    </Container>
  )
}

export default Login