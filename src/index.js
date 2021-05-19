import './js/preloader';
import './sass/main.scss';
import './js/fetchAllEvents.js';
import refs from './js/refs';
import fetchingForm from './js/fetchEvents';
import { fetchAllEvents } from './js/fetchAllEvents';
import { debounce } from 'lodash';
import { onEventClick } from './js/openModal'
import { onModalClose } from './js/closeModal'
import searchEventById from './js/searchEventByCountry'

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


