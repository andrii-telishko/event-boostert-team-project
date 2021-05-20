import paginate from 'jw-paginate';
import refs from './refs';
import renderPages from './renderPages';
import cardsTpl from '../templates/eventCard';
import makeError from './makeError';
import constants from '../js/constants'

export default {
     paginationFn (
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
       
        if (totalPages > maxPages) {
            pages.splice(10, 0, '...', totalPages)
        }
        
        if (startPage === totalPages - 9) {
            pages.splice(10, 2)
        }
        
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
},

 renderPaginationItems(totalElements, pageNumber) {
     const pagesArr = this.paginationFn(totalElements, pageNumber);
        
        pagesArr.pages.forEach(page => {
            let li = document.createElement('li');
            li.innerHTML = page;
            refs.pagination.appendChild(li);
        })
    },
 
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
            this.renderPaginationItems(data.page.totalElements, pageNumber + 1);   
                }).catch(error => makeError.fetchError());
        },
 
    onPaginationSearch(e) {
        if (e.target.value === '...') {
         refs.pagination.removeEventListener('click', pagination.onPaginationSearch.bind(pagination));
        } else {
           renderPages.removePage(refs.cardContainer);
     this.fetchEventInPagination(+e.target.textContent - 1, refs.searchingInput.value, refs.chooseCountryInput.value); 
     }
  
     
}
}

 
