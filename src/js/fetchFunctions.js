// import paginate from 'jw-paginate';
import constants from './constants';
import cardsTpl from '../templates/eventCard.hbs';
import refs from './refs';
import { animated } from './gsapAnimating';
import pagination from './pagination';
import makeError from './makeError'
import renderPages from './renderPages'

export default {
    fetchEventInPagination(pageNumber, keyword, countryCode) {
    
    
    fetch(`${constants.BASE_URL}/events.json?page=${pageNumber}&keyword=${keyword}&countryCode=${countryCode}&apikey=${constants.API_KEY}`)
        .then(response => {
                 if (!response.ok) {
                     throw error;
                 }
                 return response.json();
                 
             }).then(data => {
            
            renderPages.renderEvents(data, refs.cardContainer, cardsTpl)
           
            renderPages.removePage(refs.pagination);
            pagination.renderPaginationItems(data.page.totalElements, pageNumber + 1);
            

             })
         .catch(error => makeError.fetchError());
        
},

startingFetchEvents() {
                fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
                    .then(response => {

                 if (!response.ok) {
                     throw error;
                 }
                 return response.json();
                 
             })
                    .then(data => {
            renderPages.removePage(refs.cardContainer);
                        renderPages.renderEvents(data, refs.cardContainer, cardsTpl)
        
                        pagination.renderPaginationItems(data.page.totalElements);
     
                    })
                    .catch(error =>  makeError.fetchError());
            },




      
 fetchEventsInForm(countryCode, keyword) {
        
        renderPages.removePage(refs.cardContainer);
         return fetch(`${constants.BASE_URL}/events.json
        ?keyword=${keyword}&countryCode=${countryCode}&apikey=${constants.API_KEY}`)
             .then(response => {
                 
                 if (!response.ok) {
                     throw error;
                 }
                 return response.json();
                 
             }).then(events => {
                 
                 if (events.page.totalElements === 0) {
                    
                     makeError.pNotifyError();
                     refs.searchingInput.value = '';
                     this.startingFetchEvents();
                 } else {
                     renderPages.renderEvents(events,  refs.cardContainer, cardsTpl)
                    
                     renderPages.removePage(refs.pagination);
                     pagination.renderPaginationItems(events.page.totalElements, 1)
        
                    }
                })
             .catch(error =>  makeError.fetchError());
}
       



}




      


