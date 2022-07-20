import React from 'react'

const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
    <title>{'\n\t\terror\n\t'}</title>
    <path
      fill="currentColor"
      d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"
    />
  </svg>
)

export default SvgComponent
