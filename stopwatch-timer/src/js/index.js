'use strict';

import Stopwatch from './stopwatch';
import Timer from './timer';
import '../scss/style.scss';

const menu = document.querySelector('.menu');

new Stopwatch({parentSelector: '.container'});

menu.addEventListener('click', event => {
  if(event.target.classList.contains('menu__item')){
    menu.querySelectorAll('.menu__item').forEach(menuItem => menuItem.classList.remove('active'));

    document.querySelector('.container').innerHTML = '';

    if(event.target.dataset.stopwatch === ''){
      new Stopwatch({parentSelector: '.container'});
    }else{
      new Timer('.container');
    }

    event.target.classList.add('active');
  }
});