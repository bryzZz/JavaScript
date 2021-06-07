const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1;

    while(left <= right){
        const mid = Math.round((right - left) / 2) + left;

        if(target === arr[mid]) return mid;
        else if(target < arr[mid]) right = mid - 1;
        else left = mid + 1;
    }

    return -1;
}

const recursionBinarySearch = (arr, target, left, right) => {
    if(right <= left) return -1;

    const mid = Math.round((right + left) / 2);

    if(target === arr[mid]){
        return mid;
    }
    else if(target < arr[mid]){
        return recursionBinarySearch(arr, target, left, mid - 1);
    }
    else{
        return recursionBinarySearch(arr, target, mid + 1, right);
    }
}

console.log('first:', binarySearch(arr, 5));
console.log('second:', recursionBinarySearch(arr, 50, 0, arr.length));