import React from 'react'
import styled from '@emotion/styled'

const Card = styled.div`
  color: #1d1d1d;
  text-shadow: none;
  display: grid;
  grid-gap: 0 16px;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas: "title nav" "form form";
  padding: 8px 16px;
  text-decoration: none;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  align-items: center;
  transition: color 0.15s ease, border-color 0.15s ease;
  
  & + & {
    margin-top: 8px;
  }
  
  a&:hover {
    background-color: #eeeeee;
  }
`

export const FullWidthForm = styled.form`
  grid-area: form;
`

export default Card
