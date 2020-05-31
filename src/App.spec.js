import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import App from './App'

it('Should render correct router', () => {
  const history = createMemoryHistory()
  const { debug } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  debug()
})