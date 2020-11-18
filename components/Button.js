import React from 'react'
import styled from '@emotion/styled'
import {
  bodyTextColor,
  buttonColor,
  buttonDisabledColor,
  buttonHoverColor,
  space,
  transition,
} from '~/styles/variables'

const Button = styled.button`
  display: block;
  width: 100%;
  background-color: ${buttonColor};
  color: ${bodyTextColor};
  padding: ${space[8]} ${space[16]};
  border: 1px solid ${buttonColor};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all ${transition};
  
  :focus,
  :active,
  :hover {
    outline: none;
    background-color: ${buttonHoverColor};
    border-color: ${buttonColor};
  }
  
  :disabled {
    background-color: ${buttonDisabledColor};
    border-color: ${buttonDisabledColor};
    cursor: not-allowed;
  }
`

export default Button