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
            <div
                id="lista-card-wrapper" 
            >
                <CardExemplar></CardExemplar>
            </div>
        </div>
    </div>
</template>

<script>

import CardExemplar from '@/components/CardExemplar.vue';

export default {
    components: {
        CardExemplar,
    },

    props: {
        
    },
}

</script>


<style scoped>

#lista-exemplares-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: var(--surface-variant);
    border-radius: 12px;

    width: 80%;
    height: 43.6rem;
    max-width: 100.8rem;
    
}

#head-options {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    margin-top: 2.5rem;
    width: 100%;
}

#head-options a {
    font: var(--body-medium);
    color: var(--primary);
}

.span1 {
    font: var(--title-small);
    color: var(--black);

    margin-left: 8rem;
}

#wrapper-lista {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    gap: 3rem;
}

#list-head-wrapper {
    display: flex;
    justify-content: left;

    margin-top: 2.5rem;
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

</style>