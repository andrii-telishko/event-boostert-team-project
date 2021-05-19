import './js/preloader';
import './sass/main.scss';
import './js/fetchAllEvents.js';
import refs from './js/refs';
import fetchingForm from './js/fetchEvents';
import { fetchAllEvents } from './js/fetchAllEvents';
import { debounce } from 'lodash';

// import './js/pagination';

import constants from './js/constants';
import cardsTpl from './templates/eventCard.hbs';
import modalTpl from './templates/modal.hbs';
import fetchingFunctions from './js/fetchFunctions';
import renderPages from './js/renderPages'


fetchingFunctions.startingFetchEvents();

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry);

function onSearchEventByCountry(e) {
  fetchingFunctions.fetchEventsInForm(e.target.value, refs.searchingInput.value);
}

refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000));

function onSearchEvent(e) {
  fetchingFunctions.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
}

import { onEventClick } from './js/openModal';
import { onModalClose } from './js/closeModal';
import searchEventById from './js/searchEventByCountry';
import btnScroll from './js/btnScroll'; 

fetchAllEvents();
//код для пошуку по назві і країні
refs.chooseCountryInput.addEventListener('change', searchEventById.onSearchEventByCountry);
refs.searchingInput.addEventListener('input', debounce(searchEventById.onSearchEvent, 1000));


// код для открытия модалки

refs.eventClick.addEventListener('click', onEventClick);

// Код для закриття модалки
//Закриття модального вікна при натисканні на кнопку button[data-modal-close]
//Закриття модального вікна при натисканні на backdrop.
//Закриття модального вікна після натискання клавіші ESC.
refs.modalCloseBtn.addEventListener('click', onModalClose);
refs.showModal.addEventListener('click', onModalClose);
window.addEventListener('keydown', onModalClose);



//Очистка розмітки модалки при закритті
function onRemoveModalMarkup() {
  refs.modalContainer.innerHTML = '';
}
//Додавання класу is-hidden
function onAddClassIsHiddenModal() {
  refs.showModal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}



refs.pagination.addEventListener('click', onPaginationSearch);

function onPaginationSearch (e) {
  
  renderPages.removePage(refs.cardContainer);
 
  fetchingFunctions.fetchEventInPagination(+e.target.textContent-1,  refs.searchingInput.value, refs.chooseCountryInput.value)
  
  
};


