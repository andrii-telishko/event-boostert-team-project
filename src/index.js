import './sass/main.scss';
import './js/fetchAllEvents.js';
import refs from './js/refs';
import './js/fetchEvents.js';
import fetchingForm from './js/fetchEvents'
import { debounce } from "lodash";

import constants from './js/constants';
import cardsTpl from "./templates/eventCard.hbs";
import modalTpl from "./templates/modal.hbs";

refs.chooseCountryInput.addEventListener('change', onSearchEventByCountry)

function onSearchEventByCountry(e) {
    fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value)
    }
    
refs.searchingInput.addEventListener('input', debounce(onSearchEvent, 1000))

function onSearchEvent (e) {
    fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value)
}
// код для открытия и закрытия модалки
const eventId = 'Z698xZbpZ17a4oM';
const showModal = document.querySelector('.backdrop');
const eventClick = document.querySelector('img');
const closeBtn = document.querySelector('.modal-svg')
eventClick.addEventListener('click', onEventClick);
closeBtn.addEventListener('click', onModalClose)

function onEventClick(evt) {
    evt.preventDefault()
    showModal.classList.remove('is-hidden')
    fetch(`${constants.BASE_URL}/events/Z698xZbpZ17a4oM.json?apikey=${constants.API_KEY}`)
        .then(rawResult => rawResult.json())
        .then(card => {
            console.log(card);
            const markup = modalTpl(card);
            console.log(markup);
            refs.modalContainer.innerHTML = markup;
            // refs.modalContainer.insertAdjacentHTML('beforeend', markup)
        })
}

function onModalClose() {
    console.log('HELLO');
    showModal.classList.add('is-hidden')   
}
