import Link from 'next/link'
import React from 'react'
import { useFirebase } from './Firebase'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Button from './Button'

const Wrapper = styled.header`
  padding: 32px 0 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
`

const UserInfo = styled.h6`
  margin: 0;
`

const Logout = styled(Button)`
  display: inline-block;
  padding: 4px 8px;
  margin-left: 4px;
  width: auto
`

const Header = () => {
  const { user, firebase } = useFirebase()
  const router = useRouter()

  const logout = async() => {
    await firebase.signOut()
    await router.push('/')
  }

  return (
    <Wrapper>
      <Title><Link href="/"><a>SinterKerst</a></Link></Title>

      {user && (
        <UserInfo>
          Ingelogd als {user.displayName.substring(2)}{' '}
          <Logout onClick={logout}>uitloggen</Logout>
        </UserInfo>
      )}
    </Wrapper>
  )
}

export default Header