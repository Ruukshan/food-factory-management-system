import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#03DAC6',
          background: '#FFFFFF',
          accent: '#FFC107',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFA726',
          tableHeader: '#71d5e2ff',
          tableRow: '#F5F5F5',
        },
      },
    },
  },
  defaults: {
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
    VBtn: {
      rounded: 'lg',
      elevation: 2,
      height: '50px',
      minWidth: '200px',
    },
    VTable: {
      class: 'elevation-2 custom-table',
      style: {
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        border: '1px solid #FFFFFF',
        overflow: 'hidden',
      },
    },
    VCardTitle: {
      style: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        zIndex: 1,
        position: 'relative',
      },
    },
  },
});

export default vuetify;