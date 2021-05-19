import refs from './refs';
import constants from './constants';
import modalTpl from '../templates/modal.hbs';


export function onEventClick(evt) {
  evt.preventDefault();
console.log(evt.target);
  const eventId = evt.target.getAttribute('id');

  refs.showModal.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
  fetch(`${constants.BASE_URL}/events/${eventId}.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(card => {
      // console.log(card);
      const markup = modalTpl(card);
      // console.log(markup);
      refs.modalContainer.innerHTML = markup;
    });
}