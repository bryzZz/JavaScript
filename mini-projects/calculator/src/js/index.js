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
    if(e.target.dataset.option === "clear"){
        expression = '';
        showLine.textContent = '0';
        return;
    }

    if(showLine.textContent.trim() === '0'){
        expression = e.target.dataset.value;
        showLine.textContent = e.target.textContent;
    }else{
        expression += e.target.dataset.value;
        showLine.textContent += e.target.textContent;
    }
});

function calculate(strExpression){
    // strExpression = '1+(2-3)*4*5+6*7';
    // strExpression = '2.2 ^ 3 + 2 * 2 ^ 3';

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
            if(s in operators){
                lexemes.push(s);
            }else if(s === '('){
                let blockInBrackets = [];
                i++;
                while(strExpression[i] !== ')'){
                    blockInBrackets.push(strExpression[i]);
                    i++;
                }
                lexemes.push(blockInBrackets);
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

    console.log('expression:', strExpression);
    console.log('lexemes:', lexemes);
    console.log('syntaxTree:', syntaxTree);
    console.log('result:', calculatedResult);
}