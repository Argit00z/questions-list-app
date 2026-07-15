import { createBrowserRouter } from 'react-router'
import AppLayout from './components/layout/AppLayout/AppLayout'
import { ROUTES } from './constants/routes'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage'
import QuestionListPage from './pages/QuestionListPage/QuestionListPage'

export const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: <AppLayout />,
		children: [
			{
				path: ROUTES.QUESTIONS.BASE,
				element: <QuestionListPage />
			},
			{
				path: ROUTES.QUESTIONS.DETAILS,
				element: <QuestionDetailPage />
			},
			{
				path: '*',
				element: <NotFoundPage />
			}
		]
	}
])
