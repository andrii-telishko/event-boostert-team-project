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

fetchAllEvents();

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry);

function onSearchEventByCountry(e) {
  fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value);
  refs.chooseCountryInput.value = '';
}

refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000));

function onSearchEvent(e) {
  fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
  refs.chooseCountryInput.value = '';
}

// код для открытия модалки

refs.eventClick.addEventListener('click', onEventClick);

function onEventClick(evt) {
  evt.preventDefault();
console.log(evt.target);
  const eventId = evt.target.getAttribute('id');

  refs.showModal.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
  fetch(`${constants.BASE_URL}/events/${eventId}.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(card => {
      // console.log(card);
      const markup = modalTpl(card);
      // console.log(markup);
      refs.modalContainer.innerHTML = markup;
    });
}

// Код для закриття модалки
//Закриття модального вікна при натисканні на кнопку button[data-modal-close]
//Закриття модального вікна при натисканні на backdrop.
//Закриття модального вікна після натискання клавіші ESC.
refs.modalCloseBtn.addEventListener('click', onModalClose);
refs.showModal.addEventListener('click', onModalClose);
window.addEventListener('keydown', onModalClose);

function onModalClose(event) {
  if (event.target || event.target === event.currentTarget || event.code === 'Escape') {
    onAddClassIsHiddenModal();
    onRemoveModalMarkup();
  }
}

//Очистка розмітки модалки при закритті
function onRemoveModalMarkup() {
  refs.modalContainer.innerHTML = '';
}
//Додавання класу is-hidden
function onAddClassIsHiddenModal() {
  refs.showModal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}
