import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  blueprint: md3,
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#6200EE',
          secondary: '#03DAC6',
          background: '#FFFFFF',
          accent: '#FFC107',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFA726',
        },
      },
    },
  },
  defaults: {
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      density: 'compact',
      prependInnerIcon: 'mdi-format-data',
    },
    VMenu: {
      transition: 'scale-transition',
      offsetY: true,
      minWidth: '290px',
      closeOnContentClick: false,
    },
    VBtn: {
      rounded: 'lg',
      elevation: 2,
      height: '60px',
      minWidth: '200px',
    },
    VDataTable: {
      class: 'elevation-1',
    },
  },
});

export default vuetify;