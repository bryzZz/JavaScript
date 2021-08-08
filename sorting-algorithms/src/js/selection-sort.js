export default function* selectionSort(arr) {
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
        let indexMin = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[indexMin].value > arr[j].value) {
                indexMin = j;
            }
        }
        if (indexMin !== i) {
            yield [i, indexMin];
        }
    }
  }