export function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function fillArrayWithRandomIntegers(arrLength, minValue, maxValue){
    const arr = [];
    for(let i = 0; i < arrLength; i++){
        arr.push(randomInteger(minValue, maxValue));
    }
    return arr;
}