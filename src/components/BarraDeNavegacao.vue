<template>
  <div id="componente-navegacao">
    <div id="logo">
      <img id="icone-logo" src="./icons/Logo.png" />
    </div>

    <div id="menu">
      <v-tabs slider-color="#00696C">
        <v-tab class="item-menu" to="/emprestimos">Empréstimos</v-tab>
        <v-tab class="item-menu" to="/livros">Livros</v-tab>
        <v-tab class="item-menu" to="/leitores">Leitores</v-tab>
      </v-tabs>
    </div>

    <div id="logout">
      <v-btn icon color="pink">
        <v-icon @click="sair">mdi-logout</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { deslogar } from "@/service/autenticacao.js";
import { mapActions } from "vuex";
 

export default {
  methods: {
    ...mapActions(["atualizarUsuarioLogado"]), 
    sair() {
      const sair = deslogar();
      console.log("aqui");
      if (sair) {
        this.atualizarUsuarioLogado(false); 
        this.$router.push("/login"); 
      }
    },
  },
};
</script>

<style scoped>
#componente-navegacao {
  width: 100%;
  max-width: 100.8rem;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
}

#icone-logo {
  width: 15rem;
  height: 5rem;
}

.item-menu {
  font: var(--label-large);
  color: var(---on-primary-container);
  text-transform: none;
}
</style>
