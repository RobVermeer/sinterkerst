import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirebase } from '~/components/Firebase'
import Container from '~/components/Container'
import Header from '~/components/Header'
import Icon from '~/components/Icon'
import PageTitle from '~/components/PageTitle'
import Card from '~/components/Card'
import Button from '~/components/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  buttonDisabledColor,
  panelTextColor,
  space
} from '~/styles/variables'
import NewItemForm from '~/components/NewItemForm'
import EditItemForm from '~/components/EditItemForm'
import Cookies from 'js-cookie'

const Options = styled.div`
  display: grid;
  grid-gap: ${space[4]};
  grid-template-columns: auto auto;
`

const LinkIcon = styled(Icon)`
  fill: ${panelTextColor};
  margin-right: ${space[4]};
`

const SmallButton = styled(Button)`
  display: inline-block;
  padding: ${space[4]} ${space[8]} 3px;
  width: auto
`

const CardTitle = styled.div`
  ${(props) => props.done && css`
    color: ${buttonDisabledColor};
    text-decoration: line-through;
  `}
`

const Name = () => {
  const router = useRouter()
  const { name } = router.query
  const { user, lists, firebase } = useFirebase()
  const [edit, setEdit] = useState('')
  const [reminderSent, setReminderSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const list = lists[name]
  const listUserName = name && name.substring(2)
  const currentUserName = user && user.displayName.substring(2)
  const isOwnList = currentUserName === listUserName

  useEffect(() => {
    setReminderSent(Cookies.get(`reminder-${name}`) === '1')
  }, [name])

  const changeStatus = async (item, key) => {
    if (item.bought) {
      const really = confirm(`${currentUserName}, weet je zeker dat je dit cadeau weer terug op het lijstje wilt zetten?`)

      if (!really) return
    }

    await firebase.changeListItemStatus(name, key, item)
  }

  const remove = async (event, index) => {
    event.preventDefault()

    const really = confirm(`${currentUserName}, weet je zeker dat je dit cadeau van je lijstje wilt verwijderen?`)

    if (!really) return

    await firebase.removeFromList(name, index)
  }

  const openEdit = (event, key) => {
    event.preventDefault()

    if (edit) return setEdit('')

    setEdit(key)
  }

  const sendReminder = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await fetch('/api/sendReminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
        })
      });
      Cookies.set(`reminder-${name}`, 1, { expires: 1 })
      setReminderSent(true)
    } catch { }
  }

  if (!list) return null

  return (
    <Container>
      <Header />

      <PageTitle>Lijstje van {listUserName}</PageTitle>

      {Object.keys(list).map((key) => {
        const { title, url, bought } = list[key]

        if (!Boolean(title)) return null

        const cardProps = { key }

        if (!edit && url) {
          cardProps['as'] = 'a'
          cardProps['href'] = url
          cardProps['target'] = '_blank'
          cardProps['rel'] = 'noopener noreferrer'
        }

        return (
          <Card {...cardProps}>
            <CardTitle done={bought && !isOwnList}>
              {Boolean(url) && <LinkIcon type="link" />}
              {title}
            </CardTitle>

            {!isOwnList && (
              <input type="checkbox" checked={bought} onChange={() => changeStatus(list[key], key)} />
            )}

            {isOwnList && (
              <Options>
                <SmallButton onClick={(event) => openEdit(event, key, list[key])}>
                  <Icon type="edit" />
                </SmallButton>
                <SmallButton onClick={(event) => remove(event, key)}>
                  <Icon type="trash" />
                </SmallButton>
              </Options>
            )}

            {edit === key && (
              <EditItemForm name={name} id={edit} title={title} url={url} bought={bought} cancelEdit={() => setEdit('')} />
            )}
          </Card>
        )
      })}

      {Object.keys(list).length === 1 && (
        <Card as="p">
          {listUserName} heeft nog niks op het lijstje gezet!{' '}
          {!reminderSent && <Button onClick={sendReminder} disabled={loading}>Stuur een herinnering</Button>}
        </Card>
      )}

      {isOwnList && <NewItemForm name={name} />}
    </Container>
  )
}

export default Name