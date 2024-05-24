<script setup>
const props = defineProps({
  uploadProgress: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <v-progress-linear v-model="props.uploadProgress" stripped color="light-blue" height="25">
    <template v-slot:default="{ value }">
      <strong>{{ Math.ceil(value) }}%</strong>
    </template>
  </v-progress-linear>
</template>
