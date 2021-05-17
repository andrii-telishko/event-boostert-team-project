import { gsap } from "gsap";

 export function animated() {
  gsap.from(".js-list", {duration: 1, y: 100, opacity: 0, scale: 0.5});  
}

