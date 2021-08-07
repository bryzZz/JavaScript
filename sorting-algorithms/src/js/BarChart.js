export default class BarChart{
    constructor(
        canvas,
        {
            data,
            options: {
                canvasWidth = 800,
                canvasHeight = 300,
                dpi = 2,
                rowsCount = 5
            } = {}
        }
    ){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.data = data;

        this.WIDTH = canvasWidth;
        this.HEIGHT = canvasHeight;
        this.DPI_WIDTH = this.WIDTH * dpi;
        this.DPI_HEIGHT = this.HEIGHT * dpi;
        this.ROWS_COUNT = rowsCount;
        this.PADDING = 40;
        this.VIEW_HEIGHT = this.DPI_HEIGHT - this.PADDING * 2;
        this.VIEW_WIDTH = this.DPI_WIDTH - this.PADDING * 2;

        this.values = this.data.map((item) => item.value);
        [this.minValue, this.maxValue] = this.computeBoundaries(this.values);
        this.deltaY = this.maxValue - this.minValue;

        this.yRatio = this.VIEW_HEIGHT / (this.maxValue - this.minValue);

        this.barsData = [];

        canvas.style.width = this.WIDTH + 'px';
        canvas.style.height = this.HEIGHT + 'px';

        canvas.width = this.DPI_WIDTH;
        canvas.height = this.DPI_HEIGHT;

        // this.yAxesRender();
        this.barsRender();
    }

    yAxesRender(){
        const step = this.VIEW_HEIGHT / this.ROWS_COUNT;
        const textStep = this.deltaY / this.ROWS_COUNT;

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#bbb'; // цвет линии
        this.ctx.font = 'normal 20px Helvetica, sans-serif'; // шрифт
        this.ctx.fillStyle = '#96a2aa'; // цвет шрифта
        for(let i = 1; i <= this.ROWS_COUNT; i++){
            const y = step * i;
            const text = this.maxValue - textStep * i;
            this.ctx.fillText(Math.round(text), 5, y + this.PADDING - 10);
            this.ctx.moveTo(0, y + this.PADDING);
            this.ctx.lineTo(this.DPI_WIDTH, y + this.PADDING);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }

    barsRender(){
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.PADDING_BARS = 2;

        this.ctx.beginPath();

        for(let i = 0; i < this.data.length; i++){
            const y = this.DPI_HEIGHT - this.PADDING - this.data[i].value * this.yRatio;
            const barHeight = this.data[i].value * this.yRatio + this.PADDING;

            const barWidth = (this.VIEW_WIDTH - this.PADDING_BARS * (this.data.length - 1)) / this.data.length;
            let x = this.PADDING + barWidth * i;
            if(i !== 0) x += this.PADDING_BARS * i;

            this.ctx.fillStyle = this.data[i].color;
            this.ctx.fillRect(x, y, barWidth, barHeight);

            this.barsData.push({index: i, x, y, barWidth, barHeight});
        }
        this.ctx.stroke();
        this.ctx.closePath();

        // console.log(this.barsData);
        // let n = 3;
        // this.ctx.clearRect(this.barsData[n].x, this.barsData[n].y - 1, this.barsData[n].barWidth + 1, this.barsData[n].barHeight + 1);
        // this.ctx.beginPath();
        // this.ctx.fillStyle = 'tomato';
        // this.ctx.fillRect(this.barsData[n].x, this.barsData[n].y, this.barsData[n].barWidth, this.barsData[n].barHeight);
        // this.ctx.stroke();
        // this.ctx.closePath();
        // n = 5;
        // this.ctx.clearRect(this.barsData[n].x - 1, this.barsData[n].y - 1, this.barsData[n].barWidth + 2, this.barsData[n].barHeight + 1);
        // this.ctx.beginPath();
        // this.ctx.fillStyle = 'tomato';
        // this.ctx.fillRect(this.barsData[n].x, this.barsData[n].y, this.barsData[n].barWidth, this.barsData[n].barHeight);
        // this.ctx.stroke();
        // this.ctx.closePath();
    }

    swap(arr){
        for(const pair of arr){
            this.ctx.clearRect(this.barsData[pair[0]].x, this.barsData[pair[0]].y - 1, this.barsData[pair[0]].barWidth + 1, this.barsData[pair[0]].barHeight + 1);
            this.ctx.clearRect(this.barsData[pair[1]].x, this.barsData[pair[1]].y - 1, this.barsData[pair[1]].barWidth + 1, this.barsData[pair[1]].barHeight + 1);

            this.ctx.beginPath();
            this.ctx.fillStyle = this.data[pair[0]].color;
            this.ctx.fillRect(this.barsData[pair[0]].x, this.barsData[pair[1]].y, this.barsData[pair[1]].barWidth, this.barsData[pair[1]].barHeight);
            this.ctx.fillRect(this.barsData[pair[1]].x, this.barsData[pair[0]].y, this.barsData[pair[0]].barWidth, this.barsData[pair[0]].barHeight);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    computeBoundaries(data){
        let min, max;

        for(const value of data){
            if(typeof min !== 'number') min = value;
            if(typeof max !== 'number') max = value;

            if(min > value) min = value;
            if(max < value) max = value;
        }

        return [min, max];
    }
}