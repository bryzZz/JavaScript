let generator = sequence(10, 3);
let generator2 = sequence(7, 1);

console.log(generator()); // 10
console.log(generator()); // 13

console.log(generator2()); // 7

console.log(generator()); // 16

console.log(generator2()); // 8

let gen2 = sequence(0, 2);
console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]

function take(gen, x){
    let result = [];
    for(let i = 0; i < x; i++){
        result.push(gen());
    }
    return result;
}

// first solution
// function sequence(start = 0, step = 1) {
//     return function() {
//         let returnValue = start; 
//         start += step;
//         return returnValue;
//     }
// }

// second solution
function sequence(start = 0, step = 1) {
    function* gen(start, step) {
        while (true) {
            yield start;
            start += step;
        }
    }

    let generator = gen(start, step);

    return () => generator.next().value;
}