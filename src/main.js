import Vue from 'vue'
import App from './App.vue'
import { router } from './router'

import "./styles.scss";
import "tailwindcss/tailwind.css"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"
import "@fortawesome/fontawesome-free/scss/brands.scss"
import "@fortawesome/fontawesome-free/scss/regular.scss"

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    data: {
      user: ''
    },
    beforeMount() { this.user = this.$el.dataset.user }
   }).$mount('#app')

//  }).$mount('#app')