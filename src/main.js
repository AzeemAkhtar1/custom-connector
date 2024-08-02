// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/Vuetify' // Import from a separate plugin file

createApp(App).use(vuetify).mount('#app')

 