import { RouterProvider } from 'react-router-dom'
import { router } from './navigation'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

export default App
