import React from 'react'
import { useFormik } from 'formik'
import { Input } from '~/components/Form'
import Button from '~/components/Button'
import { useFirebase } from '~/components/Firebase'
import { FullWidthForm } from '~/components/Card'
import styled from '@emotion/styled'
import { borderColor, space } from '~/styles/variables'
import * as Yup from 'yup'

const Options = styled.div`
  display: grid;
  grid-gap: ${space[4]};
  grid-template-columns: auto auto;
`

const Divider = styled.hr`
  margin: ${space[8]} 0;
  border: 1px solid ${borderColor};
`

const EditItemForm = ({ name, id, title, url, bought, cancelEdit }) => {
  const { firebase } = useFirebase()
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Vul een geldige titel in'),
    url: Yup.string().url('Vul een geldige link in'),
  })
  const formik = useFormik({
    initialValues: {
      title,
      url,
    },
    validationSchema,
    onSubmit: async (values) => {
      await firebase.editListItem(name, id, values.title, values.url, bought)
      cancelEdit()
    },
  })
  const { handleSubmit, isValid } = formik

  return (
    <FullWidthForm onSubmit={handleSubmit}>
      <Divider />
      <Input name="title" type="text" label="Wens:" {...formik} />
      <Input name="url" type="url" label="Link:" {...formik} />
      <Options>
        <Button type="submit" disabled={!isValid}>Wijzigen</Button>
        <Button onClick={cancelEdit}>Annuleren</Button>
      </Options>
    </FullWidthForm>
  )
}

export default EditItemForm
