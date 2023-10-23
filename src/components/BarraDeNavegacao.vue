<template>
  <div id="componente-navegacao">

    <div id="logo">
      <img id="icone-logo" src="./icons/Logo.png"/>
    </div>

    <div id="menu">
    <v-tabs slider-color="#00696C">
      <v-tab id="item-menu">Empréstimos</v-tab>
      <v-tab id="item-menu">Livros</v-tab>
      <v-tab id="item-menu">Leitores</v-tab>
    </v-tabs>
    </div>

    <div id="logout">
      <v-btn icon color="pink">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    fazerLogoff() {
      // Adicione aqui a lógica para fazer logoff do usuário
    },
  },
};
</script>

<style scoped>
#componente-navegacao {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #FFF;
  align-items: center;
  justify-content: space-evenly;
}

#icone-logo {
  width: 15rem;
  height: 5rem;
}

#item-menu {
  font: var(--label-large);
  color: var(---on-primary-container);
  text-decoration: none;
}
</style>
