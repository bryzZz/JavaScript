export default class BarChart{
    constructor(
        canvas,
        {
            data,
            options: {
                canvasWidth = 600,
                canvasHeight = 200,
                dpi = 2,
                rowsCount = 5
            } = {}
        }
    ){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        // this.values = [100, 200, 300, 400, 500, 600, 100, 800, 900, 1000];
        // this.data = this.data.map((item, index) => item.value = this.values[index]);
        [this.minValue, this.maxValue] = this.computeBoundaries(this.values);
        this.deltaY = this.maxValue - this.minValue;

        this.yRatio = this.VIEW_HEIGHT / (this.maxValue - this.minValue);

        // console.log('vh =', this.VIEW_HEIGHT);
        // console.log('yRatio =', this.yRatio);
        // console.log('deltaY =', this.deltaY);
        // console.log('values =', this.values);

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
        this.PADDING_BARS = 10;

        this.ctx.beginPath();

        for(let i = 0; i < this.data.length; i++){
            const y = this.DPI_HEIGHT - this.PADDING - this.data[i].value * this.yRatio;
            const barHeight = this.data[i].value * this.yRatio + this.PADDING;

            const barWidth = (this.VIEW_WIDTH - this.PADDING_BARS * (this.data.length - 1)) / this.data.length;
            let x = this.PADDING + barWidth * i;
            if(i !== 0) x += this.PADDING_BARS * i;

            // console.log(i, 'y =', y, 'x =', x, 'barWidth =', barWidth, 'barHeight =', barHeight);

            this.ctx.fillStyle = this.data[i].color;
            this.ctx.fillRect(x, y, barWidth, barHeight);
        }

        // this.ctx.fillStyle = 'tomato';
        // this.ctx.fillRect(this.PADDING, 300, 10, 100);
        // this.ctx.fillRect(this.PADDING + this.VIEW_WIDTH - 10, 300, 10, 100);

        this.ctx.stroke();
        this.ctx.closePath();
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