'use strict';

import "../style.css";

import { fillArrayWithRandomIntegers } from './utils';

import bubbleGen from './bubble-sort';

const sidebar = document.querySelector('.sidebar'),
      container = document.querySelector('.numbersContainer');

const arrayToSort = fillArrayWithRandomIntegers(10, 0, 100);
let gen = bubbleGen(arrayToSort);
let interval = setInterval(showChanges, 3000);

// console.log(arrayToSort);

sidebar.addEventListener('click', (e) => {
    if(!e.target.classList.contains('sidebar__item') || e.target.classList.contains('sidebar__item--active')) return;

    sidebar.querySelector('.sidebar__item--active').classList.remove('sidebar__item--active');
    e.target.classList.add('sidebar__item--active');

    const sortingType = e.target.dataset.sortingType;
});

function showChanges(){
    let nextValue = gen.next();
    if(nextValue.done){
        clearInterval(interval);
    }else{
        // console.log(nextValue.value);
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

const data = [100, 200, 300, 400, 500, 600, 100, 800, 900, 1000];
const canvas = document.querySelector('#myCanvas');

const WIDTH = 600;
const HEIGHT = 200;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const ROWS_COUNT = 5;
const PADDING = 40;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
const VIEW_WIDTH = DPI_WIDTH - PADDING * 2;

function chart(canvas, data){
    const ctx = canvas.getContext('2d');

    const [MIN, MAX] = computeBoundaries(data);

    const yRatio = VIEW_HEIGHT / (MAX - MIN);
    const xRatio = VIEW_WIDTH / data.length;

    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';

    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    // ===== y axes
    yAxes(ctx, MIN, MAX);

    // ===== lines
    const step = DPI_WIDTH / data.length;

    ctx.beginPath();
    ctx.fillStyle = 'lime';
    for(let i = 0; i <= data.length; i++){
        const y = DPI_HEIGHT - data[i] * yRatio;
        const x = i * xRatio;
        const barWidth = 10;
        const barHeight = DPI_HEIGHT;

        ctx.fillRect(x, y, barWidth, barHeight);
    }

    // const y = DPI_HEIGHT - 100 * yRatio;
    // console.log(y);
    // ctx.fillRect(100, y, 100, 100 * yRatio);
    // ctx.fillRect(300, DPI_HEIGHT - 280 * yRatio, 100, 280 * yRatio);
    ctx.stroke();
    ctx.closePath();
}

chart(canvas, data);

function line(ctx, values){
    ctx.beginPath();
    // ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    for(const [x, y] of coords){
        ctx.moveTo();
        ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRatio);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
}

function yAxes(ctx, yMin, yMax){
    const step = VIEW_HEIGHT / ROWS_COUNT;
    const textStep = (yMax - yMin) / ROWS_COUNT;

    ctx.beginPath();
    ctx.strokeStyle = '#bbb'; // цвет линии
    ctx.font = 'normal 20px Helvetica, sans-serif'; // шрифт
    ctx.fillStyle = '#96a2aa'; // цвет шрифта
    for(let i = 1; i <= ROWS_COUNT; i++){
        const y = step * i;
        const text = Math.round(yMax - textStep * i);
        ctx.fillText(text, 5, y + PADDING - 10);
        ctx.moveTo(0, y + PADDING);
        ctx.lineTo(DPI_WIDTH, y + PADDING);
    }
    ctx.stroke();
    ctx.closePath();
}

function computeBoundaries(data){
    let min, max;

    for(const value of data){
        if(typeof min !== 'number') min = value;
        if(typeof max !== 'number') max = value;

        if(min > value) min = value;
        if(max < value) max = value;
    }

    return [min, max];
}

// ctx.fillRect(0, 0, 100, 100); // квадрат в 0 0
// ctx.fillStyle = 'blue'; // цвет заполнения
// ctx.fillRect(100, 100, 100, 100);

// ctx.beginPath(); // начали путь
// ctx.moveTo(200, 200); // передвинули курсор на координаты
// ctx.lineTo(300, 300); // линия в 300 300
// ctx.stroke(); // линия появилась
// ctx.closePath(); // закончили путь

// ctx.beginPath();
// ctx.strokeStyle = 'red'; // поменяли цвет линии
// ctx.moveTo(200, 200);
// ctx.lineTo(100, 300);
// ctx.stroke();
// ctx.closePath(); 

// ctx.font ='30px Arial'; // шрифт
// ctx.fillText('Test', 300, 400); // текст