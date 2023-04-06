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

  const markup = images
  .map((image) => <div class="obraz"><img src=${image.url} alt=${image.alt}></div>)
  .join("");
listImages.insertAdjacentHTML("afterbegin", markup);
  return;
}
