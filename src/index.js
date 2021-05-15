import './sass/main.scss';

//import cardsTpl from ".././src/markup/cards.hbs";
//import modalTpl from ".././src/markup/modal.hbs";

// const refs = {
//     cardContainer: document.querySelector('.main-section-event-list'),
//     modalContainer: document.querySelector('.js-modal')
// }
// console.log(modalTpl);
// console.log(refs.modalContainer);
// refs.modalContainer.innerHTML = modalTpl();

// const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
// const API_KEY = 'CFtAODian0BKODBcnwTSMVzdAwRsrdku';

import cardsTpl from "./templates/eventCard.hbs";
import refs from './js/refs';
import constants from './js/constants.js';
import './js/fetchEvents.js';
import fetchingForm from './js/fetchEvents'
import { debounce } from "lodash";

// function fetchEvents() {


//     fetch(`${BASE_URL}/events.json?apikey=${API_KEY}`)
//         .then(rawResult => rawResult.json())
//         .then(card => {
//             console.log(card);
//             const markup = cardsTpl(card);
//             console.log(markup);
//             refs.cardContainer.innerHTML = markup;
//         })
//     fetch(`${BASE_URL}/events.json?apikey=${API_KEY}`)
//         .then(rawResult => rawResult.json())
//         .then(card => {
//             console.log(card);
//             const markup = modalTpl(card);
//             console.log(markup);
//             refs.modalContainer.innerHTML = markup;
//         })
// }
// fetchEvents()

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

