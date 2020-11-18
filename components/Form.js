import React from 'react'
import styled from '@emotion/styled'
import {
  borderColor,
  borderFocusColor,
  borderRadius,
  panelColor,
  panelTextColor,
  space,
  shadowColor,
  transition,
} from '~/styles/variables'

export const Label = styled.label`
  display: block;
  margin-bottom: ${space[8]};
`

export const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: ${space[16]};
  padding: ${space[8]};
  border: 1px solid ${borderColor};
  border-radius: ${space[8]};
  transition: all ${transition};
  
  :focus {
    border-color: ${borderFocusColor};
    outline: none;
  }
`

const Form = styled.form`
  margin-top: ${space[16]};
  border-radius: ${borderRadius};
  background: ${panelColor};
  padding: ${space[16]};
  color: ${panelTextColor};
  text-shadow: none;
  box-shadow: 2px 2px 8px ${shadowColor};
`

export default Form