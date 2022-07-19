const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
let hr = min = sec = ms = "0" + 0;

start = () => {
    startBtn.classList.add("active");
    stopBtn.classList.remove("stopActive");

    startTimer = setInterval(() => {
        ms++
        ms = ms < 10 ? "0" +ms : ms;

        if (ms == 100) {
            sec++;
            sec = sec < 10 ? "0" + sec : sec;
            ms = "0" + 0;
        }
        else  if (sec == 60) {
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        else  if (min == 60) {
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            min = "0" + 0;
        }
        counter();
    },10); // 1000ms = 1s
}

stopp = () => {
    startBtn.classList.remove("active");
    stopBtn.classList.add("stopActive");
    clearInterval(startTimer);
}

reset = () => {
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    let hr = min = sec = ms = "0" + 0;
    counter()
}

counter = () => {
    document.querySelector(".msecond").innerText = ms;
    document.querySelector(".second").innerText = sec;
    document.querySelector(".minute").innerText = min;
    document.querySelector(".hour").innerText = hr;
}


startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stopp);
resetBtn.addEventListener("click", reset);
// lapBtn.addEventListener("click", lap);