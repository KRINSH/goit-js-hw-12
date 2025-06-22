import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'

const imageGallery = document.querySelector('.gallery')
const loader = document.querySelector('.loader')
const loadMoreBtn = document.querySelector('.load-more-btn')

let lightbox = null

function createLightbox() {
	// Уничтожаем предыдущий экземпляр если он существует
	if (lightbox) {
		lightbox.destroy()
	}

	// Создаем новый экземпляр SimpleLightbox
	lightbox = new SimpleLightbox('.gallery-link', {
		captionsData: 'alt',
		captionPosition: 'bottom',
		captionDelay: 250,
	})
}

function createGallery(images) {
	const markup = images
		.map(
			({
				webformatURL,
				largeImageURL,
				tags,
				likes,
				views,
				comments,
				downloads,
			}) => `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <div class="image-container">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </div>
        <div class="image-inform">
          <div>
            <h3 class="image-inform-title">Likes</h3>
            <span class="image-inform-text">${likes}</span>
          </div>
          <div>
            <h3 class="image-inform-title">Views</h3>
            <span class="image-inform-text">${views}</span>
          </div>
          <div>
            <h3 class="image-inform-title">Comments</h3>
            <span class="image-inform-text">${comments}</span>
          </div>
          <div>
            <h3 class="image-inform-title">Downloads</h3>
            <span class="image-inform-text">${downloads}</span>
          </div>
        </div>
      </a>
    </li>`
		)
		.join('')

	imageGallery.insertAdjacentHTML('beforeend', markup)
	createLightbox()
}

function clearGallery() {
	imageGallery.innerHTML = ''
	if (lightbox) {
		lightbox.destroy()
		lightbox = null
	}
}

function showLoader() {
	loader.classList.remove('hidden')
}

function hideLoader() {
	loader.classList.add('hidden')
}

function showLoadMoreButton() {
	loadMoreBtn.style.display = 'block'
}

function hideLoadMoreButton() {
	loadMoreBtn.style.display = 'none'
}

export {
	clearGallery,
	createGallery,
	hideLoadMoreButton,
	hideLoader,
	showLoadMoreButton,
	showLoader,
}
