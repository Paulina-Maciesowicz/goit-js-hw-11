import axios from 'axios';
import Notiflix from 'notiflix';

const imagesForm = document.querySelector('#search-form');
const listImages = document.querySelector('.gallery');
const moreImages = document.querySelector('.load-more');

let page = 1;
let searchMore = '';
let searchMoreEnd = true;

async function fetchImages(name) {
  return await axios
    .get(
      `https://pixabay.com/api/?key=21858532-01f8fabf05f69063186fd3644&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    )
    .then(response => {
      if (response.data.totalHits < 1) {
        throw new Error(response.status);
      }
      searchMoreEnd = response.data.totalHits / 40 > page;
      return response.data;
    });
}

imagesForm.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
  searchMore = searchQuery.value;
  page = 1;

  document.getElementById('load-more').style.display = 'none';
  const onClick = () => {
    setTimeout(() => {
      document.getElementById('load-more').style.display = 'block';
    }, 3000);
  };
  onClick();

  listImages.innerHTML = '';

  {
    fetchImages(searchQuery.value)
      .then(images => {
        renderImages(images);
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  }
}
function renderImages(images) {
  const card = images.hits
    .map(image => {
      return `
      <div class="photo-card">
        <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b></br> ${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b></br> ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b></br> ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b></br> ${image.downloads}
          </p>
        </div>
      </div>`;
    })
    .join('');
  listImages.insertAdjacentHTML('beforeend', card);
}

moreImages.addEventListener('click', addMoreImages);

function addMoreImages() {
  if (searchMoreEnd !== true) {
    document.getElementById('load-more').style.display = 'none';
    Notiflix.Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
  }
  page++;
  fetchImages(searchMore)
    .then(images => renderImages(images))
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
