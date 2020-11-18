import { css } from '@emotion/react'
import { bodyTextColor, shadowColor } from '~/styles/variables'

const globalStyles = css`
  @font-face {
    font-family: sint;
    src: url('/stnicholas.ttf');
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  

  
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  
  body {
    color: ${bodyTextColor};
    text-shadow: 1px 1px 1px ${shadowColor};
    background: url('/sint.jpg');
    background-size: cover;
    background-position: bottom;
    min-height: 100vh;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: sint, serif;
  }
`

export default globalStyles