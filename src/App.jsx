import { RouterProvider } from 'react-router'
import AppLayout from './components/layout/AppLayout/AppLayout'
import { router } from './router'

function App() {
	return (
		<RouterProvider router={router}>
			<AppLayout />
		</RouterProvider>
	)
}

export default App
