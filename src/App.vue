<script>  
import Equipos from './components/Equipos.vue'
  export default {    
  name: 'App',    
    components: {      
    Equipos,
    }  
  }  
</script>

<template>    
 <div id="app">
    <router-view/>
    <Equipos />
  </div>  
</template>

<style lang="scss">
  @import "./styles.scss"; 
</style>