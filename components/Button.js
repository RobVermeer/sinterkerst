import React from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  display: block;
  width: 100%;
  background-color: #ff7f2c;
  color: #fff;
  padding: 8px 16px;
  border: 1px solid #ff7f2c;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background 0.15s ease, border-color 0.15s ease;
  
  :focus,
  :active,
  :hover {
    outline: none;
    background-color: #ffa739;
    border-color: #ff7f2c;
  }
  
  :disabled {
    background-color: #969696;
    border-color: #969696;
    cursor: not-allowed;
  }
`

export default Button