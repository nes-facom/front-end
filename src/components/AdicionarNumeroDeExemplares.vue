<template>
  <div class="counter-wraper">
    <v-btn @click="decrement">-</v-btn>
    <v-text-field class="input-counter" outlined type="number" v-model="counter" @input="handleChange"></v-text-field>
    <v-btn @click="increment">+</v-btn>
  </div>
</template>

<script>
import { createExemplar, getLivro } from "@/service/requisicao.js";

export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    emitirAtualizacao(counter) {
      this.$emit("atualizacao", counter)
    },

    increment() {
      this.counter++;
      this.emitirAtualizacao(this.counter)
    },
    decrement() {
      if (this.counter > 0) {
        this.counter--;
        this.emitirAtualizacao(this.counter)
      }
    },
    handleChange(value) {
      if (!isNaN(value)) {
        this.counter = parseInt(value);
      }
    },

    async createExemplar() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const requisicaoDoLivro = await getLivro(this.$route.params.id)
      const dadosCadastrarLivro = {
        titulo: requisicaoDoLivro.titulo,
        autor: requisicaoDoLivro.autor,
        tipologia: requisicaoDoLivro.tipologia,
        quantidade: counter,
        prateleira: requisicaoDoLivro.prateleira,
      };

      const requisicao = await createExemplar(dadosCadastrarLivro);

      if (requisicao === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoLivro();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },
  },
};
</script>

<style scoped>
.counter-wraper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.input-counter::v-deep .v-input__control {
  height: 8rem;
  border: 1px;
  border-radius: 6px;
  padding: 1.5rem;
}
</style>
