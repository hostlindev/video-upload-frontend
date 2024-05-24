<script setup>
import { ref, reactive } from "vue";
import UploadForm from "@/components/upload/UploadForm.vue";
import ProgressBar from "../components/upload/ProgressBar.vue";
import SnackBar from "@/components/SnackBar.vue";
import { HTTP } from "@/plugins/axios";

/* Variables */
const videoData = reactive({
  dni: "",
  name: "",
  lastname: "",
  video: null,
});
const snackbar = reactive({
  text: "",
  timeout: null,
  color: "",
  show: false,
});
const link = ref("");
const uploadProgress = ref(null);
const disabled = ref(false);

/* Funciones */
const uploadFile = async () => {
  try {
    disabled.value = true;

    const formData = new FormData();
    formData.append("dni", videoData.dni);
    formData.append("name", videoData.name);
    formData.append("lastname", videoData.lastname);
    formData.append("video", videoData.video);

    const response = await HTTP.post("/video-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Asegúrate de establecer el encabezado correcto para archivos
      },
      onUploadProgress: (progressEvent) => {
        // Calcula el progreso de subida
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        uploadProgress.value = progress;
      },
    });

    if (response.data.url) {
      link.value = response.data.url;
    }
    uploadProgress.value = null;
  } catch (error) {
    showSnackBar("Ha ocurrido un error al guardar el video", 5000, error);
  } finally {
    disabled.value = false;
  }
};

/* Utilidades */
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(link.value);
    showSnackBar(`Enlace copiado al portapapeles`, 2000, "success");
  } catch (err) {
    showSnackBar(`Error al copiar el enlace: ${err}`, 2000, "error");
  }
};

const handleNewFile = () => {
  videoData.dni = "";
  videoData.name = "";
  videoData.lastname = "";
  videoData.video = null;
  link.value = "";
};

const showSnackBar = (text, timeout, color) => {
  snackbar.text = text;
  snackbar.timeout = timeout;
  snackbar.color = color;
  snackbar.show = true;
};
</script>
<template>
  <v-card>
    <v-card-title>Formulario para subir el archivo</v-card-title>
    <v-card-text v-if="!link">
      <v-form>
        <UploadForm :data="videoData" :disabled="disabled" />
      </v-form>
      <ProgressBar
        v-if="uploadProgress !== null"
        class="mt-6"
        :uploadProgress="uploadProgress"
      />
    </v-card-text>
    <v-card-text v-else>
      <v-row>
        <v-col cols="12" md="10">
          <v-text-field density="compact" v-model="link" readonly></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn @click="copyToClipboard" variant="flat" color="primary" block
            ><v-icon>mdi-clipboard</v-icon> copiar enlace</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!link"
        @click="uploadFile"
        :disabled="disabled"
        color="primary"
        variant="flat"
        block
        ><v-icon>mdi-upload</v-icon>subir video</v-btn
      >
      <v-btn
        v-else
        @click="handleNewFile"
        :disabled="disabled"
        color="primary"
        variant="flat"
        block
        ><v-icon>mdi-upload</v-icon>subir nuevo video</v-btn
      >
    </v-card-actions>
    <SnackBar :snackbar="snackbar" />
  </v-card>
</template>
