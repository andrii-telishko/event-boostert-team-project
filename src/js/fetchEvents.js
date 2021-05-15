import refs from './refs'
import cardsTpl from '../templates/eventCard';
import constants from './constants';
import {fetchAllEvents} from './fetchAllEvents'


 export default {
    fetchEventsInForm(code, word) {
        const countryCode = code;
        const keyword = word;
        this.removePage();
         return fetch(`${constants.BASE_URL}/events.json
        ?keyword=${keyword}&countryCode=${countryCode}&apikey=${constants.API_KEY}`)
             .then(response => {
                 if (!response.ok) {
                     throw error;
                 }
                 return response.json();
                 
             }).then(events => {
                 if (events.page.totalElements === 0) {
                     alert('Help')
                     refs.searchingInput.value = '';
                     fetchAllEvents();
                 } else {
                     this.renderEvents(events);
                    }
                })
             .catch(error => alert('Sorry!!! Something going wrong'));
       },
    
    renderEvents(array) {
       refs.cardContainer.innerHTML = cardsTpl(array);
      },

     removePage() {
        refs.cardContainer.innerHTML = '';
      }
}





















