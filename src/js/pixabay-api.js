import axios from 'axios'

const API_KEY = '36979931-b9ebd2c49fac6caefdf5e0dc3'
const BASE_URL = 'https://pixabay.com/api/'

async function getImagesByQuery(query, page = 1) {
	try {
		const response = await axios.get(BASE_URL, {
			params: {
				key: API_KEY,
				q: query,
				image_type: 'photo',
				orientation: 'horizontal',
				safesearch: true,
				page: page,
				per_page: 15,
			},
		})
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch images')
	}
}

export { getImagesByQuery }
