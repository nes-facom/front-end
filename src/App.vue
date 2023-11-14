<script>
import BarraDeNavegacao from "./components/BarraDeNavegacao.vue";
import { validarTokenAcesso } from "@/service/autenticacao.js";

export default {
  onUpdate: {
        isLogado() {
          this.isLogado = validarTokenAcesso()
        }
    }, 
    data() {
      return {
        isLogado: false,
      }
    }
}
</script>

<template>
  <div id="app"
       data-app>
    <router-view />
    <BarraDeNavegacao v-if="isLogado"/>
  </div>
</template>

<style scoped>

</style>
