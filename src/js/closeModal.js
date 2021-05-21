import refs from './refs';

export function onModalClose(event) {
  if (event.currentTarget===refs.showModal || event.target === event.currentTarget || event.code === 'Escape') {
    onAddClassIsHiddenModal();
    onRemoveModalMarkup();
  }
}


function onRemoveModalMarkup() {
  refs.modalContainer.innerHTML = '';
}

function onAddClassIsHiddenModal() {
  refs.showModal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}
