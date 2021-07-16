/*
Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.

- Если объект salaries пустой, то нужно вернуть null.
- Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
*/

const salariesObject = {
    John: 100,
    Pete: 300,
    Mary: 250,
};

const salariesObjectEmpty = {};

const topSalary = (salaries) => {
    let maxSalary = 0, maxName = null;

    for(const [name, salary] of Object.entries(salaries)){
        if(salary > maxSalary){
            maxSalary = salary;
            maxName = name;
        }
    }

    return maxName;
};

console.log(topSalary(salariesObject)); // Pete
console.log(topSalary(salariesObjectEmpty)); // null
