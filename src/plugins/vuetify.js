import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
            success:'#3cd1c2',
            primary:'#9652ff',
            info:'ffaa2c',
            error:'#f83e70'
        },

        dark:{
            success:'#3cd1c2',
            primary:'#AA00FF',
            info:'#ffaa2c',
            error:'#f83e70',
            // grey:'#000000' 

        }
      },
    },
  });
