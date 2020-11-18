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
  errorBackgroundColor,
  bodyTextColor,
} from '~/styles/variables'

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: ${space[8]};
`

const StyledInput = styled.input`
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

const Error = styled.div`
  background-color: ${errorBackgroundColor};
  border-radius: ${borderRadius};
  padding: ${space[8]};
  color: ${bodyTextColor};
  margin-top: -${space[8]};
  margin-bottom: ${space[16]};
`

export const Input = ({ children, as, label, name, type, handleChange, handleBlur, values, touched, errors }) => {
  const value = values[name]
  const dirty = touched[name]
  const error = errors[name]

  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput as={as} id={name} name={name} type={type} value={value} onChange={handleChange} onBlur={handleBlur} children={children} />

      {Boolean(dirty && error) && (
        <Error className="error">{error}</Error>
      )}
    </>
  )
}

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