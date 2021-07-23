'use strict';

import Typed from './Typed';
import '../scss/style.scss';

const calculator = document.querySelector('.calculator'),
      showLine = calculator.querySelector('.calculator__answer-line'),
      answerLine = calculator.querySelector('.calculator__show-line');

let expression = '';

//possible operations
const operators = {
    '+': {
        fn: (first, second) => first + second,
        priority: 1
    },
    '-': {
        fn: (first, second) => first - second,
        priority: 1
    },
    '*': {
        fn: (first, second) => first * second,
        priority: 2
    },
    '/': {
        fn: (first, second) => first / second,
        priority: 2
    },
    '%': {
        fn: (first, second) => first % second,
        priority: 2
    },
    '^': {
        fn: (first, second) => first ** second,
        priority: 3
    },
}

calculator.addEventListener('click', (e) => {
    if(!e.target.classList.contains('calculator__btn')) return;

    if(e.target.dataset.option === 'calculate'){
        if(isExpressionCorrect(expression)){
            const result = calculate(expression);

            new Typed(answerLine, showLine.textContent + '=', 260);

            showLine.textContent = result;
            expression = result;
        }
        return;
    }

    if(e.target.dataset.option === 'clear'){
        expression = '';
        showLine.textContent = '0';
        return;
    }

    if(showLine.textContent === '0'){
        if(e.target.dataset.option === 'option' && e.target.dataset.value !== '-'){
            return;
        }

        expression = e.target.dataset.value;
        showLine.textContent = e.target.textContent;
    }else if(e.target.dataset.option === 'option' && showLine.textContent[showLine.textContent.length-1] in operators){
        if(expression.length > 1){
            expression = expression.slice(0, expression.length - 1) + e.target.dataset.value;
            showLine.textContent = showLine.textContent.slice(0, showLine.textContent.length - 1) + e.target.textContent
        }
    }else{
        expression += e.target.dataset.value;
        showLine.textContent += e.target.textContent;
    }
});

function isExpressionCorrect(strExpression){
    strExpression = strExpression.trim();

    if(strExpression === '0' || strExpression === '') return false;

    return true;
}

function calculate(strExpression){
    // strExpression = '1+(2-3)*4*5+6*7';
    // strExpression = '2.2 ^ 3 + 2 * 2 ^ 3';

    // evaluating an expression by building a parse tree
    let result = firstMethod(strExpression);

    return result;
}

function firstMethod(strExpression){
    //tokenization
    const lexemes = tokenize(strExpression);
    console.log(lexemes);
    // build syntax tree
    const syntaxTree = buldSyntaxTree(lexemes);
    // calculate result
    const calculatedResult = syntaxTreeCalculate(syntaxTree);

    function tokenize(strExpression){
        let lexemes = [];

        let i = 0;
        while(i < strExpression.length){
            let s = strExpression[i];
            if(s === '-' && !strExpression?.[i-1]){
                lexemes.push(`${0 - +strExpression[i+1]}`);
                i++;
            }else if(s in operators){
                lexemes.push(s);
            }else if(s === '('){
                lexemes.push(tokenize(strExpression.slice(i+1, strExpression.indexOf(')'))));
                i = strExpression.indexOf(')') + 1;
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
            if(Array.isArray(lexeme)){
                const treeFromBrackets = buldSyntaxTree(lexeme);
                if(!currentNode?.leftChild){
                    currentNode = treeFromBrackets;
                }else{
                    currentNode.rightChild = treeFromBrackets;
                    currentNode.rightChild.parent = currentNode;
                    currentNode = currentNode.rightChild;
                }
            }else if(lexeme in operators){
                let pr = operators[lexeme].priority;

                if(!currentNode?.parent){
                    currentNode.parent = new Node({value: lexeme, leftChild: currentNode, priority: pr});
                    currentNode = currentNode.parent;
                }else{
                    do{
                        currentNode = currentNode.parent;
                    }while(currentNode?.priority >= pr && currentNode?.parent);

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
            }
        }

        //get the root of the tree
        while(currentNode?.parent){
            currentNode = currentNode.parent;
        }

        return currentNode;
    }

    function syntaxTreeCalculate(syntaxTreeNode){
        //if the node is operation
        if(syntaxTreeNode.leftChild && syntaxTreeNode.rightChild){
            const fn = operators[syntaxTreeNode.value].fn;
            return fn(syntaxTreeCalculate(syntaxTreeNode.leftChild), syntaxTreeCalculate(syntaxTreeNode.rightChild));
        }
        //if the node is number
        return syntaxTreeNode.value;
    }

    return calculatedResult;
}