import refs from './refs'
import cardsTpl from "../templates/eventCard.hbs";
import modalTpl from "../templates/modal.hbs";
import constants from '../js/constants';

export function fetchAllEvents() {
    fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
        .then(rawResult => rawResult.json())
        .then(card => {
            const markup = cardsTpl(card);
            refs.cardContainer.innerHTML = markup;
        })
}
        

    
