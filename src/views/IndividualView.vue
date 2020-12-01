<template>
    <div>
        <div class="mb-8 justify-center">
        <!-- <img
            class="h-32 w-32 mx-auto"
            :src="selectedItem.logos[0] ? selectedItem.logos[0] : 'https://via.placeholder.com/300'"
          />-->
          <div class="text-gray-900 font-bold text-xl mb-2 mt-4">{{ selectedItem.id }}</div>
            <div class="text-gray-700 text-base">
              <p class="font-mono">Mascota: {{ selectedItem.mascot ? selectedItem.mascot : 'No hay mascota asignada' }} </p>
              <p class="font-mono">Equipo: {{ selectedItem.school ? selectedItem.school : 'No hay equipo asignado'}} </p>
              <p class="font-mono">Abreviacion: {{ selectedItem.abbreviation ? selectedItem.abbreviation : 'No hay abreviacion asignada' }} </p>
              <p class="font-mono">Nombres alternativos: {{ selectedItem.alt_name1 }} {{ selectedItem.alt_name2 }} {{ selectedItem.alt_name3 }}</p>
              <p class="font-mono">Conferencia: {{ selectedItem.conference ? selectedItem.conference : 'No hay conferencia asignada' }} </p>
              <p class="font-mono">Division: {{ selectedItem.division ? selectedItem.division : 'No hay division asignada' }}  </p>
              <div class="flex block justify-center font-mono">Colores:
                <p class="h-4 w-4 rounded-full mt-1 ml-1 border-2 border-gray-900" v-bind:style="{ backgroundColor: equipo.color ? equipo.color : defaultColor }"></p>
                <p class="h-4 w-4 rounded-full mt-1 ml-1 border-2 border-gray-900" v-bind:style="{ backgroundColor: equipo.alt_color ? equipo.alt_color : defaultColor}"></p>
              </div>
            </div>            
        </div>
    </div>
</template>

<script>
export default {
  props: { 
    equipo: Object,
    selectedItem: Object
  },
data() {
  return {
      defaultColor: 'transparent', 
    }
  },
}
</script>