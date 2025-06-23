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

const searchForm = document.querySelector('.form')
const loadMoreBtn = document.querySelector('.load-more-btn')
const gallery = document.querySelector('.gallery')

let currentQuery = ''
let currentPage = 1
let totalHits = 0
const perPage = 15

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

		const totalPages = Math.ceil(totalHits / perPage)
		if (currentPage < totalPages) {
			showLoadMoreButton()
		} else {
			hideLoadMoreButton()
		}

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

		// Получаем высоту первой карточки до добавления новых
		const { height: cardHeight } =
			gallery.firstElementChild.getBoundingClientRect()

		createGallery(data.hits)

		const totalPages = Math.ceil(totalHits / perPage)
		if (currentPage < totalPages) {
			showLoadMoreButton()
		} else {
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

		// Плавная прокрутка к новым картинкам
		window.scrollBy({
			top: cardHeight * 2,
			behavior: 'smooth',
		})
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
