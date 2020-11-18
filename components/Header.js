import Link from 'next/link'
import React from 'react'
import { useFirebase } from '~/components/Firebase'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Button from '~/components/Button'
import {space} from '~/styles/variables'

const Wrapper = styled.header`
  padding: ${space[32]} 0 ${space[16]};
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`

const Logout = styled(Button)`
  display: inline-block;
  padding: ${space[4]} ${space[8]};
  margin-left: ${space[4]};
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
      <h1><Link href="/"><a>SinterKerst</a></Link></h1>

      {user && (
        <h6>
          Ingelogd als {user.displayName.substring(2)}{' '}
          <Logout onClick={logout}>uitloggen</Logout>
        </h6>
      )}
    </Wrapper>
  )
}

export default Header