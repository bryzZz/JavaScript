/*
Напишите функцию, которая выводит в консоль числа от 1 до N; N передаётся аргументом в функцию.

Тело функции менять нельзя
*/

const seq1 = (
    x,
    $ = console.log( (
        seq1(x - 1, x > 1 ? void x : x),
        x
    ) )
 ) => null;
 
const seq2 = (
    x,
    $ = x > 1 ? seq2(x - 1) : void x,
    _ = console.log(x)
) => null;
 
seq1(5); // 1 2 3 4 5
console.log("---");
seq2(5); // 1 2 3 4 5