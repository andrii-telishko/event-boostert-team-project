import { animated } from './gsapAnimating';

export default {
    renderEvents(array, selector, template) {
    
        this.render(array, selector, template);
          animated();           
    },
    render(array, selector, template) {
       selector.innerHTML = template(array)
    },
    removePage(selector) {
        selector.innerHTML = '';
}
}