<template>
    <div class="card-emprestimo">
        <span class="span1"> {{ emprestimo.nome }} </span>
        <span class="span2" v-if="emprestimo.tipo === 'discente'"> {{ emprestimo.serie }} </span>
        <span class="span2" v-if="emprestimo.tipo === 'docente'"> {{ emprestimo.disciplina }} </span>
        <span class="span3"> {{ tempoDeAtrasoEmDias }} </span>
    </div>
</template>

<script>

export default {
    props: {
        emprestimo: {
            type: Object,
            required: true
        }
    },

    computed: {
        tempoDeAtrasoEmDias() {
            const hoje = new Date();

            if (this.emprestimo.dataDevolucao === 'Indeterminado') {
                return this.emprestimo.dataDevolucao
            } else {
                const diferenca = hoje - this.emprestimo.dataDevolucao
                const diasPassados = Math.floor(diferenca / (1000*60*60*24))
                return diasPassados
            }

        }
    }
}

</script>

<style scoped>

span {
    font: var(--body-large);
    color: var(--on-surface);
}

.card-emprestimo {
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

.card-emprestimo:hover {
    cursor: pointer;
    background-color: var(--surface-variant);
}

.card-emprestimo:active {
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