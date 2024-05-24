<script setup>
import { onMounted, ref } from "vue";
import VideoListTable from "@/components/VideoListTable.vue";
import { HTTP } from "@/plugins/axios";

/* Variables */
const videoList = ref([]);
const loading = ref(false);

/* Funciones */
onMounted(() => {
  getVideoList();
});
const getVideoList = async () => {
  try {
    loading.value = true;
    const response = await HTTP.get("/video-upload");
    videoList.value = response.data.videos;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <v-card>
    <v-card-title>Lista de videos agregados</v-card-title>
    <v-card-text>
      <VideoListTable
        :items="videoList"
        :loading="loading"
        @getVideoList="getVideoList"
      />
    </v-card-text>
  </v-card>
</template>
