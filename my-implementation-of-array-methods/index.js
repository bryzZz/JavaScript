'use strict';

let arr = [0, 1, 2, 3, 4, 5, 6, 7];
arr[20] = 8;

Array.prototype.myForEach = function(callback, thisArg = this){
    if(thisArg == null){
        throw new Error('Cant iterate');
    }

    let O = Object(thisArg);

    console.log(O);

    let length = O.length;

    let i = 0;
    while(i < length){
        if(i in O){
            callback.call(thisArg, O[i], i, O);
        }

        i++;
    }

    // for(let i = 0; i < this.length; i++){
    //     callback(this[i], i, this);
    // }
};


arr.myForEach((item, index, array) => {
    console.log({item, index, array});
});

// arr.forEach((item, index, array) => {

// });