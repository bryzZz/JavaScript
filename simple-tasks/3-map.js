function square(x) { return x * x; } // возведение в квадрат
console.log(myMap(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
console.log(myMap(square, [])); // []

function myMap(fn, array){
    if(array.length === 0) return array;

    let resultArr = [];
    for(item of array){
        resultArr.push(fn(item));
    }

    return resultArr;
}