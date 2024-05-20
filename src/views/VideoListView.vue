<script setup>
import { ref } from "vue";
import VideoListTable from "@/components/VideoListTable.vue";

/* Variables */
const videoList = ref([
  {
    name: "Fiscal Número 1",
    dni: "8-888-8888",
    createDate: "2024-10-1",
    link: "https://enlace.prueba.com/1asdsDSESe123242#?343433",
  },
  {
    name: "Fiscal Número 1",
    dni: "8-888-8888",
    createDate: "2024-10-1",
    link: "https://enlace.prueba.com/1asdsDSESe123242#?343433",
  },
  {
    name: "Fiscal Número 1",
    dni: "8-888-8888",
    createDate: "2024-10-1",
    link: "https://enlace.prueba.com/1asdsDSESe123242#?343433",
  },
  {
    name: "Fiscal Número 1",
    dni: "8-888-8888",
    createDate: "2024-10-1",
    link: "https://enlace.prueba.com/1asdsDSESe123242#?343433",
  },
  {
    name: "Fiscal Número 1",
    dni: "8-888-8888",
    createDate: "2024-10-1",
    link: "https://enlace.prueba.com/1asdsDSESe123242#?343433",
  },
]);

/* Funciones */
const getVideoList = () => {
  try {
    console.log("Entrar");
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <v-card>
    <v-card-title>Lista de videos agregados</v-card-title>
    <v-card-text>
      <VideoListTable :items="videoList" />
    </v-card-text>
  </v-card>
</template>
