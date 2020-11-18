import React from 'react'
import styled from '@emotion/styled'
import {
  borderColor,
  borderRadius,
  panelColor,
  panelHoverColor,
  panelTextColor,
  space,
  transition,
} from '~/styles/variables'

const Card = styled.div`
  color: ${panelTextColor};
  text-shadow: none;
  display: grid;
  grid-gap: 0 ${space[16]};
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas: "title nav" "form form";
  padding: ${space[8]} ${space[16]};
  text-decoration: none;
  background-color: ${panelColor};
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius};
  align-items: center;
  transition: all ${transition};
  
  & + & {
    margin-top: ${space[8]};
  }
  
  a&:hover {
    background-color: ${panelHoverColor};
  }
`

export const FullWidthForm = styled.form`
  grid-area: form;
`

export default Card
