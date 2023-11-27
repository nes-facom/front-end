<template>
    <div class="card-livro" @click="toEdit(livro.livro_id)">
      <span class="span1">{{ livro.livro.titulo }}</span>
      <span class="span2">{{ livro.quantidade_disponivel }}</span>
      <span class="span2">{{ livro.quantidade_total }}</span>
      <span class="span3">{{ livro.prateleira }}</span>
    </div>
  </template>

<script>

export default {
    props: {
        livro: {
            type: Object,
            required: true
        }
    },

    methods: {
        toEdit(id) {
            const idLivro = id;
            this.$router.push({ path: `/livros/editar/${idLivro}`})
        }
    }
}

</script>

<style scoped>

span {
    font: var(--body-large);
    color: var(--on-surface);
}

.card-livro {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    width: 100%;
    max-width: 100.8rem;
    height: 6rem;

    background-color: var(--surface);
    border-radius: 1.2rem;
    border: 0.1rem solid var(--outline-variant);

    transition: background-color 0.1s;
}

.card-leitor:hover {
    cursor: pointer;
    background-color: var(--surface-variant);
}

.card-leitor:active {
    cursor: pointer;
    background-color: var(--surface-dim);
}

.span1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1.6rem;
}

.span2, .span3, .span4 {
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>