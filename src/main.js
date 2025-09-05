import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import vuetify from './plugins/vuetify';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify).mount('#app');