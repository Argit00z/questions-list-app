import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { getQuestions, getSkills, getSpecializations } from '../api'
import { complexityItems, ratingItems } from '../constants/filters'

export const useQuestionsScreen = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [questions, setQuestions] = useState([])
	const [totalQuestions, setTotalQuestions] = useState(0)
	const [specializations, setSpecializations] = useState([])
	const [skills, setSkills] = useState([])
	const [isQuestionsLoading, setIsQuestionsLoading] = useState(true)
	const [isSidebarLoading, setIsSidebarLoading] = useState(true)

	const pageSize = 10

	const filters = useMemo(() => {
		const specId = searchParams.get('specializationId')

		const getArrayParam = key => {
			const val = searchParams.get(key)
			return val ? val.split(',').filter(item => item.trim() !== '') : []
		}

		return {
			search: searchParams.get('search') || '',
			specializationId: specId !== null ? (specId ? Number(specId) : null) : 11,
			skillIds: getArrayParam('skillIds')
				.map(Number)
				.filter(id => !isNaN(id)),
			complexity: getArrayParam('complexity'),
			rate: getArrayParam('rate').map(val =>
				isNaN(Number(val)) ? val : Number(val)
			),
			status: searchParams.get('status') || 'Все'
		}
	}, [searchParams])

	const currentPage = useMemo(() => {
		return Number(searchParams.get('page')) || 1
	}, [searchParams])

	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(totalQuestions / pageSize))
	}, [totalQuestions, pageSize])

	const updateUrlParams = useCallback(
		(newFilters, newPage) => {
			const params = new URLSearchParams()

			if (newPage && newPage > 1) {
				params.set('page', String(newPage))
			}

			if (newFilters.search) {
				params.set('search', newFilters.search)
			}

			if (
				newFilters.specializationId !== null &&
				newFilters.specializationId !== undefined
			) {
				params.set('specializationId', String(newFilters.specializationId))
			}

			if (
				Array.isArray(newFilters.skillIds) &&
				newFilters.skillIds.length > 0
			) {
				params.set('skillIds', newFilters.skillIds.join(','))
			}

			if (
				Array.isArray(newFilters.complexity) &&
				newFilters.complexity.length > 0
			) {
				params.set('complexity', newFilters.complexity.join(','))
			}

			if (Array.isArray(newFilters.rate) && newFilters.rate.length > 0) {
				params.set('rate', newFilters.rate.join(','))
			}

			if (newFilters.status && newFilters.status !== 'Все') {
				params.set('status', newFilters.status)
			}

			setSearchParams(params)
		},
		[setSearchParams]
	)

	const handleFilterChange = useCallback(
		(name, value) => {
			let nextValue
			const currentValue = filters[name]

			if (name === 'specializationId') {
				nextValue = String(currentValue) === String(value) ? null : value
			} else if (Array.isArray(currentValue)) {
				const stringValue = String(value)
				const isAlreadySelected = currentValue.some(
					item => String(item) === stringValue
				)

				if (isAlreadySelected) {
					nextValue = currentValue.filter(item => String(item) !== stringValue)
				} else {
					const typedValue =
						!isNaN(Number(value)) && typeof value !== 'boolean'
							? Number(value)
							: value
					nextValue = [...currentValue, typedValue]
				}
			} else {
				nextValue = value
			}

			const nextFilters = { ...filters, [name]: nextValue }
			updateUrlParams(nextFilters, 1)
		},
		[filters, updateUrlParams]
	)

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

				if (filters.skillIds.length > 0) params.skills = filters.skillIds
				if (filters.complexity.length > 0)
					params.complexity = filters.complexity
				if (filters.rate.length > 0) params.rate = filters.rate

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
	}, [
		currentPage,
		pageSize,
		filters.search,
		filters.specializationId,
		filters.status,
		filters.skillIds,
		filters.complexity,
		filters.rate
	])

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

	const handleNextPage = () => {
		if (currentPage < totalPages) updateUrlParams(filters, currentPage + 1)
	}

	const handlePrevPage = () => {
		if (currentPage > 1) updateUrlParams(filters, currentPage - 1)
	}

	const handlePageClick = pageNumber => {
		updateUrlParams(filters, pageNumber)
	}

	const handleResetFilters = useCallback(() => {
		setSearchParams({})
	}, [setSearchParams])

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
				filterName: 'rate',
				title: 'Рейтинг вопросов',
				items: ratingItems
			}
		],
		[specializations, skills]
	)

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
