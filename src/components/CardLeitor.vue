<template>
    <div class="card-leitor" @click="toDetails(leitor.id)">
        <span class="span1"> {{ leitor.nome }} </span>
        <span class="span2" v-if="leitor.discente.length === 1"> {{ leitor.discente[0].serie + ' ' + leitor.discente[0].turma }} </span>
        <span class="span2" v-if="leitor.docente.length === 1"> {{ leitor.docente[0].disciplina }} </span>
        <span class="span3" v-if="leitor.discente.length === 1"> Discente </span>
        <span class="span3" v-if="leitor.docente.length === 1"> Docente </span>
    </div>
</template>

<script>

export default {
    props: {
        leitor: {
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

.card-leitor {
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