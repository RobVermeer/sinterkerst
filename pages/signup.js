import React, { useState } from 'react'
import { useFirebase } from '~/components/Firebase'
import { useRouter } from 'next/router'
import Container from '~/components/Container'
import Header from '~/components/Header'
import PageTitle from '~/components/PageTitle'
import Button from '~/components/Button'
import Form, { Input, Label } from '~/components/Form'

const Signup = () => {
  const [family, setFamily] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { firebase } = useFirebase()
  const disabled = !family || name.length === 0 || email.length === 0 || password.length === 0 || loading

  const onSubmit = async (event) => {
    event.preventDefault()
    await setLoading(true)
    let user = null

    try {
      const data = await firebase.register(email, password)
      user = data.user
    } catch({ message }) {
      alert(message)
      return setLoading(false)
    }

    const displayName = `${family}-${name}`.trim()

    await user.updateProfile({ displayName })

    await firebase.createEmptyList(displayName)

    await router.push('/')
  }

  return (
    <Container>
      <Header />

      <Form onSubmit={onSubmit}>
        <PageTitle>Registreren</PageTitle>

        <Label htmlFor="family">Familie:</Label>
        <Input as="select" id="family" name="family" value={family} onChange={(e) => setFamily(e.target.value)}>
          <option value="">Kies de familie</option>
          <option value="2">Van Sprang</option>
          <option value="1">Vermeer</option>
          <option value="0">Beide families</option>
        </Input>

        <Label htmlFor="name">Roepnaam:</Label>
        <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>

        <Label htmlFor="email">E-mailadres:</Label>
        <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <Label htmlFor="password">Wachtwoord:</Label>
        <Input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <Button disabled={disabled} onClick={onSubmit}>
          Registreren
        </Button>
      </Form>
    </Container>
  )
}

export default Signup