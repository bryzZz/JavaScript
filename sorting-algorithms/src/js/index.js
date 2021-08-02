'use strict';

import "../style.css";

import { fillArrayWithRandomIntegers } from './utils';

import bubbleGen from './bubble-sort';

import Chart from 'chart.js/auto';

const sidebar = document.querySelector('.sidebar'),
      container = document.querySelector('.numbersContainer'),
      ctx = document.querySelector('#myChart').getContext('2d');

sidebar.addEventListener('click', (e) => {
    if(!e.target.classList.contains('sidebar__item') || e.target.classList.contains('sidebar__item--active')) return;

    sidebar.querySelector('.sidebar__item--active').classList.remove('sidebar__item--active');
    e.target.classList.add('sidebar__item--active');

    const sortingType = e.target.dataset.sortingType;
});

const arrayToSort = fillArrayWithRandomIntegers(10, 0, 100);
// for(let i = 0; i < 10; i++){
//     arrayToSort.push(randomInteger(0, 100));

//     container.textContent += arrayToSort[i] + ' ';
// }

console.log(arrayToSort);

let gen = bubbleGen(arrayToSort);

let interval = setInterval(showChanges, 3000);

function showChanges(){
    let nextValue = gen.next();
    if(nextValue.done){
        clearInterval(interval);
    }else{
        console.log(nextValue.value);
        let arr = nextValue.value[0],
            firstIndex = nextValue.value[1],
            secondIndex = nextValue.value[2];

        let newArr = document.createElement('div');

        for(let i = 0; i < arr.length; i++){
            let span = document.createElement('span');
            span.textContent = arr[i] + ' ';
            if(i === firstIndex || i === secondIndex){
                span.style.color = 'lime';
            }
            newArr.append(span);
        }

        container.innerHTML = '';
        container.append(newArr);
    }
}

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{
            label: 'Bubble sort',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});