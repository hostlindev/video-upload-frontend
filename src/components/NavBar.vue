<script setup>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const logout = () => {
  router.push({
    path: "/login",
  });
};
</script>
<template>
  <v-app-bar color="primary">
    <v-container class="mx-auto d-flex align-center justify-center">
      <img class="mx-3" width="50" src="../assets/logo/pgn.png" />

      <!-- Botones para navegar -->
      <RouterLink to="/upload" custom v-slot="{ navigate }">
        <v-btn
          prepend-icon="mdi-upload"
          :active="$route.name === 'upload'"
          variant="text"
          @click="navigate"
        >
          subir video
        </v-btn>
      </RouterLink>
      <RouterLink to="/list" custom v-slot="{ navigate }">
        <v-btn
          prepend-icon="mdi-view-list"
          :active="$route.name === 'list'"
          variant="text"
          @click="navigate"
        >
          lista de videos
        </v-btn>
      </RouterLink>
      <v-spacer></v-spacer>
      <v-tooltip text="Salir">
        <template v-slot:activator="{ props }">
          <v-btn @click="logout" v-bind="props" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-container>
  </v-app-bar>
  <v-main class="backgroundColor">
    <v-container fluid>
      <RouterView />
    </v-container>
  </v-main>
</template>
<style scoped>
.backgroundColor {
  background: #f5f5f5;
}
</style>
