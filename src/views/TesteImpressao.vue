<template>
  <div id="pgTesteImpressao">
      <button @click="imprimirEtiqueta">
        Imprimir Etiqueta
      </button>
  </div>
</template>

<script>
import { imprimirEtiqueta } from '@/service/impressoraTermica';

export default {
  data() {
    return {
      tombo: 1234567890
    }
  },
  methods: {
    async imprimirEtiqueta() {
      try {
        const response = await imprimirEtiqueta(this.tombo);
        console.log('Resposta da impressora:', response);
      } catch (error) {
        console.error('Erro ao imprimir etiqueta:', error);
      }
    }
  }
}
</script>

<style scoped>

</style>