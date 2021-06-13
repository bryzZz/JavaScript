export default class Stopwatch {
  constructor({ parentSelector }) {
    this._parentSelector = parentSelector;

    this.render();
    this.setLogic();
  }

  render() {
    document.querySelector(this._parentSelector).innerHTML += `
        <div class="stopwatch">
          <div class="stopwatch__time-bar">00:00.00</div>
          <div class="stopwatch__control">
            <svg class="stopwatch__control-reset" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
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
            <button class="stopwatch__control-start-stop-btn">start</button>
            <svg class="stopwatch__control-interval-setter" height="512pt" viewBox="-40 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
              <path d="m382.867188 157.378906 20.074218-20.074218c7.800782-7.800782 7.800782-20.449219 0-28.246094-7.800781-7.800782-20.445312-7.800782-28.246094 0l-20.074218 20.074218c-33.679688-28.0625-74.605469-45.015624-118.261719-48.984374v-40.199219h19.308594c11.03125 0 19.972656-8.945313 19.972656-19.976563s-8.941406-19.972656-19.972656-19.972656h-78.566407c-11.03125 0-19.972656 8.941406-19.972656 19.972656s8.941406 19.976563 19.972656 19.976563h19.308594v40.199219c-109.28125 9.9375-196.410156 101.742187-196.410156 215.464843 0 119.59375 96.777344 216.386719 216.386719 216.386719 119.589843 0 216.382812-96.777344 216.382812-216.386719 0-51.085937-17.59375-99.464843-49.902343-138.234375zm-166.484376 314.671875c-97.285156 0-176.4375-79.148437-176.4375-176.4375 0-97.285156 79.152344-176.433593 176.4375-176.433593 97.289063 0 176.4375 79.148437 176.4375 176.433593 0 97.289063-79.148437 176.4375-176.4375 176.4375zm92.566407-269c7.800781 7.800781 7.800781 20.449219 0 28.246094l-78.441407 78.441406c-7.800781 7.800781-20.449218 7.800781-28.246093 0-7.800781-7.800781-7.800781-20.449219 0-28.246093l78.4375-78.441407c7.800781-7.800781 20.449219-7.800781 28.25 0zm0 0"/>
            </svg>
          </div>
          <div class="stopwatch__sections-container"></div>
        </div>
      `;
  }

  setLogic() {
    const startStopBtn = document.querySelector(
        ".stopwatch__control-start-stop-btn"
      ),
      reset = document.querySelector(".stopwatch__control-reset"),
      stopwatch = document.querySelector(".stopwatch__control-interval-setter"),
      time = document.querySelector(".stopwatch__time-bar");

    let milliSeconds = 0,
      interval,
      sectionCounter = 1;

    const css = (el, style) => Object.assign(el.style, style);
    function wow() {
      stopwatchClick(sectionCounter, transformMilliSeconds(milliSeconds));
    }

    startStopBtn.addEventListener("click", (event) => {
      if (event.target.textContent === "start") {
        interval = setInterval(() => {
          renderTime(++milliSeconds);
        }, 10);

        stopwatch.addEventListener("click", wow);
        css(stopwatch, { fill: "#000", cursor: "pointer" });

        event.target.textContent = "stop";
        css(event.target, { color: "red" });
      } else {
        clearInterval(interval);

        reset.addEventListener("click", resetClick);
        css(reset, { fill: "#000", cursor: "pointer" });

        stopwatch.removeEventListener("click", wow);
        css(stopwatch, { fill: "rgba(0, 0, 0, .2)", cursor: "auto" });

        event.target.textContent = "start";
        css(event.target, { color: "#000" });
      }
    });

    function stopwatchClick(sectionCounter1, t) {
      document.querySelector(".stopwatch__sections-container").innerHTML += `
          <div class="section">
            <h3 class="section__title">Section ${sectionCounter1}</h3>
            <p class="section__time">${t.minutes}:${t.seconds}:${t.milliSeconds}</p>
          </div>
        `;

      sectionCounter++;
    }

    function resetClick(event) {
      milliSeconds = 0;
      renderTime(milliSeconds);

      document.querySelector(".stopwatch__sections-container").innerHTML = "";
      sectionCounter = 1;

      css(reset, { fill: "rgba(0, 0, 0, .2)", cursor: "auto" });
      reset.removeEventListener("click", resetClick);
    }

    function renderTime(milliSeconds) {
      const t = transformMilliSeconds(milliSeconds);

      time.textContent = `${t.minutes}:${t.seconds}.${t.milliSeconds}`;
    }

    function transformMilliSeconds(milliSeconds) {
      let minutes = Math.floor(milliSeconds / 6000),
        seconds = Math.floor(milliSeconds / 100) - minutes * 60;

      milliSeconds = milliSeconds - seconds * 100 - minutes * 6000;

      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;
      if (milliSeconds < 10) milliSeconds = `0${milliSeconds}`;

      return { minutes, seconds, milliSeconds };
    }
  }
}