import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-bottom: 64px; 
`

const Main = styled.main`
  width: 100%;
  padding: 0 16px;
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