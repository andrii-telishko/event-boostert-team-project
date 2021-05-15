import refs from './refs'
import cardsTpl from "../templates/eventCard.hbs";
import modalTpl from "../templates/modal.hbs";
import constants from '../js/constants';
import fetchingForm from '../js/fetchEvents';
import { debounce } from "lodash";


export default {
    function: fetchAllEvents(),
}
  
function fetchAllEvents() {
    fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
        .then(rawResult => rawResult.json())
        .then(card => {
            console.log(card);
            const markup = cardsTpl(card);
            console.log(markup);
            refs.cardContainer.innerHTML = markup;
        })

         fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
        .then(rawResult => rawResult.json())
        .then(card => {
            console.log(card);
            const markup = modalTpl(card);
            console.log(markup);
            refs.modalContainer.innerHTML = markup;
        })
    }
        
refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry)

function onSearchEventByCountry(e) {
    fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value)
    }
    
refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000))

function onSearchEvent (e) {
    fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value)
}
    
