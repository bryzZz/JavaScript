'use strict';

import "../style.css";

import { arrayToSortGen } from './utils';

import bubbleGen from './bubble-sort';
import insertionGen from './Insertion-sort';
import shakerGen from './shaker-sort';

import BarChart from './BarChart';

const sidebar = document.querySelector('.sidebar'),
      canvas = document.querySelector('#myCanvas'),
      speedSetting = document.querySelector('.settings select');

let arrayToSort = arrayToSortGen(60, 100, 1000);
let barChart = new BarChart(canvas, {data: arrayToSort});

const speedVariants = [300, 100, 50, 30, 10];
let interval;

sidebar.addEventListener('click', (e) => {
    if(!e.target.classList.contains('sidebar__item')) return;

    sidebar.querySelector('.sidebar__item--active')?.classList.remove('sidebar__item--active');
    e.target.classList.add('sidebar__item--active');

    const sortingType = e.target.dataset.sortingType,
          speed = speedVariants[+speedSetting.value - 1];

    if(interval){
        clearInterval(interval);
        arrayToSort = arrayToSortGen(60, 100, 1000);
    }

    barChart = new BarChart(canvas, {data: arrayToSort}); // redraw

    showSort(sortingType, speed);
});

function showSort(type, speed){
    let gen;

    if(type === 'bubble'){
        gen = bubbleGen(arrayToSort);
    }else if(type === 'insertion'){
        gen = insertionGen(arrayToSort);
    }else if(type === 'shaker'){
        gen = shakerGen(arrayToSort);
    }

    interval = setInterval(() => showChanges(gen, interval), speed);
}

function showChanges(gen, interval){
    let nextValue = gen.next();

    for(let item of arrayToSort) item.color = '#00FF00';

    if(nextValue.done){
        barChart = new BarChart(canvas, {data: arrayToSort});
        // console.log(arrayToSort.map(item => item.value));
        arrayToSort = arrayToSortGen(60, 100, 1000);
        clearInterval(interval);
    }else{
        const arr = nextValue.value[0],
            firstIndex = nextValue.value[1],
            secondIndex = nextValue.value[2];


        arr[firstIndex].color = '#FF6347';
        arr[secondIndex].color = '#FF6347';

        barChart = new BarChart(canvas, {data: arr});

        // barChart.swap([[firstIndex, secondIndex]]);
    }
}