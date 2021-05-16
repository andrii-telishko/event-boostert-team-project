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
