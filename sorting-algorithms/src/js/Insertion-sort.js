//can be accelerated

export default function* insertionSort(arr){
    const arrLength = arr.length;
    
    for(let i = 1; i < arrLength; i++){
        let j = i;
        while(j > 0 && arr[j].value < arr[j-1].value){
            yield [j-1, j];
            j--;
        }
    }

    // return arr;
}