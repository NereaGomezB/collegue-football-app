import Vue from 'vue'
import VueRouter from 'vue-router'
import Equipos from "../components/Equipos.vue";
import IndividualView from "../views/IndividualView.vue"; 

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'equipos',
        Component: Equipos
    },
    {
        path: '/team/:id',
        name: 'IndividualView',
        props: true,
        Component: IndividualView
    }
  ]
  
  export const router = new VueRouter({
    base: 'public', 
    //mode: 'history',
    routes
})


 
