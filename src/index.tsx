import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import LogoUploader from './components/LogoUploader'

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    <LogoUploader />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
