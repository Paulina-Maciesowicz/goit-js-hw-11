import axios from 'axios';

const imagesForm = document.querySelector('#search-form');
const listImages = document.querySelector('.gallery');

function fetchImages(name) {
  return axios
    .get(
      `https://pixabay.com/api/?key=21858532-01f8fabf05f69063186fd3644&q=yellow+flowers&image_type=photo`
    )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
}

// countryBox.addEventListener('input', debounce(searchCountris, DEBOUNCE_DELAY));

function searchImages() {
  const abc = imagesForm.value.trim();
  listImages.innerHTML = '';
  if (abc === '') return;
  {
    fetchImages(abc)
      .then(users => renderImages(users))
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function renderImages(image) {
  if (image.length > 10) {
    console.log('Too many matches found. Please enter a more specific name.');
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  console.log(image);
}

const card = image
  .map(image => {`
    <div class="photo-card">
      <img src="${image.svg}" alt="" loading="lazy" />
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
listImages.innerHTML = markup;
return;
