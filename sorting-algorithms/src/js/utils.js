function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function arrayToSortGen(arrLength, minValue, maxValue){
    let num = randomInteger(0, arrLength);
    const arr = [];
    for(let i = 0; i < arrLength; i++){
        if(i === num){
            arr.push({value: 0, color: 'lime'});
        }else{
            arr.push({value: randomInteger(minValue, maxValue), color: 'lime'});
        }
    }
    return arr;
}