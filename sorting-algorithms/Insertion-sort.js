//can be accelerated
const unsortedArray = [1, 3, 6, 1, 3, 7, 1, 2, 10, 9, 22, 14];

function insertionSort(arr){
    const arrLength = arr.length;
    
    for(let i = 2; i < arrLength; i++){
        let j = i;
        while(j > 0 && arr[j] < arr[j-1]){
            [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
            j--;
        }
    }

    return arr;
}

console.log(unsortedArray);
console.log(insertionSort(unsortedArray));