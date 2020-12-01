
<script>
import IndividualView from '../views/IndividualView.vue'
import axios from 'axios';
export default {
  name: 'Equipos',
  data() {
    return {
      defaultColor: 'transparent',
      search: '',
      equipos: this.equipos,
      selectedItem: {}
    };
  },
  components: {
    IndividualView
  },
  created() {
    this.getAllTeams();
  },
  methods: {
    favouriteStore() {
      localStorage.getItem('favourites') || []
      var storage = JSON.parse(localStorage['favourites']);
      storage.forEach(function(favorite) {
      document.getElementById(favorite).classList.add('fav');
    });
    },
    async getAllTeams() {
       await axios({
        method: 'get',
        url: 'https://api.collegefootballdata.com/teams'
        }).then(response => {
            if (this.search) {
              this.equipos = response.data.filter(equipo =>
                equipo.school.toLowerCase().includes(this.search.toLowerCase())
              );
            } else {
              this.equipos = response.data;
            }
        }).catch((error) => {
            console.log(error)
        })
        this.favouriteStore();
      },
     singleTeam(index) {
      document.getElementById('myModal').showModal()
      this.selectedItem = this.equipos[index];
    },
    onCloseModal(){
      document.getElementById('myModal').close();
    },
    handleImgError(evt) {
      evt.target.src = "https://via.placeholder.com/300"
    },
    getLogoUrl(logos) {
      let imageExists = require('image-exists');
      var src = logos[0];
      
      imageExists(src, function(exists) {
        if (exists) {
          src = logos[0];
        }
        else {
          src = logos[1]
        }
      })
      return src     
    },
    setFavorite(equipo){
    if(localStorage.getItem('favourites')){
        var storage = JSON.parse(localStorage['favourites']);
        for (var i = 0; i <= storage.length;i++){
          if (storage.indexOf(equipo.id) == -1) { 
            storage.push(equipo.id);
            document.getElementById(equipo.id).classList.add('fav');
            localStorage.setItem('favourites', JSON.stringify(storage));
          } else {
              document.getElementById(equipo.id).classList.add('fav');
          }
        }        
      }
      else
      {
        var favArray= [];
        favArray.push(equipo.id);
        document.getElementById(equipo.id).classList.add('fav');
        localStorage.setItem("favourites", JSON.stringify(favArray));
      }

    /** TODO: REMOVE FROM LS 
        storage.splice(index, 1);
        document.getElementById(equipo.id).classList.remove("fav");
        localStorage.setItem('favourites', JSON.stringify(storage));
      **/
    },
  }
}
</script>

<template>
  <div class="container">
    <h1 class="text-2xl font-bold">College football data</h1>
    <div class="justify-center flex wx-30 mt-8">
      <input 
        class="rounded p-2" 
        type="text"
        v-model.trim="search"
        placeholder="Search team by name..."
        @keyup="getAllTeams" />
      <button
        class="bg-grey-500 rounded w-auto flex justify-end items-center p-2 hover:text-blue-light">
        <i class="fas fa-search text-red-500"></i>
      </button>
    </div>

    <div class="flex flex-wrap justify-center mt-10">
      <div
        class="w-56 h-auto shadow-sm block bg-gray-300 rounded-lg m-4"
        v-for="(equipo, index) in equipos"
        :value="equipo.id"
        :key="index">
        <div class="px-2 py-2">
          <ul class="list">
            <li 
              class="absolute heart "
              @click="setFavorite(equipo)"                  
              :id="equipo.id">
              <i class="fas fa-heart fav-icon"></i>
            </li>
          </ul>
          <div v-if="equipo.logos">
            <img class="h-16 w-16 rounded-full mx-auto" 
            :src="getLogoUrl(equipo.logos)" @error="handleImgError"/>
          </div>
          <div v-else>
            <img class="h-16 w-16 rounded-full mx-auto" src='https://via.placeholder.com/300'/>
          </div>
          <h4 class="font-bold text-grey-700 text-lg mb-2">{{ equipo.school }}</h4>
          <h4 class="font-bold text-grey-700 text-lg mb-2">{{ equipo.abbreviation }}</h4>
          <p class="text-gray-700 text-base">Mascota: {{ equipo.mascot ? equipo.mascot : 'No hay mascota' }}</p>
          <div class="flex block justify-center">
          <p class="">Colores:</p>
          <div class="h-4 w-4 rounded-full mt-1 ml-1 border-2 border-gray-900" v-bind:style="{ backgroundColor: equipo.color ? equipo.color : defaultColor }"></div>
          <div class="h-4 w-4 rounded-full mt-1 ml-1 border-2 border-gray-900" v-bind:style="{ backgroundColor: equipo.alt_color ? equipo.alt_color : defaultColor}"></div>
          </div>
           <button 
            @click="singleTeam(index)"
            v-bind:value="equipo.id" 
            id="btn" 
            class="py-3 px-10 bg-gray-800 text-white rounded text shadow-xl">
            Saber más
           </button>
          <dialog id="myModal" class="h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md ">   
            <div class="flex flex-col w-full h-auto ">
              <!-- Header -->
              <div class="flex w-full h-auto justify-end">
                <div
                  @click="onCloseModal()" 
                  class="flex w-1/12 h-auto justify-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <!--Header End-->
              </div>
                <!-- Modal Content-->
                <div class="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500">
                  <IndividualView
                  v-bind:equipo="equipo"
                  :selectedItem=selectedItem>
                  </IndividualView>
                </div>
                <!-- End of Modal Content-->
              </div>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>

