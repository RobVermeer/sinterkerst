import React from 'react'
import styled from '@emotion/styled'

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 16px;
  padding: 8px 8px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: border-color 0.15s ease;
  
  :focus {
    border-color: #ff7f2c;
    outline: none;
  }
`

const Form = styled.form`
  margin-top: 16px;
  border-radius: 8px;
  background: #fbfbf9;
  padding: 16px;
  color: #1d1d1d;
  text-shadow: none;
  box-shadow: 2px 2px 8px #1d1d1d57;
`

export default Form