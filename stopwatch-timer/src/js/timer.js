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

function startStopBtnClick() {}

function resetClick() {
  timeBar.querySelectorAll("input").forEach((item) => {
    item.value = "00";
  });

  reset.removeEventListener("click", resetClick);
  reset.classList.remove("active");
}
