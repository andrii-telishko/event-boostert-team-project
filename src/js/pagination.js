// import constants from './constants';
// import cardsTpl from '../templates/eventCard';
// import refs from './refs';
// import validation from './service/validation';

// const pagination = new Pagination(document.getElementById('pagination'), {
//   totalItems: 490,
//   visiblePages: 5,
//   centerAlign: true,
// });

// refs.pagination.addEventListener('click', onPagination);

// function onPagination(e) {
//   e.preventDefault();
//   const onBtnClick = e.target;
//   if (onBtnClick.textContent === 'first') {
//     constants.resetPage();
//     onRenderPage(constants.page);
//     return;
//   } else if (onBtnClick.textContent === 'prev') {
//     constants.decrementPage();
//     onPrevOrNextBtnClick();
//     return;
//   } else if (onBtnClick.textContent === 'next') {
//     constants.incrementPage();
//     onPrevOrNextBtnClick();
//     return;
//   } else if (onBtnClick.textContent === 'last') {
//     constants.page = 49;
//     onPrevOrNextBtnClick();
//     return;
//   }
//   constants.page = +e.target.textContent;
//   onRenderPage(constants.page);
// }

// function onPrevOrNextBtnClick() {
//   if (apiService.galleryStatus === 'ByUpcoming') {
//     onUpcomingBtnClick();
//   }
//   if (apiService.galleryStatus === 'BySearch') {
//     onSearchBtnClick();
//   }
//   if (apiService.galleryStatus === 'ByFilter') {
//     onFilterBtnClick();
//   }
// }

// function onSearchBtnClick() {
//   if (constants.searchQuery !== refs.serchImpute.value) {
//     constants.resetPage();
//   }
//   constants.searchQuery = refs.serchImpute.value;
//   constants.getEventsSearchQuery(searchQuery).then(data => {
//     validation.imageUrl(data);
//     const markup = cardsTpl(data);
//     refs.cardContainer.innerHTML = markup;
//   });

//   onScrollToTop();
// }

// function onRenderPage(newPage) {
//   constants.page = newPage;
//   console.log('newPage', newPage);
//   onScrollToTop();
// }
