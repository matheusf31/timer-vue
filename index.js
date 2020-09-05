Vue.component("todo-item", {
  template: "<li>This is a todo</li>",
});

var app = new Vue({
  el: "#app",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString(),
    seen: false,
    todayLink: "https://google.com",
  },
  methods: {
    changeSeen() {
      this.seen = !this.seen;
    },
  },
});
