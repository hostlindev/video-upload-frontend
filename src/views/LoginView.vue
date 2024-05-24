<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { HTTP } from "@/plugins/axios";
import SnackBar from "@/components/SnackBar.vue";
import Auth from "@/plugins/router";

/* Variables */
const router = useRouter();
const username = ref("user");
const password = ref("");
const passwordField = ref(null);
const loading = ref(false);
const snackbar = reactive({
  text: "",
  timeout: null,
  color: "",
  show: false,
});
const options = reactive([
  {
    value: "user",
    text: "Participante",
  },
  {
    value: "admin",
    text: "Administrador",
  },
]);

/* Acciones */
/* const getCsrfToken = async () => {
  const response = await HTTP.get("/sanctum/csrf-cookie");
  return response.data.csrf_token;
}; */
const login = async () => {
  try {
    loading.value = true;
    if (password.value === "") {
      showSnackBar("Ingrese la contraseña", 2000, "orange-lighten-2");
      return;
    }

    //await getCsrfToken();

    const response = await HTTP.post("/login", {
      username: username.value,
      password: password.value,
    });
    if (response.data.token) {
      // Lógica para guardar el token y redirigir
      // Por ejemplo, almacenar el token en localStorage
      //localStorage.setItem("token", response.data.token);
      Auth.saveToken(response.data.token);
      router.push({ path: "/upload" });
    }
  } catch (error) {
    console.error(error);
    showSnackBar(error.response.data.error, 2000, "error");
  } finally {
    loading.value = false;
  }
};

/* Utilidades */
const showSnackBar = (text, timeout, color) => {
  snackbar.text = text;
  snackbar.timeout = timeout;
  snackbar.color = color;
  snackbar.show = true;
};
const focusPassword = () => {
  passwordField.value.focus();
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
        <v-form @submit.prevent="login">
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="username"
                label="Tipo de usuario"
                :items="options"
                item-value="value"
                item-title="text"
                @keydown.enter="focusPassword"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                prepend-inner-icon="mdi-lock"
                placeholder="Ingresar Contraseña"
                ref="passwordField"
                label="Contraseña"
                type="password"
                @keydown.enter="login"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" block color="primary" variant="flat" @click="login"
          >ingresar
        </v-btn>
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
