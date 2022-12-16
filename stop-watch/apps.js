const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
const clearBtn = document.querySelector(".clear");
const time = document.querySelector("ul");
let hr = (min = sec = cs = "00");
let timer = false;

//implemented timer variable, so second timer would not start running
//setInterval() sets speed
//count cs up
//if cs < 10, put 0 in front of counter
//at 100, increase sec and set cs back to 00
//calling counter to update value in HTML

start = () => {
  startBtn.classList.add("active");
  stopBtn.classList.remove("active");
  if (!timer) {
    timer = true;
    timerObj = setInterval(() => {
      cs++;
      cs = cs < 10 ? "0" + cs : cs;

      if (cs == 100) {
        sec++;
        sec = sec < 10 ? "0" + sec : sec;
        cs = "00";
      } else if (sec == 60) {
        min++;
        min = min < 10 ? "0" + min : min;
        sec = "00";
      } else if (min == 60) {
        hr++;
        hr = hr < 10 ? "0" + hr : hr;
        min = "00";
      }
      counter();
    }, 10); // 1000ms = 1s
  }
};

stopp = () => {
  startBtn.classList.remove("active");
  stopBtn.classList.add("active");
  clearInterval(timerObj);
  timer = false;
};

reset = () => {
  startBtn.classList.remove("active");
  stopBtn.classList.remove("active");
  clearInterval(timerObj);
  let hr = (min = sec = cs = "00");
  timer = false;
  counter();
};

counter = () => {
  document.querySelector(".csecond").innerText = cs;
  document.querySelector(".second").innerText = sec;
  document.querySelector(".minute").innerText = min;
  document.querySelector(".hour").innerText = hr;
};


//create li element, with current hr, min, sec, cs values
//apend to ul
//set local Storage accoring to li.innerHTML

lap = () => {
  let laps = document.createElement("li");
  laps.textContent = `${hr}:${min}:${sec}:${cs}`;
  time.appendChild(laps);
  addLocalStorage("laps", laps.textContent);
};

//when page is loaded check for local Storage
//get item from local storage and save in saved

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.length > 0) {
    const storage = JSON.parse(localStorage.getItem("laps"));
    displayLocalStorage(storage);
  }
});

//setting local storage 
// storage is either local Storage or []
//push data (laps.textContent)
//set local Storage with key "laps" to storage

addLocalStorage = (key, data) => {
  const storage = JSON.parse(localStorage.getItem(key)) || [];
  storage.push(data);
  localStorage.setItem(key, JSON.stringify(storage));
};

//displying local storage
//iterating through it and creating li element for every element in local storage

displayLocalStorage = (storage) => {
  for (let i = 0; i < storage.length; i++) {
    let laps = document.createElement("li");
    laps.textContent = storage[i];
    time.appendChild(laps);
  }
};


clear = () => {
  time.textContent = "";
  localStorage.clear();
};

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stopp);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
clearBtn.addEventListener("click", clear);
