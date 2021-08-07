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
            arr.push({value: 0, color: '#00FF00'});
        }else{
            arr.push({value: randomInteger(minValue, maxValue), color: '#00FF00'});
        }
    }
    return arr;
}

export function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}