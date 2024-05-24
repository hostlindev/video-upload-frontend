<script setup>
import { ref } from "vue";
/* Variables */
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["getVideoList"]);
const search = ref("");
const headers = ref([
  {
    title: "Nombre",
    key: "full_name",
    align: "start",
    sortable: false,
  },
  {
    title: "Cédula",
    key: "dni",
    align: "start",
    sortable: false,
  },
  {
    title: "Fecha de subida",
    key: "created_at",
    align: "start",
    sortable: false,
  },
  {
    title: "Enlace",
    key: "url",
    align: "start",
    sortable: false,
  },
  {
    title: "Visualizar",
    key: "actions",
    align: "center",
    sortable: false,
  },
]);
const dialog = ref(false);
const selectedItem = ref({});

/* Funciones */
const refresh = () => {
  emit("getVideoList");
};

const openDialog = (item) => {
  selectedItem.value = item;
  dialog.value = true;
  // window.open(item.url, "_blank");
};

const closeDialog = () => {
  dialog.value = false;
};
</script>
<template>
  <v-row class="text-end">
    <v-col>
      <v-btn @click="refresh" variant="flat" color="primary"
        ><v-icon>mdi-refresh</v-icon> refrescar</v-btn
      >
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-filter"
        label="Buscar"
        placeholder="Filtrar datos"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-data-table
    :search="search"
    :loading="props.loading"
    :headers="headers"
    :items="props.items"
    density="compact"
    loading-text="Buscando lista de videos..."
    no-data-text="No hay datos"
    items-per-page-text="Videos por página"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip text="Ver video">
        <template v-slot:activator="{ props }">
          <v-btn icon variant="text" v-bind="props" @click="openDialog(item)">
            <v-icon>mdi-video-box</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </v-data-table>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="text-center"
        >{{ selectedItem?.full_name }} - {{ selectedItem?.dni }}</v-card-title
      >
      <v-card-text>
        <video
          v-if="selectedItem"
          :src="selectedItem.url"
          controls
          style="width: 100%"
        ></video>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeDialog" block color="red" variant="flat">cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
