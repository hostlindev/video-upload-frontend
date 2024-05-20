<script setup>
const props = defineProps({
  snackbar: {
    type: Object,
    required: true,
  },
});

const close = () => {
  props.snackbar.show = false;
};
</script>
<template>
  <v-snackbar
    :text="snackbar.text"
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    :timer="true"
    width="400"
    close-delay
    open-delay
  >
    <template v-slot:actions>
      <v-btn dark variant="text" @click="close">
        <v-icon>mdi-close</v-icon> cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>
