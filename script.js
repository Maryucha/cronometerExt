let intervalId;
let running = false;
let time = 0;
let initialTime = 180;

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  const hours = Math.floor(time / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (!running) {
    intervalId = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimerDisplay();
      } else {
        clearInterval(intervalId);
        running = false;
        document.getElementById("start").textContent = "Iniciar";
      }
    }, 1000);
    running = true;
    document.getElementById("start").textContent = "Pausar";
  } else {
    clearInterval(intervalId);
    running = false;
    document.getElementById("start").textContent = "Iniciar";
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  running = false;
  document.getElementById("start").textContent = "Iniciar";
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function resetTimer() {
  clearInterval(intervalId);
  running = false;
  initialTime = parseInt(document.getElementById("initialTime").value, 10);
  time = initialTime;
  updateTimerDisplay();
  document.getElementById("start").textContent = "Iniciar";
}

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the elements
  const editTimeButton = document.getElementById("editTime");
  const popup = document.getElementById("timePopup");
  const popupInput = document.getElementById("popupInput");
  const popupSaveButton = document.getElementById("popupSave");

  // Open the time configuration popup
  editTimeButton.addEventListener("click", function () {
    popup.style.display = "block";
    popupInput.value = document.getElementById("initialTime").value;
  });

  // Save the new time and close the popup
  popupSaveButton.addEventListener("click", function () {
    const newTime = parseInt(popupInput.value, 10);
    if (!isNaN(newTime) && newTime >= 1) {
      document.getElementById("initialTime").value = newTime;
      document.getElementById("timer").textContent = formatTime(newTime);
    }
    popup.style.display = "none";
  });

  // Attach event listeners to control buttons
  document.getElementById("start").addEventListener("click", startTimer);
  document.getElementById("pause").addEventListener("click", pauseTimer);
  document.getElementById("reset").addEventListener("click", resetTimer);

  // Call this to initialize the timer display
  updateTimerDisplay();
});