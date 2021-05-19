import refs from './refs'
import cardsTpl from '../templates/eventCard';
import constants from './constants';
import makeError from './makeError'
import renderPages from './renderPages';
import { startingFetchEvents } from './fetchAllEvents';
import pagination from './pagination';

export default {
    onSearchEventByCountry(e) {
       fetchEventsInForm(e.target.value, refs.searchingInput.value);
   },
    
    onSearchEvent(e) {
      fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
    }
}

function fetchEventsInForm(countryCode, keyword) {
    renderPages.removePage(refs.cardContainer);
    fetch(`${constants.BASE_URL}/events.json
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
            refs.chooseCountryInput.value = '';
            renderPages.removePage(refs.pagination);
            startingFetchEvents();
        } else {
            renderPages.renderEvents(events,  refs.cardContainer, cardsTpl)
            renderPages.removePage(refs.pagination);
            pagination.renderPaginationItems(events.page.totalElements, 1)
        }
    }).catch(error =>  makeError.fetchError());
}





















