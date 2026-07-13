import { useCallback, useEffect, useMemo, useState } from 'react'
import { getQuestions, getSkills, getSpecializations } from '../api'
import { complexityItems, ratingItems } from '../constants/filters'

export const useQuestionsScreen = () => {
	const [questions, setQuestions] = useState([])
	const [totalQuestions, setTotalQuestions] = useState(0)

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

	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(totalQuestions / pageSize))
	}, [totalQuestions, pageSize])

	useEffect(() => {
		const fetchQuestionsData = async () => {
			try {
				setIsQuestionsLoading(true)

				const params = {
					page: currentPage,
					limit: pageSize,
					keywords: filters.search || undefined,
					specializationId: filters.specializationId || undefined
				}

				if (filters.skillIds.length > 0) params.skillIds = filters.skillIds
				if (filters.complexity.length > 0)
					params.complexity = filters.complexity
				if (filters.rating.length > 0) params.rating = filters.rating

				const response = await getQuestions(params)

				setQuestions(response.items)
				setTotalQuestions(response.total)
			} catch (error) {
				console.error('Ошибка при загрузке вопросов:', error)
			} finally {
				setIsQuestionsLoading(false)
			}
		}

		fetchQuestionsData()
	}, [currentPage, filters, pageSize])

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				setIsSidebarLoading(true)
				const [specData, skillsData] = await Promise.all([
					getSpecializations(),
					getSkills()
				])
				setSpecializations(specData)
				setSkills(skillsData)
			} catch (error) {
				console.error('Ошибка при загрузке данных сайдбара:', error)
			} finally {
				setIsSidebarLoading(false)
			}
		}
		fetchInitialData()
	}, [])

	const handleFilterChange = useCallback((name, value) => {
		setFilters(prevFilters => {
			let nextValue

			if (name === 'specializationId') {
				nextValue = prevFilters.specializationId === value ? null : value
			} else if (Array.isArray(prevFilters[name])) {
				const isAlreadySelected = prevFilters[name].includes(value)
				nextValue = isAlreadySelected
					? prevFilters[name].filter(id => id !== value)
					: [...prevFilters[name], value]
			} else {
				nextValue = value
			}

			return { ...prevFilters, [name]: nextValue }
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

	const filterConfigs = useMemo(
		() => [
			{
				id: 'specialization',
				filterName: 'specializationId',
				title: 'Специализация',
				items: specializations
			},
			{
				id: 'skills',
				filterName: 'skillIds',
				title: 'Выберите навыки',
				items: skills
			},
			{
				id: 'complexity',
				filterName: 'complexity',
				title: 'Сложность',
				items: complexityItems
			},
			{
				id: 'rating',
				filterName: 'rating',
				title: 'Рейтинг вопросов',
				items: ratingItems
			}
		],
		[specializations, skills]
	)

	const handleResetFilters = useCallback(() => {
		setFilters({
			search: '',
			specializationId: null,
			skillIds: [],
			complexity: [],
			rating: [],
			status: 'Все'
		})
		setCurrentPage(1)
	}, [])

	return {
		filters,
		currentPage,
		totalPages,
		isQuestionsLoading,
		isSidebarLoading,
		paginatedQuestions: questions,
		handleFilterChange,
		handleNextPage,
		handlePrevPage,
		handlePageClick,
		handleResetFilters,
		filterConfigs,
		specializations,
		skills
	}
}
