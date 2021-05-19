import refs from './refs';

export function onModalClose(event) {
  if (event.target || event.target === event.currentTarget || event.code === 'Escape') {
    onAddClassIsHiddenModal();
    onRemoveModalMarkup();
  }
}

//Очистка розмітки модалки при закритті
function onRemoveModalMarkup() {
  refs.modalContainer.innerHTML = '';
}
//Додавання класу is-hidden
function onAddClassIsHiddenModal() {
  refs.showModal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}
