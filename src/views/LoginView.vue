<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SnackBar from "@/components/SnackBar.vue";

const router = useRouter();
const password = ref("");
const snackbar = reactive({
  text: "",
  timeout: null,
  color: "",
  show: false,
});

const login = () => {
  try {
    if (password.value === "") {
      showSnackBar("Ingrese la contraseña", 2000, "orange-lighten-2", true);
      return;
    }
    router.push({
      path: "/upload",
    });
  } catch (error) {
    showSnackBar(error, 2000, "warning", true);
  }
};

const showSnackBar = (text, timeout, color) => {
  snackbar.text = text;
  snackbar.timeout = timeout;
  snackbar.color = color;
  snackbar.show = true;
};
</script>

<template>
  <v-row class="backgroundColor" align="center" justify="center">
    <v-card class="cardLogin" width="500">
      <v-card-title class="text-center">
        <v-container class="text-center">
          <img width="150" src="../assets/logo/pgn.jpg" alt="logo-institucional" />
        </v-container>
        Procuraduria General de la Nación
      </v-card-title>
      <v-card-text class="mt-12">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              prepend-inner-icon="mdi-lock"
              placeholder="Ingresar Contraseña"
              label="Contraseña"
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" variant="flat" @click="login">ingresar </v-btn>
      </v-card-actions>
    </v-card>
    <SnackBar :snackbar="snackbar" />
  </v-row>
</template>

<style scoped>
.backgroundColor {
  background: #f5f5f5;
}
.cardLogin {
  border-top: 10px solid #0d47a1;
}
</style>
