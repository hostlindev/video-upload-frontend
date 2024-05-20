<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-text-field
        v-model="props.data.name"
        :disabled="props.disabled"
        label="Nombre"
        placeholder="Ingrese su nombre"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        v-model="props.data.lastname"
        :disabled="props.disabled"
        label="Apellido"
        placeholder="Ingrese su apellido"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        v-model="props.data.dni"
        :disabled="props.disabled"
        label="Cédula"
        placeholder="Ingrese su cédula"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-file-input
        v-model="props.data.video"
        :disabled="props.disabled"
        persistent-hint
        label="Archivo de video"
        placeholder="Suba el video"
        clearable
        hint="Subir un video de 10 minutos en formato .mp4"
      ></v-file-input>
    </v-col>
  </v-row>
</template>
