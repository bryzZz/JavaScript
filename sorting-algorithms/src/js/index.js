'use strict';

import "../style.css";

import { arrayToSortGen } from './utils';

import bubbleGen from './bubble-sort';

import BarChart from './BarChart';

const sidebar = document.querySelector('.sidebar'),
      container = document.querySelector('.numbersContainer');

const canvas = document.querySelector('#myCanvas');

const arrayToSort = arrayToSortGen(40, 100, 1000);
new BarChart(canvas, {data: arrayToSort});
let gen = bubbleGen(arrayToSort);
let interval = setInterval(showChanges, 30);

sidebar.addEventListener('click', (e) => {
    if(!e.target.classList.contains('sidebar__item') || e.target.classList.contains('sidebar__item--active')) return;

    sidebar.querySelector('.sidebar__item--active').classList.remove('sidebar__item--active');
    e.target.classList.add('sidebar__item--active');

    const sortingType = e.target.dataset.sortingType;
});

function showChanges(){
    let nextValue = gen.next();
    if(nextValue.done){
        for(let item of arrayToSort) item.color = 'lime';
        new BarChart(canvas, {data: arrayToSort});
        clearInterval(interval);
    }else{
        // console.log(nextValue.value);
        let arr = nextValue.value[0],
            firstIndex = nextValue.value[1],
            secondIndex = nextValue.value[2];

        for(let item of arr) item.color = 'lime';

        arr[firstIndex].color = 'tomato';
        arr[secondIndex].color = 'tomato';

        new BarChart(canvas, {data: arr});

        // console.log(arr, firstIndex, secondIndex);

        // let newArr = document.createElement('div');

        // for(let i = 0; i < arr.length; i++){
        //     let span = document.createElement('span');
        //     span.textContent = arr[i] + ' ';
        //     if(i === firstIndex || i === secondIndex){
        //         span.style.color = 'lime';
        //     }
        //     newArr.append(span);
        // }

        // container.innerHTML = '';
        // container.append(newArr);
    }
}

const data = [
    {
        value: 100,
        color: 'lime'
    },
    {
        value: 200,
        color: 'lime'
    },
    {
        value: 400,
        color: 'tomato'
    },
    {
        value: 600,
        color: 'lime'
    },
    {
        value: 800,
        color: 'lime'
    },
];

// arrayToSort[5].color = 'tomato';