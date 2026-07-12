import axios from 'axios'

const client = axios.create({
	baseURL: 'https://api.yeatwork.ru/',
	headers: {
		'Content-Type': 'application/json'
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
