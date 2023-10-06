import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Upload from './Upload'
import View from './View'
import Edit from './Edit'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },{
    path: '/upload',
    element: <Upload/>
  },{
    path: '/:id',
    element: <View />
  },{
    path: '/:id/edit',
    element: <Edit />
  }
])
