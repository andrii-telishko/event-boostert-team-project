import { debounce } from "lodash";
// import cardsTpl from "../cards.hbs";

const chooseCountryInput = document.querySelector('.choose-country');
const cardContainer = document.querySelector('.main-section-event-list');
const searchingInput = document.querySelector('.form-field')





function fetchEventsInForm(code, word) {
    const countryCode = code;
    const keyword = word;
    const events = fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&countryCode=${countryCode}&apikey=CFtAODian0BKODBcnwTSMVzdAwRsrdku`).then(response => response.json())

    return events;
}

function renderEvents(array) {
    refs.cardContainer.innerHTML = cardsTpl(array);
}

function removePage() {
    cardContainer.innerHTML = '';
}

// function valuesOfInputs (countryCode, keyword) {
//     const code = countryCode;
//     const word = keyword;
// }


// function showEvents() {
//     fetchEventsInForm();
//     renderEvents(events)
// }



chooseCountryInput.addEventListener('change', onSearchEventByCountry)

function onSearchEventByCountry(e) {
    removePage();
    // valuesOfInputs(e.currentTarget.value, input.value);
    // const countryCode = e.currentTarget.value;
    // const keyword = input.value;
    // console.log(keyword);
    // fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&countryCode=${countryCode}&apikey=CFtAODian0BKODBcnwTSMVzdAwRsrdku`).then(response => response.json()).then(data => cardContainer.innerHTML = cardsTpl(data));

    fetchEventsInForm(e.target.value, refs.searchingInput.value).then(events => renderEvents(events) )
    
}

input.addEventListener('input', debounce(onSearchEvent, 1000))

function onSearchEvent (e) {
    console.log(e.target.value);
    removePage();
    // valuesOfInputs(chooseCountryInput.value, e.target.value);
    // const keyword = e.target.value;
    // const countryCode = chooseCountryInput.value
    // showEvents();
    fetchEventsInForm(refs.chooseCountryInput.value, e.target.value).then(events => renderEvents(events));
    
}