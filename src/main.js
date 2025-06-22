import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

import { getImagesByQuery } from './js/pixabay-api.js'
import {
	clearGallery,
	createGallery,
	hideLoader,
	hideLoadMoreButton,
	showLoader,
	showLoadMoreButton,
} from './js/render-functions.js'

const searchForm = document.querySelector('.search-form')
const loadMoreBtn = document.querySelector('.load-more-btn')

let currentQuery = ''
let currentPage = 1
let totalHits = 0

// Скрываем кнопку Load more при загрузке
hideLoadMoreButton()

searchForm.addEventListener('submit', handleSearch)
loadMoreBtn.addEventListener('click', handleLoadMore)

async function handleSearch(event) {
	event.preventDefault()

	const searchQuery = event.target.elements['search-text'].value.trim()

	if (!searchQuery) {
		iziToast.error({
			message: 'Please enter some valid search value!',
			messageSize: '16px',
			messageLineHeight: '24px',
			messageColor: '#fafafb',
			closeOnClick: true,
			position: 'topRight',
		})
		return
	}

	// Сброс при новом поиске
	currentQuery = searchQuery
	currentPage = 1
	clearGallery()
	hideLoadMoreButton()

	try {
		showLoader()
		const data = await getImagesByQuery(searchQuery, currentPage)

		if (data.hits.length === 0) {
			iziToast.error({
				message:
					'Sorry, there are no images matching your search query. Please try again!',
				messageSize: '16px',
				messageLineHeight: '24px',
				messageColor: '#fafafb',
				closeOnClick: true,
				position: 'topRight',
			})
			return
		}

		totalHits = data.totalHits
		createGallery(data.hits)

		// Показываем кнопку Load more только если есть еще страницы
		if (data.hits.length < totalHits) {
			showLoadMoreButton()
		}

		// Показываем сообщение о количестве найденных изображений
		iziToast.success({
			message: `Hooray! We found ${totalHits} images.`,
			messageSize: '16px',
			messageLineHeight: '24px',
			messageColor: '#fafafb',
			closeOnClick: true,
			position: 'topRight',
		})
	} catch (error) {
		iziToast.error({
			message: `${error.message}. Please try again later`,
			closeOnClick: true,
			position: 'topRight',
		})
	} finally {
		hideLoader()
		searchForm.reset()
	}
}

async function handleLoadMore() {
	if (!currentQuery) return

	currentPage += 1

	try {
		showLoader()
		const data = await getImagesByQuery(currentQuery, currentPage)

		createGallery(data.hits)

		// Проверяем, есть ли еще страницы
		const totalPages = Math.ceil(totalHits / 15)
		if (currentPage >= totalPages) {
			hideLoadMoreButton()
			iziToast.info({
				message: "We're sorry, but you've reached the end of search results.",
				messageSize: '16px',
				messageLineHeight: '24px',
				messageColor: '#fafafb',
				closeOnClick: true,
				position: 'topRight',
			})
		}
	} catch (error) {
		iziToast.error({
			message: `${error.message}. Please try again later`,
			closeOnClick: true,
			position: 'topRight',
		})
		currentPage -= 1 // Откатываем номер страницы при ошибке
	} finally {
		hideLoader()
	}
}
