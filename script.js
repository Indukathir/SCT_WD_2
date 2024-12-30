let stopwatch = {
    startTime: 0,
    elapsedTime: 0,
    timerInterval: null,
    isRunning: false,
  
    start: function () {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(this.updateDisplay.bind(this), 10);
      this.isRunning = true;
      document.getElementById("stopBtn").disabled = false;
      document.getElementById("lapBtn").disabled = false;
    },
  
    stop: function () {
      clearInterval(this.timerInterval);
      this.elapsedTime = Date.now() - this.startTime;
      this.isRunning = false;
      document.getElementById("stopBtn").disabled = true;
      document.getElementById("lapBtn").disabled = true;
    },
  
    reset: function () {
      clearInterval(this.timerInterval);
      this.elapsedTime = 0;
      this.isRunning = false;
      document.getElementById("display").textContent = "00:00:00";
      document.getElementById("lapTimes").innerHTML = "";
      document.getElementById("stopBtn").disabled = true;
      document.getElementById("lapBtn").disabled = true;
    },
  
    lap: function () {
      if (this.isRunning) {
        const lapTime = this.formatTime(this.elapsedTime);
        const lapList = document.getElementById("lapTimes");
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
      }
    },
  
    updateDisplay: function () {
      const now = Date.now() - this.startTime;
      document.getElementById("display").textContent = this.formatTime(now);
      this.elapsedTime = now;
    },
  
    formatTime: function (ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const milliseconds = Math.floor((ms % 1000) / 10);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
    }
  };
  
  document.getElementById("startBtn").addEventListener("click", () => {
    if (!stopwatch.isRunning) {
      stopwatch.start();
    }
  });
  
  document.getElementById("stopBtn").addEventListener("click", () => {
    if (stopwatch.isRunning) {
      stopwatch.stop();
    }
  });
  
  document.getElementById("resetBtn").addEventListener("click", () => stopwatch.reset());
  
  document.getElementById("lapBtn").addEventListener("click", () => stopwatch.lap());