import React from 'react'
import styled from '@emotion/styled'
import { space } from '~/styles/variables'

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-bottom: ${space[64]}; 
`

const Main = styled.main`
  width: 100%;
  padding: 0 ${space[16]};
  max-width: 512px;
`

const Container = ({ children }) => (
  <Wrapper>
    <Main>
      {children}
    </Main>
  </Wrapper>
)

export default Container