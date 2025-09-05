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
          tableHeader: '#E0F7FA',
          tableRow: '#F5F5F5',
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
      minWidth: '100px',
      closeOnContentClick: false,
    },
    VBtn: {
      rounded: 'lg',
      elevation: 2,
      height: '50px',
      minWidth: '200px',
    },
    VDataTable: {
      class: 'elevation-2 custom-table',
      style: {
        backgroundColor: '#FFFFFF !important',
        border: '1px solid #6200EE !important',
        borderRadius: '4px !important',
        overflow: 'hidden !important',
      },
    },
    '.custom-table .v-data-table__thead th': {
      style: {
        fontWeight: 'bold !important' as const,
        color: '#6200EE !important',
        padding: '12px !important',
        backgroundColor: '#E0F7FA !important' as any,
      },
    },
    '.custom-table .v-data-table__tbody td': {
      style: {
        padding: '12px !important',
        borderBottom: '1px solid #E0E0E0 !important',
      },
    },
    VCardTitle: {
      style: {
        fontWeight: 'bold',
        color: '#6200EE',
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
      },
    },
    VDivider: {
      style: {
        height: '10px',
        backgroundColor: '#2196F3',
        marginBottom: '20px',
        borderRadius: '4px',
      },
    },
  },
});

export default vuetify;