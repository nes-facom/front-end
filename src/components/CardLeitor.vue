<template>
    <div class="card-leitor">
        <span class="span1"> {{ conteudo.nome }} </span>
        <span class="span2" v-if="conteudo.serie"> {{ conteudo.serie }} </span>
        <span class="span2" v-if="conteudo.disciplina"> {{ conteudo.disciplina }} </span>
        <span class="span3"> {{ conteudo.tipo }} </span>
    </div>
</template>

<script>

export default {
    props: {
        conteudo: {
            type: Object,
            required: true
        }
    }
}

</script>

<style scoped>

span {
    font: var(--body-large);
    color: var(--on-surface);
}

.card-leitor {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;
    max-width: 100.8rem;
    height: 6rem;

    background-color: var(--surface);
    border-radius: 1.2rem;
    border: 0.1rem solid var(--outline-variant);
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