// import refs from './refs'
// import { fetchAllEvents } from './fetchAllEvents'
// import cardsTpl from '../templates/eventCard';

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
