// import refs from './refs'
// import { fetchAllEvents } from './fetchAllEvents'
// import cardsTpl from '../templates/eventCard';
import paginate from 'jw-paginate';

// let pageSize = 20;
// // let countOfPages = Math.ceil(events.length / pageSize);

// let items = [];
// // Вместо '6' - надо поставить countOfPages - количество страниц всего
// for (let i = 1; i < 10; i++) {
//     let li = document.createElement('li');
//     li.innerHTML = i;
//     refs.pagination.appendChild(li);
//     items.push(li);
    
   
// }

// showPage(items[0]);

// for (let item of tems) {
//     item.addEventListener('clik', function () {
//         showPage(this);
//     })    
// }

// function showPage(item) {
//       let active = document.querySelector('pagination-list li:active');
//         if (active) {
//             active.classList.remove('active');
//         }
//         item.classList.add('active');

//         let pageNumber = +item.innerHTML;
//         let start = (pageNumber - 1) * pageSize;
//         let end = start + pageSize;
//         // режем массив на странички
//         let notes = cards.slice(start, end);

// refs.cardContainer.innerHTML = '';
//         for (note of notes) {
// //----Записывваем елементы массива EVENTS
//         }
// }
function paginationFn (
    totalItems,
    currentPage=1,
    pageSize=20,
    maxPages=10
) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage;
    let endPage;
   if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
       if (currentPage <= maxPagesBeforeCurrentPage) {
           // current page near the start
           startPage = 1;
           endPage = maxPages;
       } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
           startPage = currentPage - maxPagesBeforeCurrentPage;
           endPage = totalPages;
       } else {
           // current page somewhere in the middle
            startPage = currentPage - maxPagesAfterCurrentPage;
            endPage = currentPage + maxPagesBeforeCurrentPage;
       }
            
        
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

export { paginationFn };