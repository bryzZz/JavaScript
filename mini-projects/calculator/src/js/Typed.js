export default class Typed{
    constructor(element, messege, speed){
        if(typeof element === 'string'){
            this.element = document.querySelector(element);
        }else{
            this.element = element;
        }
        this.messege = messege;
        this.speed = speed;
        this.speedMs = this.speed / this.messege.length;

        this.start();
    }

    start(){
        this.currentSymbolCounter = 0;
        
        this.element.textContent = '|';

        this.interval = setInterval(this.step.bind(this), this.speedMs);
    }

    step(){
        if(this.currentSymbolCounter === 0){
            this.element.textContent = this.messege[0] + '|';
        }else{
            this.element.textContent = this.element.textContent.slice(0, this.element.textContent.length - 1);
            this.element.textContent += this.messege[this.currentSymbolCounter] + '|';
        }

        this.currentSymbolCounter++;

        if(this.currentSymbolCounter === this.messege.length){
            this.element.textContent = this.element.textContent.slice(0, this.element.textContent.length - 1);
            clearInterval(this.interval);
        }
    }
}