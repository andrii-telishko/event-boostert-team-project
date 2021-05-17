import './js/preloader';
// import './js/pagination';
import './js/service/validation';
import './sass/main.scss';
import './js/fetchAllEvents.js';
import refs from './js/refs';
import fetchingForm from './js/fetchEvents';
import { fetchAllEvents } from './js/fetchAllEvents';
import { debounce } from 'lodash';

import constants from './js/constants';
import cardsTpl from './templates/eventCard.hbs';
import modalTpl from './templates/modal.hbs';
import Pagination from 'tui-pagination';

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry);

fetchAllEvents();

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry);

function onSearchEventByCountry(e) {
  fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value);
}

// код для открытия модалки

refs.eventClick.addEventListener('click', onEventClick);

function onEventClick(evt) {
  evt.preventDefault();

  const eventId = evt.target.getAttribute('id');

  refs.showModal.classList.remove('is-hidden');
  fetch(`${constants.BASE_URL}/events/${eventId}.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(card => {
      // console.log(card);
      const markup = modalTpl(card);
      // console.log(markup);
      refs.modalContainer.innerHTML = markup;
    });
}

refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000));

function onSearchEvent(e) {
  fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
}

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 1000,
  visiblePages: 5,
  centerAlign: true,
});

refs.pagination.addEventListener('click', onPagination);

function onPagination(e) {
  e.preventDefault();
  const onBtnClick = e.target;
  if (onBtnClick.textContent === 'first') {
    constants.resetPage();
    onRenderPage(constants.page);
    return;
  } else if (onBtnClick.textContent === 'prev') {
    constants.decrementPage();
    onPrevOrNextBtnClick();
    return;
  } else if (onBtnClick.textContent === 'next') {
    constants.incrementPage();
    onPrevOrNextBtnClick();
    return;
  } else if (onBtnClick.textContent === 'last') {
    constants.page = 49;
    onPrevOrNextBtnClick();
    return;
  }
  constants.page = +e.target.textContent;
  onRenderPage(constants.page);
}

function onPrevOrNextBtnClick() {
  if (apiService.galleryStatus === 'ByUpcoming') {
    onUpcomingBtnClick();
  }
  if (apiService.galleryStatus === 'BySearch') {
    onSearchBtnClick();
  }
  if (apiService.galleryStatus === 'ByFilter') {
    onFilterBtnClick();
  }
}

function onSearchBtnClick() {
  if (constants.searchQuery !== refs.serchImpute.value) {
    constants.resetPage();
  }
  constants.searchQuery = refs.serchImpute.value;
  constants.getEventsSearchQuery(searchQuery).then(data => {
    validation.imageUrl(data);
    const markup = cardsTpl(data);
    refs.cardContainer.innerHTML = markup;
  });

  onScrollToTop();
}

function onRenderPage(newPage) {
  constants.page = newPage;
  console.log('newPage', newPage);
  onScrollToTop();
}
