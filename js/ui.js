//Apertura pannello in javascript con evento click
const elementClicked = document.querySelector('.site-nav__hamburger'); //va messo col puntino perché prima non c'è niente che lo identifica con la classe
const elementOpen = document.querySelector('.site-nav__menu');
const body = document.querySelector('body')
elementClicked.addEventListener('click', () => {
elementOpen.classList.toggle('site-nav__menu--open');
event.stopPropagation();
});
body.addEventListener('click', (e) => {
  elementOpen.classList.remove('site-nav__menu--open');
});
