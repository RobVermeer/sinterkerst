import React from 'react'
import { useFormik } from 'formik'
import Form, { Input } from '~/components/Form'
import Button from '~/components/Button'
import { useFirebase } from '~/components/Firebase'
import * as Yup from 'yup'
import PageTitle from '~/components/PageTitle'
import { useRouter } from 'next/router'

const SignupForm = () => {
  const router = useRouter()
  const { firebase } = useFirebase()
  const validationSchema = Yup.object().shape({
    family: Yup.number().required(),
    name: Yup.string().required('Vul een geldige naam in'),
    email: Yup.string().email('Vul een geldige email in').required(),
    password: Yup.string().min(6, 'Wachtwoord heeft minimaal 6 tekens nodig').required('Vul je wachtwoord in'),
  })
  const formik = useFormik({
    initialValues: {
      family: '',
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { user } = await firebase.register(values.email, values.password)
        const displayName = `${values.family}-${values.name}`.trim()

        await user.updateProfile({ displayName })
        await firebase.createEmptyList(displayName)
        await router.push('/')
      } catch({ message }) {
        alert(message)
      }
    },
  })
  const { handleSubmit, isValid, isSubmitting } = formik

  return (
    <Form onSubmit={handleSubmit}>
      <PageTitle>Registreren</PageTitle>
      <Input label="Familie:" as="select" name="family" {...formik}>
        <option value="">Kies de familie</option>
        <option value="2">Van Sprang</option>
        <option value="1">Vermeer</option>
        <option value="0">Beide families</option>
      </Input>
      <Input name="name" type="text" label="Roepnaam:" {...formik} />
      <Input name="email" type="email" label="E-mailadres:" {...formik} />
      <Input name="password" type="password" label="Wachtwoord:" {...formik} />
      <Button type="submit" disabled={!isValid || isSubmitting}>Registreren</Button>
    </Form>
  )
}

export default SignupForm
