<template>
    <div id="lista-emprestimos-wrapper">
        <img v-if="emprestimos.length === 0"
            src="@/assets/images/nenhum-resultado-encontrado.png" alt="Um gato prendurado numa lupa com o texto `realize uma busca` ao lado dele">
        <div 
            id="wrapper-lista"
            v-else
        >
            <div
                id="head-wrapper"
            >
                <span class="span1"> Nome </span>
                <span class="span2"> Série/Disciplina </span>
                <span class="span3"> Tempo de atraso </span>
            </div>
            <div
                id="lista-card-wrapper"
            >
                <CardEmprestimo
                v-for="(emprestimo, index) in emprestimos"
                :key="index"
                :emprestimo="emprestimo"></CardEmprestimo>
            </div>
        </div>
    </div>
</template>

<script>

import CardEmprestimo from '@/components/CardEmprestimo.vue';

export default {
    components: {
        CardEmprestimo,
    },

    props: {
        emprestimos: {
            type: Array,
            required: true
        },
        pesquisa: {
            type: String,
            required: true
        },
        filtro: {
            required: true
        }
    },
}

</script>


<style scoped>

#lista-emprestimos-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 100.8rem;
}

span {
    font: var(--title-medium);
    color: var(--black);
}

#wrapper-lista {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    gap: 3rem;
}

#head-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;
}

#lista-card-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    width: 100%;
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

img:nth-child(2) {
    width: 40rem;
}

</style>