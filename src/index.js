import axios from 'axios';
import Notiflix from 'notiflix';

const imagesForm = document.querySelector('#search-form');
const listImages = document.querySelector('.gallery');
const moreImages = document.querySelector('.load-more');

let page = 1;

function fetchImages(name) {
  return axios
    .get(
      `https://pixabay.com/api/?key=21858532-01f8fabf05f69063186fd3644&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=3`
    )
    .then(response => {
      return response.data;
    });
}

imagesForm.addEventListener('submit', searchImages);
moreImages.addEventListener('click');

function searchImages(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
  page++;
  // listImages.innerHTML = '';
  {
    fetchImages(searchQuery.value)
      .then(images => renderImages(images))
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no image with that name');
      });
  }
}

function renderImages(images) {
  const card = images.hits
    .map(image => {
      return `
      <div class="photo-card">
        <img src="${image.largeImageURL}" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${image.likes}
          </p>
          <p class="info-item">
            <b>Views:</b> ${image.views}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${image.downloads}
          </p>
        </div>
      </div>`;
    })
    .join('');
  listImages.insertAdjacentHTML('beforeend', card);
  console.log(card);
}