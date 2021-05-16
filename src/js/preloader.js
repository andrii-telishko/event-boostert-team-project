//Вариант 1
// window.onload = function () {
//   document.body.classList.add('loaded');
// };
//Вариант 2
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};
