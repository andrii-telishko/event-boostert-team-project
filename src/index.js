import './sass/main.scss';
import './js/fetchAllEvents.js';
import refs from './js/refs';
import './js/fetchEvents.js';
import fetchingForm from './js/fetchEvents'
import { debounce } from "lodash";

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry)

function onSearchEventByCountry(e) {
    fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value)
    }
    
refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000))

function onSearchEvent (e) {
    fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value)
}


