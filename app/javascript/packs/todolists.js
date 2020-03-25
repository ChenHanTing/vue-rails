import Vue from "vue";
import App from "../components/todolists.vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

document.addEventListener("DOMContentLoaded", () => {
  Vue.http.headers.common["X-CSRF-Token"] = document
    .getElementsByName("csrf-token")[0]
    .getAttribute("content");
  const el = "#todolists";
  const app = new Vue({
    el,
    render: h => h(App)
  });
});
