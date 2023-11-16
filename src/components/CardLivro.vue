<template>
    <div class="card-livro" @click="toDetails(livro.id)">
        <span class="span1"> {{ livro.livro }} </span>
        <span class="span2" v-if="livro.length === 1"> {{ livro[0].quantidadeDisponivel}} </span>
        <span class="span2" v-if="livro.length === 1"> {{ livro[0].quantidadeTotal }} </span>
        <span class="span3" v-if="livro.length === 1"> {{ livro[0].prateleira }} </span>
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
        toDetails(id) {
            const idLeitor = id;
            this.$router.push({ path: `leitores/detalhes/${idLeitor}`})
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
    grid-template-columns: 1fr 1fr 1fr;

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

.span2, .span3 {
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>