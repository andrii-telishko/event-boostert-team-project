import refs from './refs';
import cardsTpl from '../templates/eventCard.hbs';
import modalTpl from '../templates/modal.hbs';
import constants from '../js/constants';
import { animated } from './gsapAnimating'

export function fetchAllEvents() {
  fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(card => {
     
      const markup = cardsTpl(card);
      
      refs.cardContainer.innerHTML = markup;
      animated();
      
    });

  fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(card => {
      // console.log(card);
      const markup = modalTpl(card);
      // console.log(markup);
      refs.modalContainer.innerHTML = markup;
    });
}
