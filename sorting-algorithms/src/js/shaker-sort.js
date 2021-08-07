export default function* shakerSort(arr){
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
    for (let i = right; i > left; --i) {
        if (arr[i-1].value > arr[i].value) {
            [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
            yield [[...arr], i-1, i];
        }
    }
    ++left;
    for (let i = left; i < right; ++i) {
        if (arr[i].value > arr[i+1].value) {
            [arr[i+1], arr[i]] = [arr[i], arr[i+1]];
            yield [[...arr], i+1, i];
        }
    }
    --right;
    }
}