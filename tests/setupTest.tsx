import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import {routes} from '../src/routes'

afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <MantineProvider>
        <RouterProvider router= {routes}>{children}</RouterProvider>
      </MantineProvider>
    ),
    ...options
  })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
