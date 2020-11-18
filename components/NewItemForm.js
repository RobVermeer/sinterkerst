import React from 'react'
import { useFormik } from 'formik'
import Form, { Input } from '~/components/Form'
import Button from '~/components/Button'
import { useFirebase } from '~/components/Firebase'
import * as Yup from 'yup'

const NewItemForm = ({ name }) => {
  const { firebase } = useFirebase()
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Vul een geldige titel in'),
    url: Yup.string().url('Vul een geldige link in'),
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await firebase.addToList(name, values.title, values.url)
      resetForm()
    },
  })
  const { handleSubmit, isValid } = formik

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="title" type="text" label="Voeg nieuwe wens toe:" {...formik} />
      <Input name="url" type="url" label="Voeg link toe:" {...formik} />
      <Button type="submit" disabled={!isValid}>Toevoegen</Button>
    </Form>
  )
}

export default NewItemForm
