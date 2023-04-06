import axios from 'axios';
import Notiflix from 'notiflix';

const imagesForm = document.querySelector('#search-form');
const listImages = document.querySelector('.gallery');

function fetchImages(name) {
  return axios
    .get(
      `https://pixabay.com/api/?key=21858532-01f8fabf05f69063186fd3644&q=yellow+flowers&image_type=photo`
    )
    .then(response => {
      console.log(response.data.hits[0].largeImageURL);
      return response.data;
    });
}

imagesForm.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  const abc = imagesForm.value;
  listImages.innerHTML = '';
  {
    fetchImages(abc)
      .then(images => renderImages(images))
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no image with that name');
      });
  }
}

function renderImages(images) {
  console.log('Too many matches found. Please enter a more specific name.');
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );

  const card = images
    .map(image => {
      return;
      `
    <div class="photo-card">
      <img src="${image[0].largeImageURL}" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
  listImages.innerHTML = card;
  return;
}
