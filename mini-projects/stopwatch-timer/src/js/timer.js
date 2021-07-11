export default class Timer {
  constructor(parentSelector) {
    this._parentSelector = parentSelector;

    this.render();
    this.setLogic();
  }

  render() {
    document.querySelector(this._parentSelector).innerHTML += `
    <div class="timer">
    <div class="timer__time-bar">
        <input class="timer__time-bar-hours" type="number" value="00" data-max-value="99" />:
        <input class="timer__time-bar-minutes" type="number" value="00" data-max-value="59" />:
        <input class="timer__time-bar-seconds" type="number" value="00" data-max-value="59" />
    </div>
    <div class="timer__control">
        <svg class="timer__reset" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g>
            <g>
                <path d="M408.973,142.689C368.113,101.829,313.785,79.326,256,79.326h-31.717l50.907-51.032L246.826,0L147.68,99.389
                l97.852,99.488l28.563-28.093l-50.551-51.396H256c97.198,0,176.275,79.076,176.275,176.275S353.198,471.938,256,471.938
                S79.725,392.861,79.725,295.659v-20.031l-40.062,0.004v20.031c0,57.786,22.503,112.113,63.364,152.973
                C143.887,489.497,198.215,512,256,512c57.785,0,112.113-22.503,152.973-63.364c40.861-40.861,63.364-95.188,63.364-152.973
                S449.834,183.55,408.973,142.689z"/>
            </g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
        </svg>
        <button class="timer__start-stop">start</button>
    </div>
</div>
    `;
  }

  setLogic() {
    const timeBar = document.querySelector(".timer__time-bar"),
      startStopBtn = document.querySelector(".timer__start-stop"),
      reset = document.querySelector(".timer__reset");

    timeBar.addEventListener("click", (event) => {
      event.target.select();

      event.target.addEventListener("input", (event) => {
        if (event.target.value.length > 2) {
          event.target.value = event.target.value.substring(0, 2);
          event.target.selectionStart = event.target.value.length;
        }
        if (+event.target.value > +event.target.dataset.maxValue) {
          event.target.value = event.target.dataset.maxValue;
        }

        if (+event.target.value > 0) {
          startStopBtn.addEventListener("click", startStopBtnClick);
          reset.addEventListener("click", resetClick);

          startStopBtn.classList.add("active");
          reset.classList.add("active");
        }

        if (
          !Array.from(timeBar.querySelectorAll("input")).reduce(
            (accum, item) => accum + +item.value,
            0
          )
        ) {
          startStopBtn.removeEventListener("click", startStopBtnClick);
          startStopBtn.classList.remove("active");

          reset.removeEventListener("click", resetClick);
          reset.classList.remove("active");
        }
      });
    });

    function startStopBtnClick() {
      
    }

    function resetClick() {
      timeBar.querySelectorAll("input").forEach((item) => {
        item.value = "00";
      });

      reset.removeEventListener("click", resetClick);
      reset.classList.remove("active");
    }
  }
}
