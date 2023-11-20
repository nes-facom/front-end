<template>
    <div id="lista-exemplares-wrapper">
        <div id="head-options">
            <a>Imprimir código de barras</a>
            <a>Excluir exemplar</a>
            <a>Adicionar exemplar</a>
        </div>
        <div id="wrapper-lista">
            <div id="list-head-wrapper">
                <span class="span1"> Nº do tombo </span>
            </div>
            <!-- <div
                id="lista-card-wrapper"
            >
                <CardLivro
                v-for="(leitor, index) in leitores"
                :key="index"
                :leitor="leitor"></CardLivro>
            </div> -->
        </div>
    </div>
</template>

<script>

import CardLivro from '@/components/CardLivro.vue';

export default {
    components: {
        
    },

    props: {
        leitores: {
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

#lista-exemplares-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 60%;
    max-width: 100.8rem;
}

#head-options {
    display: flex;
    flex-direction: row;

}

#head-options a {
    font: var(--title-medium);
    color: var(--primary);
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