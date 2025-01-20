class Timer {
  constructor(title, time) {
    this.title = title;
    this.time = time;
    this.timerElement = null;
    this.rawTime = null;
  }
  timer() {
    const timer = this.timerElement.children[1];
    const setTime = this.timerElement.children[2].innerText;
    const setTimeObject = new Date(setTime);
    this.rawTime = setTimeObject - Date.now();
  }
  oldTimer() {
    const containers = document.querySelectorAll(".timerContainers");
    const setTime = document.querySelectorAll(".setTime");
    const timers = document.querySelectorAll(".timers");

    const timeBuffer = [];
    setTime.forEach((time) => {
      timeBuffer.push(time.innerText);
    });
    console.log(timeBuffer);

    timeBuffer.forEach((time, i) => {
      const setDateObject = new Date(time);
      const rawTimeDifference = setDateObject - Date.now();
      const timeFormatted = UI.formatTime(rawTimeDifference);
      console.log(`timeDifference ${timeFormatted}`);
      UI.updateTimer(i, timers, timeFormatted);
    });
  }
}

class UI {
  constructor() {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    document.getElementById("date").valueAsDate = currentDate;

    this.timerInterval = null;
  }

  static addTimer(timer) {
    const timerList = document.getElementById("timerList");

    const newTimer = document.createElement("div");
    newTimer.className = "timerContainers";

    const timerTitle = document.createElement("h1");
    timerTitle.appendChild(document.createTextNode(timer.title));
    timerTitle.className = "titles";

    const timerTimer = document.createElement("h5");
    timerTimer.className = "timers";

    const timerTime = document.createElement("h6");
    timerTime.appendChild(document.createTextNode(timer.time));
    timerTime.className = "setTime";

    newTimer.appendChild(timerTitle);
    newTimer.appendChild(timerTimer);
    newTimer.appendChild(timerTime);
    timerList.appendChild(newTimer);
    timer.timerElement = newTimer;

    // if (!this.timerInterval)
    //   this.timerInterval = setInterval(() => this.timer(), 1000);
  }

  addDate(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").valueAsDate;
    const timerList = document.getElementById("timerList");

    const newTimer = document.createElement("div");
    newTimer.className = "timerContainers";

    const timerTitle = document.createElement("h1");
    timerTitle.appendChild(document.createTextNode(name));
    timerTitle.className = "titles";

    const timerTimer = document.createElement("h5");
    timerTimer.className = "timers";

    const timerTime = document.createElement("h6");
    timerTime.appendChild(document.createTextNode(date));
    timerTime.className = "setTime";

    newTimer.appendChild(timerTitle);
    newTimer.appendChild(timerTimer);
    newTimer.appendChild(timerTime);
    timerList.appendChild(newTimer);

    if (!this.timerInterval)
      this.timerInterval = setInterval(this.timer.bind(this), 1000);
  }

  static formatTime(rawTimeDifference) {
    const hours = Math.floor(rawTimeDifference / 3_600_000);
    rawTimeDifference %= 3_600_000;
    const minutes = Math.floor(rawTimeDifference / 60_000);
    rawTimeDifference %= 60_000;
    const seconds = Math.floor(rawTimeDifference / 1000);
    rawTimeDifference %= 1000;

    return `Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`;
  }

  static updateTimer(i, timers, timeFormatted) {
    timers[i].innerText = timeFormatted;
  }
  static updateTimers() {
    timers.forEach((timer) => {
      timer.timerElement.children[1].innerText = UI.formatTime(timer.rawTime);
    });
  }
}

const timers = [];

addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("name").value;
  const time = document.getElementById("date").valueAsDate;

  const timer = new Timer(title, time);
  timers.push(timer);
  UI.addTimer(timer);
  timer.timer();
  UI.updateTimers();
});
