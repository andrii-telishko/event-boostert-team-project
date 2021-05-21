import refs from './refs'
import cardsTpl from '../templates/eventCard';
import constants from './constants';
import makeError from './makeError'
import renderPages from './renderPages';
import { startingFetchEvents } from './fetchAllEvents';
import pagination from './pagination';
import countries from '../countries.json';


export default {
    onSearchEventByCountry(e) {
        
         translateCountryNameInCountryCode(refs.searchingInput.value, e.target.value)
        
   },
    
    onSearchEvent(e) {
        
        translateCountryNameInCountryCode( e.target.value, refs.chooseCountryInput.value)
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

function translateCountryNameInCountryCode(keyword, countryName) {
           if (countryName === '') {
             fetchEventsInForm( countryName, keyword);
        } else {
             const country = countries.find(country => country.name === countryName)
             fetchEventsInForm(country.countryCode, keyword);
        }
}

