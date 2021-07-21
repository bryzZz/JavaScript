'use strict';

import '../scss/style.scss';

const calculator = document.querySelector('.calculator'),
      showLine = calculator.querySelector('.calculator__show-line');

let expression = '';

calculator.addEventListener('click', (e) => {
    if(!e.target.classList.contains('calculator__btn')) return;
    if(e.target.dataset.option === "calculate"){
        calculate(expression);
        return;
    }

    expression += e.target.dataset.value;
    showLine.textContent += e.target.textContent;
});

function calculate(strExpression){
    strExpression = '22+3-2*(2*5+2)*4';

    //tokenization
    let lexemes = ['(', '3', '+', '(', '4', '*', '5' ,')',')'];

    let syntaxTree = buldSyntaxTree(lexemes);

    function tokenize(strExpression){
        let lexemes = [];

        let i = 0;
        while(i < strExpression.length){
            let s = strExpression[i];
            switch(s){
                case '(': lexemes.push({type: 'leftBracket', value: '('}); break;
                case ')': lexemes.push({type: 'rightBracket', value: ')'}); break;
                case '+': lexemes.push({type: 'opPlus', value: '+'}); break;
                case '-': lexemes.push({type: 'opMinus', value: '-'}); break;
                case '*': lexemes.push({type: 'opMul', value: '*'}); break;
                case '/': lexemes.push({type: 'opDiv', value: '/'}); break;
                default: 
                    if(!isNaN(s)){
                        let str = s;
                        i++;
                        while(!isNaN(strExpression[i]) && i < strExpression.length){
                            str += strExpression[i];
                            i++;
                        }
                        lexemes.push({type: 'number', value: str});
                        continue;
                    }
            }

            i++;
        }

        return lexemes;
    }

    function buldSyntaxTree(lexemes){
        class Node{
            constructor({value = null, parent = null, priority = 0, leftChild = null, rightChild = null}){
                this.parent = parent;
                this.value = value;
                this.priority = priority;
                this.leftChild = leftChild;
                this.rightChild = rightChild;
            }
        }
    
        let currentNode = new Node();

        for(let lexeme of lexemes){
            if(lexeme === '('){
                currentNode.leftChild = new Node(null, currentNode);
                currentNode = currentNode.leftChild; 
            }else if(['+', '-', '*', '/'].includes(lexeme)){
                currentNode = currentNode.parent = new Node({value: lexeme, leftChild: currentNode});
            }else if(!isNaN(lexeme)){
                if(!currentNode.parent){
                    currentNode.value = +lexeme;
                }else{
                    
                }
            }else if(lexeme === ')'){
                currentNode = currentNode.parent;
            }
        }

        return rootnode;
    }

    function syntaxTreeCalculate(syntaxTreeNode){
        const operators = {
            '+'(first, second) {
                return first + second;
            },
            '-'(first, second) {
                return first - second;
            },
            '*'(first, second) {
                return first * second;
            },
            '/'(first, second) {
                return first / second;
            },
        }

        const leftChild = syntaxTreeNode.leftChild;
        const rightChild = syntaxTreeNode.rightChild;

        if(leftChild && rightChild){
            const fn = operators[syntaxTreeNode.value];
            return fn(syntaxTreeCalculate(leftChild), syntaxTreeCalculate(rightChild));
        }else{
            return syntaxTreeNode.value;
        }
    }

    const calculatedResult = syntaxTreeCalculate(syntaxTree);

    console.log(syntaxTree, calculatedResult);
}