import { useCallback, useEffect, useMemo, useState } from 'react'
import { getQuestions, getSkills, getSpecializations } from '../../../api'

import QuestionList from '../../QuestionList/QuestionList'
import styles from '../AppMain/AppMain.module.css'
import AppSidebar from '../AppSidebar/AppSidebar'

function AppMain() {
	const [allQuestions, setAllQuestions] = useState([])
	const [specializations, setSpecializations] = useState([])
	const [skills, setSkills] = useState([])

	const [isQuestionsLoading, setIsQuestionsLoading] = useState(true)
	const [isSidebarLoading, setIsSidebarLoading] = useState(true)

	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10

	const [filters, setFilters] = useState({
		search: '',
		specializationId: 11,
		skillIds: [],
		complexity: [],
		rating: [],
		status: 'Все'
	})

	useEffect(() => {
		const fetchAllQuestions = async () => {
			try {
				setIsQuestionsLoading(true)
				const response = await getQuestions({ limit: 1000 })
				setAllQuestions(response.data || [])
			} catch (error) {
				console.error('Ошибка при загрузке вопросов:', error)
			} finally {
				setIsQuestionsLoading(false)
			}
		}
		fetchAllQuestions()
	}, [])

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				setIsSidebarLoading(true)
				const [specResponse, skillsResponse] = await Promise.all([
					getSpecializations(),
					getSkills()
				])
				setSpecializations(specResponse.data || [])
				setSkills(skillsResponse.data || [])
			} catch (error) {
				console.error('Ошибка при загрузке данных сайдбара:', error)
			} finally {
				setIsSidebarLoading(false)
			}
		}
		fetchInitialData()
	}, [])

	const filteredQuestions = useMemo(() => {
		return allQuestions.filter(question => {
			if (filters.search) {
				const searchLower = filters.search.toLowerCase()
				const matchesTitle = question.title?.toLowerCase().includes(searchLower)
				const matchesDesc = question.description
					?.toLowerCase()
					.includes(searchLower)
				if (!matchesTitle && !matchesDesc) return false
			}

			if (filters.specializationId) {
				const hasSpec = question.questionSpecializations?.some(
					spec => spec.id === filters.specializationId
				)
				if (!hasSpec) return false
			}

			if (filters.skillIds.length > 0) {
				const hasSkill = question.questionSkills?.some(skill =>
					filters.skillIds.includes(skill.id)
				)
				if (!hasSkill) return false
			}

			if (filters.complexity.length > 0) {
				const matchesComplexity = filters.complexity.some(range => {
					const [min, max] = range.split('-').map(Number)
					return question.complexity >= min && question.complexity <= max
				})
				if (!matchesComplexity) return false
			}

			if (filters.rating.length > 0) {
				if (!filters.rating.includes(question.rate)) return false
			}

			return true
		})
	}, [allQuestions, filters])

	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(filteredQuestions.length / pageSize))
	}, [filteredQuestions])

	const paginatedQuestions = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		return filteredQuestions.slice(startIndex, startIndex + pageSize)
	}, [filteredQuestions, currentPage])

	const handleFilterChange = useCallback((name, value) => {
		setFilters(prevFilters => {
			if (name === 'specializationId') {
				return {
					...prevFilters,
					specializationId:
						prevFilters.specializationId === value ? null : value
				}
			}

			if (Array.isArray(prevFilters[name])) {
				const isAlreadySelected = prevFilters[name].includes(value)
				const nextArr = isAlreadySelected
					? prevFilters[name].filter(id => id !== value)
					: [...prevFilters[name], value]

				return { ...prevFilters, [name]: nextArr }
			}

			return { ...prevFilters, [name]: value }
		})
		setCurrentPage(1)
	}, [])

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
	}

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(prev => prev - 1)
	}

	const handlePageClick = pageNumber => {
		setCurrentPage(pageNumber)
	}

	return (
		<div className={styles.container}>
			<QuestionList
				filters={filters}
				specializations={specializations}
				questions={paginatedQuestions}
				isLoading={isQuestionsLoading}
				currentPage={currentPage}
				totalPages={totalPages}
				onNextPage={handleNextPage}
				onPrevPage={handlePrevPage}
				onPageClick={handlePageClick}
			/>
			<AppSidebar
				filters={filters}
				isLoading={isSidebarLoading}
				onFilterChange={handleFilterChange}
				specializations={specializations}
				skills={skills}
			/>
		</div>
	)
}

export default AppMain
