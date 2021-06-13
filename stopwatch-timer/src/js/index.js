'use strict';

import Stopwatch from './stopwatch';
import '../scss/style.scss';

const menu = document.querySelector('.menu');

menu.addEventListener('click', event => {
  if(event.target.classList.contains('menu__item')){
    menu.querySelectorAll('.menu__item').forEach(menuItem => menuItem.classList.remove('active'));

    document.querySelector('.container').innerHTML = '';

    if(event.target.dataset.stopwatch === ''){
      const stopwatch = new Stopwatch({parentSelector: '.container'});
    }

    event.target.classList.add('active');
  }
});