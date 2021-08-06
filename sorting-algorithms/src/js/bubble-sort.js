// const unsortedArray = [1, 3, 6, 1, 3, 7, 1, 2, 10, 9, 22, 14];

// function bubbleSort(arr){
//     const arrLength = arr.length;
//     for(let i = 0; i < arrLength; i++){
//         for(let j = arrLength-1; j > i; j--){
//             if (arr[j-1] > arr[j]) {
//                 [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
//             }
//         }
//     }
//     return arr;
// }

// console.log(unsortedArray);
// console.log(bubbleSort(unsortedArray));

export default function* bubbleSort(arr){
    const arrLength = arr.length;
    // const values = arr.map(item => item.value);
    for(let i = 0; i < arrLength; i++){
        for(let j = arrLength-1; j > i; j--){
            if (arr[j-1].value > arr[j].value) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
                yield [[...arr], j-1, j];
            }
        }
    }
    // return arr;
}