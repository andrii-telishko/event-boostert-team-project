import refs from './refs';
import fetchingForm from './fetchEvents';
export default {
    onSearchEventByCountry(e) {
  fetchingForm.fetchEventsInForm(e.target.value, refs.searchingInput.value);
  refs.chooseCountryInput.value = '';
    },
    onSearchEvent(e) {
  fetchingForm.fetchEventsInForm(refs.chooseCountryInput.value, e.target.value);
  refs.chooseCountryInput.value = '';
}
}