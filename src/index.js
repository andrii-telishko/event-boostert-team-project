import './js/preloader';
import './sass/main.scss';
// import './js/fetchAllEvents.js';
import refs from './js/refs';
import fetchingForm from './js/fetchEvents';
import {fetchAllEvents} from './js/fetchAllEvents'
import { debounce } from 'lodash';
// import './js/pagination';

fetchAllEvents();

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry);

function onSearchEventByCountry(e) {
  fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value);
}

refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000));

function onSearchEvent(e) {
  fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
}
