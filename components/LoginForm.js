import React from 'react'
import { useFormik } from 'formik'
import Form, { Input } from '~/components/Form'
import Button from '~/components/Button'
import { useFirebase } from '~/components/Firebase'
import * as Yup from 'yup'
import PageTitle from '~/components/PageTitle'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const router = useRouter()
  const { firebase } = useFirebase()
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Vul een geldige email in').required(),
    password: Yup.string().required('Vul je wachtwoord in'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await firebase.signIn(values.email, values.password)
        await router.push('/')
      } catch({ message }) {
        alert(message)
      }
    },
  })
  const { handleSubmit, isValid, isSubmitting } = formik

  return (
    <Form onSubmit={handleSubmit}>
      <PageTitle>Inloggen</PageTitle>
      <Input name="email" type="email" label="E-mailadres:" {...formik} />
      <Input name="password" type="password" label="Wachtwoord:" {...formik} />
      <Button type="submit" disabled={!isValid || isSubmitting}>Inloggen</Button>
    </Form>
  )
}

export default LoginForm
