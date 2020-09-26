let PresetTimers = {
  /* html */
  template: `
    <ul v-if="!time">
      <button @click="$emit('select', minutes)" v-for="minutes in orderedTimers">
        <span>{{ minutes }}</span>
      </button>
    </ul>
  `,

  data() {
    return {};
  },

  props: {
    time: Number,
    presetTimers: Array,
  },

  computed: {
    orderedTimers() {
      return this.presetTimers.sort((a, b) => a - b);
    },
  },
};

let ControlButtons = {
  /* html */
  template: `
    <div v-show="time" class="buttons-container">
      <button
        class="btn btn-primary"
        @click="$emit('start-timer')"
        :disabled="hasStarted"
      >
        Start
      </button>

      <button
        class="btn btn-primary"
        @click="$emit('stop-timer')"
        :disabled="!hasStarted"
      >
        Pause
      </button>

      <button class="btn btn-cancel" @click="$emit('reset-timer')">Reset</button>
    </div>
  `,

  props: {
    time: Number,
    hasStarted: Boolean,
    minutes: Number,
  },
};

var vm = new Vue({
  el: "#timer",

  /* html */
  template: `
    <div class="container">
      <div class="clock-container">
        <h1 v-if="!time">{{ minutes || 'Insert the minutes' }}</h1>
        <h1 v-else class="big">{{ formattedTime }}</h1>

        <div v-show="!time">
          <input
            type="number"
            placeholder="0"
            v-model="minutes"
            v-on:keyup.enter="setTime(minutes)"
            min="0"
            max="600"
          />

          <button
            class="btn btn-primary"
            @click="setTime(minutes)"
            :disabled="!minutes"
          >
            Start
          </button>

          <button
            class="btn btn-primary"
            @click="saveTimer"
            :disabled="!minutes"
          >
            Save minutes
          </button>

          <button
            class="btn btn-cancel"
            v-on:click="clearTimer"
            :disabled="!minutes"
          >
            Clear
          </button>
        </div>

       
      </div>

      <control-buttons :time="time" :hasStarted="hasStarted" :minutes="parseInt(minutes)"  @start-timer="startTimer" @stop-timer="stopTimer" @reset-timer="resetTimer"></control-buttons>

      <preset-timers :time="time" @select="setTime" :presetTimers="presetTimers"></preset-timers>
    </div>
  `,

  components: {
    "preset-timers": PresetTimers,
    "control-buttons": ControlButtons,
  },

  data: function () {
    return {
      time: 0,
      hasStarted: false,
      minutes: 0,
      seconds: 0,
      timer: null,
      presetTimers: [10, 15, 40, 25, 55],
      sound: new Audio("/alarm.mp3"),
    };
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
            this.sound.play();
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
