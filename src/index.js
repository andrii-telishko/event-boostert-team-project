import './sass/main.scss';
import cardsTpl from "./templates/eventCard.hbs";
import refs from './js/refs';
import constants from './js/constants.js';
import './js/fetchEvents.js';
import fetchingForm from './js/fetchEvents'
import { debounce } from "lodash";

function fetchEvents() {

    fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
        .then(rawResult => rawResult.json())
        .then(card => {
            console.log(card);
            const markup = cardsTpl(card);
            // console.log(markup);
            refs.cardContainer.innerHTML = markup;
        })
}
fetchEvents()

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry)

function onSearchEventByCountry(e) {
    fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value)
    }
    
refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000))

function onSearchEvent (e) {
    fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value)
        }