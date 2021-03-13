import * as React from 'react'
import { mount } from '@cypress/react'
import {App} from '../../src/App'

describe('App', () => {
  it('should mount', function () {
    mount(
      <App/>
    )
  })
})
