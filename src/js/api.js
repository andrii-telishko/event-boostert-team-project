// import paginate from 'jw-paginate';
import constants from './constants';
import cardsTpl from '../templates/eventCard.hbs';
import refs from './refs';
import { animated } from './gsapAnimating';
import { paginationFn } from './pagination';
import makeError from './makeError'


// console.log(paginationFn);
// console.log('Hello');

function fetchEvent() {
    return fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
        .then(response => 
                 
                
                 response.json()
                 
             )
};

function fetchEventInPagination(page, word, country) {
    const pageNumber = page;
    const keyword = word;
    const countryCode = country
    fetch(`${constants.BASE_URL}/events.json?page=${pageNumber}&keyword=${keyword}&countryCode=${countryCode}&apikey=${constants.API_KEY}`)
        .then(response => response.json()).then(data => {
            // console.log(data);
            renderEvents(data, refs.cardContainer, cardsTpl);
            animated();
            // console.log(paginationFn(data.page.totalElements, page));
             const pagesArr = paginationFn(data.page.totalElements, page+1);
            removePage(refs.pagination);
            console.log(pagesArr);
            console.log(pagesArr.pages);
            pagesArr.pages.forEach(page => {
                let li = document.createElement('li');
                li.innerHTML = page;
                refs.pagination.appendChild(li);
            })
        })

}

function startingFetchEvents() {
    fetchEvent().then(data => {
        // console.log(data);
        renderEvents(data, refs.cardContainer, cardsTpl);
        animated();
        // console.log(data.page.totalElements);
        const pagesArr = paginationFn(data.page.totalElements);
        // console.log(pagesArr);
        pagesArr.pages.forEach(page => {
            let li = document.createElement('li');
            li.innerHTML = page;
            refs.pagination.appendChild(li);
        })
    })
}

function renderEvents(array, selector, template) {
       selector.innerHTML = template(array)
}

function removePage(selector) {
        selector.innerHTML = '';
};
      
 function fetchEventsInForm(code, word) {
        const countryCode = code;
        const keyword = word;
        removePage(refs.cardContainer);
         return fetch(`${constants.BASE_URL}/events.json
        ?keyword=${keyword}&countryCode=${countryCode}&apikey=${constants.API_KEY}`)
             .then(response => 
                 
                response.json()
                 
         ).then(events => {
                 console.log(events);
                 if (events.page.totalElements === 0) {
                    
                     makeError();
                     refs.searchingInput.value = '';
                     startingFetchEvents();
                 } else {
                     renderEvents(events,  refs.cardContainer, cardsTpl);
                     animated();
                     const pagesArr = paginationFn(events.page.totalElements, 1);
                     console.log(pagesArr);
                      removePage(refs.pagination);
        pagesArr.pages.forEach(page => {
            let li = document.createElement('li');
            li.innerHTML = page;
            refs.pagination.appendChild(li);
        })
                    }
                })
            //  .catch(error => alert('Sorry!!! Something going wrong'));
       }
      
export { startingFetchEvents, removePage, fetchEventInPagination , fetchEventsInForm};