import refs from './refs';
import constants from './constants';
import modalTpl from '../templates/modal.hbs';
import renderPages from './renderPages'

export function onEventClick(evt) {
  evt.preventDefault();
  const eventId = evt.target.getAttribute('id');
  refs.showModal.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
  fetch(`${constants.BASE_URL}/events/${eventId}.json?apikey=${constants.API_KEY}`)
    .then(rawResult => rawResult.json())
    .then(card => renderPages.render(card, refs.modalContainer, modalTpl));
}


// const arrayWithImgRefs = galleryItems.map(item => item.original)


// const arrayWithAltRefs = galleryItems.map(item => item.description)
  

// function onModalChangeImgByKeyDown(event) {
    
//   let indexOfImg = arrayWithImgRefs.indexOf(refs.modalImg.src);
  
//     let indexOfIAlt = indexOfImg
//     const indexOfLastElement = arrayWithImgRefs.length-1
//   if (event.code === 'ArrowRight') {
//     if (indexOfImg < indexOfLastElement) {
//       indexOfImg += 1;
//       indexOfIAlt += 1;
      
//       getImgAttributes(arrayWithImgRefs[indexOfImg], arrayWithAltRefs[indexOfImg]);
//     }
//     else if (indexOfImg = indexOfLastElement) {
      
//       getImgAttributes(arrayWithImgRefs[0], arrayWithAltRefs[0]);
//     }
//   }
//   else if (event.code === 'ArrowLeft') {
//     if (indexOfImg > 0) {
//       indexOfImg -= 1;
//       indexOfIAlt -= 1;
      
//       getImgAttributes(arrayWithImgRefs[indexOfImg], arrayWithAltRefs[indexOfImg]);
//     }
//     else {
      
//       getImgAttributes(arrayWithImgRefs[indexOfLastElement], arrayWithAltRefs[indexOfLastElement]);
//     }
//     }
// }