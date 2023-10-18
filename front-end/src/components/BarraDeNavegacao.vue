<template>
  <div id="componente-navegacao">

    <div id="logo">
      <img id="logo-icon" src="./icons/Logo.png"/>
    </div>

    <div id="menu">
      <ul>
      <li id="menu-item"><a href="#">Empréstimos</a></li>
      <li id="menu-item"><a href="#">Livros</a></li>
      <li id="menu-item"><a href="#">Leitores</a></li>
    </ul>
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
/* Estilos específicos do componente, se necessário */
#componente-navegacao {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #FFF;
  align-items: center;
  justify-content: space-evenly;
}

#logo-icon {
  width: 15rem;
  height: 5rem;
}

#menu-item {
  display: inline;
  padding: 2rem;
}

#menu-item a {
  font: var(--label-large);
  color: var(---on-primary-container);
  text-decoration: none;
}
</style>
