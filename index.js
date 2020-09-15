var vm = new Vue({
  el: "#timer",

  data: {
    time: 0,
    hasStarted: false,
    minutes: 0,
    seconds: 0,
    timer: null,
    presetTimers: [10, 15, 40, 25, 55],
  },

  methods: {
    setTime(minutes) {
      this.time = minutes * 60;
    },
    saveTimer: function () {
      this.presetTimers.push(parseInt(this.minutes));
    },
    clearTimer: function () {
      this.minutes = "";
    },
    startTimer: function () {
      this.hasStarted = true;

      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.time--;
          } else {
            clearInterval(this.timer);
            this.resetTimer();
          }
        }, 1000);
      }
    },
    stopTimer: function () {
      this.hasStarted = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    resetTimer: function () {
      this.stopTimer();

      this.minutes = 0;
      this.seconds = 0;
      this.time = 0;
    },
  },

  computed: {
    orderedTimers() {
      return this.presetTimers.sort((a, b) => a - b);
    },
    formattedTime() {
      let time = this.time / 60;
      let minutes = parseInt(time);
      let seconds = Math.round((time - minutes) * 60);

      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      return minutes + ":" + seconds;
    },
  },
});
