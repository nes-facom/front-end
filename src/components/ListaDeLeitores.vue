<template>
    <div id="lista-leitores-wrapper">
        <img v-if="leitores.length === 0"
            src="@/assets/images/realize-uma-busca.png" alt="Um gato prendurado numa lupa com o texto `realize uma busca` ao lado dele">
        <div
            id="head-wrapper"
        v-if="leitores.length > 0">
            <span class="span1"> Nome </span>
            <span class="span2"> Série/Disciplina </span>
            <span class="span3"> Tipo </span>
        </div>
        <div
        id="lista-card-wrapper"
        v-if="leitores.length > 0">
            <CardLeitor 
            v-for="(leitor, index) in leitores"
            :key="index"
            :leitor="leitor"></CardLeitor>
        </div>
        <img v-if="false"
            src="@/assets/images/nenhum-resultado-encontrado.png" alt="Um fantasma com diversos morcegos em volta dele, ambos voando numa noite iluminada por uma lua. Com o texto abaixo deles escrito `Nenhum resultado encontrado`. ">
    </div>
</template>

<script>

import CardLeitor from '@/components/CardLeitor.vue';

export default {
    data() {
        return {
            
        }
    },

    props: {
        leitores: {
            type: Array,
            required: true
        },
    },

    components: {
        CardLeitor,
    },
}

</script>


<style scoped>

#lista-leitores-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 3rem;

    width: 100%;
    max-width: 100.8rem;
}

span {
    font: var(--title-medium);
    color: var(--black);
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