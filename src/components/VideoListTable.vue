<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th>Fiscal</th>
        <th>Cédula</th>
        <th>Fecha</th>
        <th>Enlace</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.dni }}</td>
        <td>{{ item.createDate }}</td>
        <td>{{ item.link }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
