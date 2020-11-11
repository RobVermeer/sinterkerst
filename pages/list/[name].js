import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useFirebase } from '../../components/Firebase'
import Container from '../../components/Container'
import Header from '../../components/Header'
import Icon from '../../components/Icon'
import PageTitle from '../../components/PageTitle'
import Card, { FullWidthForm } from '../../components/Card'
import Button from '../../components/Button'
import Form, { Input, Label } from '../../components/Form'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Options = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: auto auto;
`

const Divider = styled.hr`
  margin: 8px 0;
  border: 1px solid #eaeaea;
`

const LinkIcon = styled(Icon)`
  fill: #000;
  margin-right: 4px;
`

const SmallButton = styled(Button)`
  display: inline-block;
  padding: 4px 8px 3px;
  width: auto
`

const CardTitle = styled.div`
  ${(props) => props.done && css`
    color: #858585;
    text-decoration: line-through;
  `}
`

const Name = () => {
  const router = useRouter()
  const { name } = router.query
  const { user, lists, firebase } = useFirebase()
  const [newItem, setNewItem] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [edit, setEdit] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')
  const [editBought, setEditBought] = useState(false)
  const list = lists[name]
  const listUserName = name && name.substring(2)
  const currentUserName = user && user.displayName.substring(2)
  const isOwnList = currentUserName === listUserName

  const changeStatus = async (item, key) => {
    if (item.bought) {
      const really = confirm(`${currentUserName}, weet je zeker dat je dit cadeau weer terug op het lijstje wilt zetten?`)

      if (!really) return
    }

    await firebase.changeListItemStatus(name, key, item)
  }

  const addItem = async (event) => {
    event.preventDefault()
    await firebase.addToList(name, newItem, newUrl)
    setNewItem('')
    setNewUrl('')
  }

  const remove = async (index) => {
    const really = confirm(`${currentUserName}, weet je zeker dat je dit cadeau van je lijstje wilt verwijderen?`)

    if (!really) return

    await firebase.removeFromList(name, index)
  }

  const openEdit = (key, { title, url, bought }) => {
    if (edit) return setEdit('')

    setEdit(key)
    setEditTitle(title)
    setEditUrl(url)
    setEditBought(bought)
  }

  const editItem = async (event) => {
    event.preventDefault()
    await firebase.editListItem(name, edit, editTitle, editUrl, editBought)
    setEdit('')
  }

  if (!list) return null

  return (
    <Container>
      <Header />

      <PageTitle>Lijstje van {listUserName}</PageTitle>

      {Object.keys(list).map((key) => {
        const { title, url, bought } = list[key]

        if (!Boolean(title)) return null

        return (
          <Card key={key}>
            <CardTitle done={bought && !isOwnList}>
              {Boolean(url) ? (
                <a href={url} target="_blank" rel="noopener noreferrer"><LinkIcon type="link" />{title}</a>
              ) : (
                <>{title}</>
              )}
            </CardTitle>

            {!isOwnList && (
              <input type="checkbox" checked={bought} onChange={() => changeStatus(list[key], key)} />
            )}

            {isOwnList && (
              <Options>
                <SmallButton onClick={() => openEdit(key, list[key])}>
                  <Icon type="edit" />
                </SmallButton>
                <SmallButton onClick={() => remove(key)}>
                  <Icon type="trash" />
                </SmallButton>
              </Options>
            )}

            {edit === key && (
              <FullWidthForm onSubmit={editItem}>
                <Divider />
                <Label>Wens:</Label>
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <Label>Link:</Label>
                <Input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                <Options>
                  <Button onClick={editItem} disabled={!editTitle}>Wijzigen</Button>
                  <Button onClick={() => setEdit('')} disabled={!editTitle}>Annuleren</Button>
                </Options>
              </FullWidthForm>
            )}
          </Card>
        )
      })}

      {Object.keys(list).length === 1 && (
        <Card as="p">{listUserName} heeft nog niks op het lijstje gezet!</Card>
      )}

      {isOwnList && (
        <Form onSubmit={addItem}>
          <Label>Voeg nieuwe wens toe:</Label>
          <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          <Label>Voeg link toe:</Label>
          <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
          <Button onClick={addItem} disabled={!newItem}>Toevoegen</Button>
        </Form>
      )}
    </Container>
  )
}

export default Name