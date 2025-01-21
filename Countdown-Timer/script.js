class Timer {
  static timers = [];
  static timerInterval = null;
  constructor(title, time) {
    this.title = title;
    this.time = time;
    this.timerElement = null;
    this.rawTime = null;

    setInterval(() => this.timer(), 1000);
  }
  timer() {
    const setTimeObject = new Date(this.time);
    this.rawTime = setTimeObject - Date.now();
  }
}

class UI {
  static {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    document.getElementById("date").valueAsDate = currentDate;
  }
  static loadTimers() {
    const timers = Store.getTimers();

    if (timers.length === 0) return;

    timers.forEach((timer) => {
      const timerObj = new Timer(timer.title, timer.time);
      UI.addTimer(timerObj);
    });
  }
  static addTimer(timer) {
    Timer.timers.push(timer);
    const timerList = document.getElementById("timerList");

    const newTimer = document.createElement("div");
    newTimer.className = "timerContainers";

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    deleteBtn.className = "btn btn-primary float-end delete";

    const timerTitle = document.createElement("h1");
    timerTitle.appendChild(document.createTextNode(timer.title));
    timerTitle.className = "titles";

    const timerTimer = document.createElement("h5");
    timerTimer.className = "timers";

    const timerTime = document.createElement("h6");
    const date = new Date(timer.time);
    const options = {
      dateStyle: "full",
      timeStyle: "long",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date,
    );
    timerTime.appendChild(document.createTextNode(formattedDate));
    timerTime.className = "setTime";

    newTimer.appendChild(deleteBtn);
    newTimer.appendChild(timerTitle);
    newTimer.appendChild(timerTimer);
    newTimer.appendChild(timerTime);
    timerList.appendChild(newTimer);
    timer.timerElement = timerTimer;
    if (!Timer.timerInterval)
      Timer.timerInterval = setInterval(UI.updateTimers, 1000);
  }

  static formatTime(rawTimeDifference) {
    const hours = Math.floor(rawTimeDifference / 3_600_000);
    rawTimeDifference %= 3_600_000;
    const minutes = Math.floor(rawTimeDifference / 60_000);
    rawTimeDifference %= 60_000;
    const seconds = Math.floor(rawTimeDifference / 1000);

    return `Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`;
  }

  static updateTimers() {
    Timer.timers.forEach((timer) => {
      timer.timerElement.innerText = UI.formatTime(timer.rawTime);
    });
  }

  static removeTimer(e) {
    if (!e.target.classList.contains("delete")) return;

    e.target.parentElement.remove();
    Timer.timers.forEach((timer, i) => {
      if (timer.title === e.target.nextSibling.innerText)
        Timer.timers.splice(i, 1);
    });

    // If there are no timers clear the interval
    if (Timer.timers.length === 0) {
      clearInterval(Timer.timerInterval);
      Timer.timerInterval = null;
    }
  }
  static showAlert(msg) {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const timerList = document.getElementById("timerList");
    container.insertBefore(div, timerList);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

class Store {
  static getTimers() {
    let timers;
    if (localStorage.getItem("timers") === null) timers = [];
    else timers = JSON.parse(localStorage.getItem("timers"));
    return timers;
  }
  static addTimer(timer) {
    const timers = Store.getTimers();
    const strippedTimer = {
      title: timer.title,
      time: timer.time,
    };
    timers.push(strippedTimer);
    localStorage.setItem("timers", JSON.stringify(timers));
  }
  static removeTimer(e) {
    if (!e.target.classList.contains("delete")) return;

    const timers = Store.getTimers();
    timers.forEach((timer, i) => {
      if (timer.title === e.target.nextSibling.innerText) timers.splice(i, 1);
    });
    localStorage.setItem("timers", JSON.stringify(timers));
  }
}

document.addEventListener("DOMContentLoaded", UI.loadTimers);

addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("name").value;
  const time = document.getElementById("date").value;
  if (title === "" || time === "") {
    UI.showAlert("Please fill in name and date.");
    return;
  }
  if (new Date(time) - Date.now() <= 0) {
    UI.showAlert("Not in the future.");
    return;
  }
  for (const timer of Store.getTimers()) {
    if (title === timer.title) {
      UI.showAlert("Cannot have duplicate titles.");
      return;
    }
  }

  const timer = new Timer(title, time);
  UI.addTimer(timer);
  Store.addTimer(timer);
  timer.timer();
  UI.updateTimers();
});

document.getElementById("timerList").addEventListener("click", UI.removeTimer);
document
  .getElementById("timerList")
  .addEventListener("click", Store.removeTimer);
