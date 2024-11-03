function updateTime(format) {
  const currentTime = new Date();
  // const testTime = new Date("2022-01-01 0:00:00")
  let hours = currentTime.getHours();
  // let hours = 0
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  let AM_PM = "";
  // console.log(format)
  if (format === "12-hour") {
    if (hours >= 12 || hours === 0) {
      AM_PM = " PM";
      if (hours === 0) {
        hours = 12;
      }
      if (hours >= 13) {
        hours -= 12;
      }
    } else {
      AM_PM = " AM";
    }
  }
  document.getElementById("Clock").textContent =
    hours + ":" + minutes + ":" + seconds + AM_PM;
}

let format = "12-hour";
updateTime(format);
setInterval(() => updateTime(format), 1000);
const button = document.getElementById("button");
button.addEventListener("click", () => {
  switch (format) {
    case "12-hour":
      format = "24-hour";
      break;
    case "24-hour":
      format = "12-hour";
      break;
  }
  updateTime(format);
});
