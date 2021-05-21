import refs from './refs';
import cardsTpl from '../templates/eventCard.hbs';
import constants from '../js/constants';
import makeError from './makeError';
import renderPages from './renderPages';
import pagination from './pagination';
import countries from '../countries.json';
import createCountryList from '../templates/createCountryList.hbs'

export function startingFetchEvents() {
  renderPages.render(countries, refs.chooseCountryDatalist, createCountryList)
  fetch(`${constants.BASE_URL}/events.json?apikey=${constants.API_KEY}`)
    .then(response => {
        if (!response.ok) {
          throw error;
        }
        return response.json();
    }).then(data => {
      renderPages.removePage(refs.cardContainer);
      renderPages.renderEvents(data, refs.cardContainer, cardsTpl)
      pagination.renderPaginationItems(data.page.totalElements);
     }).catch(error =>  makeError.fetchError());
}