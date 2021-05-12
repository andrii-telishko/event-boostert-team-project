import './sass/main.scss';
import cardsTpl from ".././src/cards.hbs";

const refs = {
    cardContainer: document.querySelector('.main-section-event-list')
}

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = 'CFtAODian0BKODBcnwTSMVzdAwRsrdku';

function fetchEvents() {

    fetch(`${BASE_URL}/events.json?apikey=${API_KEY}`)
        .then(rawResult => rawResult.json())
        .then(card => {
            console.log(card);
            const markup = cardsTpl(card);
            console.log(markup);
            refs.cardContainer.innerHTML = markup;
        })
}
fetchEvents()