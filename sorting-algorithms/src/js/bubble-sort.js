export default function* bubbleSort(arr){
    const arrLength = arr.length;

    for(let i = 0; i < arrLength; i++){
        for(let j = arrLength-1; j > i; j--){
            if (arr[j-1].value > arr[j].value) {
                yield [j-1, j];
            }
        }
    }
}