import './js/preloader';
import './sass/main.scss';
import './js/fetchAllEvents.js';
import refs from './js/refs';
import fetchingForm from './js/fetchEvents';
import { fetchAllEvents } from './js/fetchAllEvents';
import { debounce } from 'lodash';

import constants from './js/constants';
import cardsTpl from './templates/eventCard.hbs';
import modalTpl from './templates/modal.hbs';




fetchAllEvents();


refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry);

function onSearchEventByCountry(e) {
  fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value);
}

refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000));

function onSearchEvent(e) {
  fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
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


// Код для закриття модалки
//Закриття модального вікна при натисканні на кнопку button[data-modal-close]
//Очищення розмітки модалки. Це необхідно   для того,
//щоб при наступному відкритті модального вікна, поки вантажиться   зображення, ми не бачили попереднє.

refs.modalCloseBtn.addEventListener('click', onCloseModalBtn);

function onCloseModalBtn(e) {
  onAddClassIsHiddenModal();
  onRemoveModalMarkup();
}

//Закриття модального вікна при натисканні на backdrop.

refs.showModal.addEventListener('click', onCloseBackdrop);

function onCloseBackdrop(e) {
  onAddClassIsHiddenModal();
  onRemoveModalMarkup();
}

//Закриття модального вікна після натискання клавіші ESC.

window.addEventListener('keydown', onCloseEscape);

function onCloseEscape(e) {
  if (e.code === 'Escape' && !refs.showModal.classList.contains('is-hidden')) {
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
}
