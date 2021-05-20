import './js/preloader';
import './sass/main.scss';
import refs from './js/refs';
import { debounce } from 'lodash';
import { onEventClick } from './js/openModal';
import { onModalClose } from './js/closeModal';
import './js/btnScroll';
import { startingFetchEvents } from './js/fetchAllEvents';
import fetchInForm from './js/fetchEvents';
import pagination from './js/pagination';


startingFetchEvents();

refs.searchingInput.addEventListener('input', debounce(fetchInForm.onSearchEvent, 1000));
refs.chooseCountryInput.addEventListener('change', fetchInForm.onSearchEventByCountry);
refs.eventClick.addEventListener('click', onEventClick);
refs.modalCloseBtn.addEventListener('click', onModalClose);
refs.showModal.addEventListener('click', onModalClose);
window.addEventListener('keydown', onModalClose);
refs.pagination.addEventListener('click', pagination.onPaginationSearch.bind(pagination));







