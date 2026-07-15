import axios from 'axios'

const client = axios.create({
	baseURL: 'https://api.yeatwork.ru/',
	headers: {
		'Content-Type': 'application/json'
	},
	paramsSerializer: params => {
		const searchParams = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value === undefined || value === null) return

			if (Array.isArray(value)) {
				value.forEach(val => searchParams.append(key, val))
			} else {
				searchParams.append(key, value)
			}
		})

		return searchParams.toString()
	}
})

export async function getQuestions(params = {}) {
	const { page = 1, limit = 10, keywords, ...filters } = params
	const response = await client.get('/questions/public-questions', {
		params: {
			page,
			limit,
			keywords,
			...filters
		}
	})

	return {
		items: response.data?.data || [],
		total: response.data?.total || 0
	}
}

export async function getSpecializations(params = {}) {
	const { page = 1, limit = 100, ...filters } = params
	const response = await client.get('/specializations', {
		params: {
			page,
			limit,
			...filters
		}
	})

	return response.data?.data || []
}

export async function getSkills(params = {}) {
	const { page = 1, limit = 100, ...filters } = params
	const response = await client.get('/skills', {
		params: {
			page,
			limit,
			...filters
		}
	})

	return response.data?.data || []
}

export async function getQuestionById(id) {
	const response = await client.get(`/questions/public-questions/${id}`)

	return response.data?.data || response.data || null
}
