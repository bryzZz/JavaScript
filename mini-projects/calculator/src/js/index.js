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
    // strExpression = '22+3-2*(2*5+2)*4';
    strExpression = '2.2 ^ 3 + 2 * 2 ^ 3';

    //possible operations
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
        '^'(first, second) {
            return first ** second;
        },
    }

    //tokenization
    const lexemes = tokenize(strExpression);
    // build syntax tree
    const syntaxTree = buldSyntaxTree(lexemes);
    // calculate result
    const calculatedResult = syntaxTreeCalculate(syntaxTree);

    function tokenize(strExpression){
        let lexemes = [];

        let i = 0;
        while(i < strExpression.length){
            let s = strExpression[i];
            if(s in operators || s === '(' || s === ')'){
                lexemes.push(s);
            }else if(!isNaN(s)){
                let str = s;
                i++;
                while((!isNaN(strExpression[i]) || strExpression[i] === '.') && i < strExpression.length){
                    str += strExpression[i];
                    i++;
                }
                lexemes.push(str.trim());
                continue;
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
    
        let currentNode;

        for(let lexeme of lexemes){
            if(lexeme === '('){
                currentNode.leftChild = new Node(null, currentNode);
                currentNode = currentNode.leftChild; 
            }else if(['+', '-', '*', '/', '^'].includes(lexeme)){
                let pr = (lexeme === '*' || lexeme === '/') ? 2 : 1;

                if(lexeme === '^'){
                    pr = 3;
                }

                if(!currentNode?.parent){
                    currentNode.parent = new Node({value: lexeme, leftChild: currentNode, priority: pr});
                    currentNode = currentNode.parent;
                }else{
                    do{
                        currentNode = currentNode.parent;
                    }while(currentNode?.priority > pr && currentNode?.parent);

                    if(currentNode.priority >= pr){
                        currentNode = new Node({value: lexeme, leftChild: currentNode, priority: pr});
                    }else{
                        currentNode.rightChild = new Node({value: lexeme, leftChild: currentNode.rightChild, priority: pr, parent: currentNode});
                        currentNode = currentNode.rightChild;
                    }
                }
            }else if(!isNaN(lexeme)){
                if(!currentNode?.leftChild){
                    currentNode = new Node({value: +lexeme});
                }else{
                    currentNode.rightChild = new Node({value: +lexeme, parent: currentNode});
                    currentNode = currentNode.rightChild;
                }
            }else if(lexeme === ')'){
                currentNode = currentNode.parent;
            }
        }

        while(currentNode?.parent){
            currentNode = currentNode.parent;
        }

        return currentNode;
    }

    function syntaxTreeCalculate(syntaxTreeNode){
        const leftChild = syntaxTreeNode.leftChild;
        const rightChild = syntaxTreeNode.rightChild;

        if(leftChild && rightChild){
            const fn = operators[syntaxTreeNode.value];
            return fn(syntaxTreeCalculate(leftChild), syntaxTreeCalculate(rightChild));
        }else{
            return syntaxTreeNode.value;
        }
    }

    console.log(lexemes, syntaxTree, calculatedResult);
}