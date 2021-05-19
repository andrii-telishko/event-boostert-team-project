import refs from './refs';
import cardsTpl from '../templates/eventCard.hbs';
import modalTpl from '../templates/modal.hbs';
import constants from '../js/constants';
import { animated } from './gsapAnimating'

export function fetchAllEvents() {

  fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(markupEventsOfList)
  animated();
}
      

      featchEvents()
        .then(markupEventsOfList)
        .catch(error => {
          alert('Something went wrong')
        });

      featchEvents()
        .then(markupEventsOfModal)
        .catch(error => {
          alert('Something went wrong')

        });
    


function featchEvents() {
  return fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`).then(rawResult => {
      if (!rawResult.ok) {
                throw error;
      }
      return rawResult.json()
    })
  
}

function markupEventsOfList(card) {
  const markup = cardsTpl(card);
      // console.log(markup);
  refs.cardContainer.innerHTML = markup;
  
  
}
function markupEventsOfModal(card) {
  const markup = modalTpl(card);
      // console.log(markup);
      refs.modalContainer.innerHTML = markup;
}
