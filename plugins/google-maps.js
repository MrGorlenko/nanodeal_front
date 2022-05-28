import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyArhMIuLcirj3zOAmR7H0OaSlccM2HQiB8',
    libraries: 'places',
  },
})
