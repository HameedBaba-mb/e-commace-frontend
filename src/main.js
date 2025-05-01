import { createApp } from "vue";
import router from "./router";
import store from "./store/index.js";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.min.css";
// main.js or main.ts
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import $ from "jquery";
window.$ = window.jQuery = $;

import "./assets/libs/jquery/dist/jquery.min.js";
import "./assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/js/sidebarmenu.js";

import axios from "axios";
window.axios = axios;

import { Form, Field, ErrorMessage } from "vee-validate";
import mixins from "./services/mixins"

const vuewApp = createApp(App);

vuewApp.component("vee-form", Form, { classes: true });
vuewApp.component("vee-field", Field, { classes: true });
vuewApp.component("vee-error-message", ErrorMessage, { classes: true });

vuewApp.use(store);
vuewApp.mixin(mixins);
vuewApp.use(router);
vuewApp.mount("#app");
