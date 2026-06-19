import { useEffect, useState } from 'react'
import { getQuestions } from '../../../api'
import AppContent from '../AppContent/AppContent'
import AppFooter from '../AppFooter/AppFooter'
import AppHeader from '../AppHeader/AppHeader'
import styles from '../AppLayout/AppLayout.module.css'
import AppSidebar from '../AppSidebar/AppSidebar'

function AppLayout() {
	const [questions, setQuestions] = useState([])
	const [filters, setFilters] = useState({
		search: '',
		specializationId: null,
		skillIds: [],
		complexity: [],
		rating: [],
		status: 'Все'
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				setIsLoading(true)
				const response = await getQuestions({ page: 1 })
				setQuestions(response)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchQuestions()
	}, [])

	console.log(questions.data)

	const handleFilterChange = (name, value) => {
		setFilters(prevFilters => {
			if (name === 'specializationId') {
				return {
					...prevFilters,
					specializationId:
						prevFilters.specializationId === value ? null : value
				}
			}
			return {
				...prevFilters,
				[name]: value
			}
		})
		console.log(filters)
	}

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	const filteredQuestions =
		questions.data.filter(question => {
			const matchesSearch = question.title
				.toLowerCase()
				.includes(filters.search.toLowerCase())

			const matchesSpecialization =
				filters.specializationId === null ||
				question.specializationId === filters.specializationId

			return matchesSearch && matchesSpecialization
		}) || []

	return (
		<>
			<AppHeader />
			<div className={styles.container}>
				<AppContent questions={filteredQuestions} />
				<AppSidebar
					filters={filters}
					onFilterChange={handleFilterChange}
				/>
			</div>
			<AppFooter />
		</>
	)
}

export default AppLayout
