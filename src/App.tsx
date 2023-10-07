// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';

import {
  MantineProvider
} from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { getRandomImageUrl } from './foto'
import { routes } from './routes'
import { Notifications } from '@mantine/notifications';

const array=[getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl(),getRandomImageUrl()]

// Import the functions you need from the SDKs you need

export default function App() {
  return (
    <MantineProvider theme={{
    headings: {
      fontFamily: 'Itim, cursive',
    }
    }}>
      <Notifications />
      <RouterProvider router={routes}/>
    </MantineProvider>
  )
}
