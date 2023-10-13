<template>
    <div
        data-cy="componente-alerta"
        id="alerta"
    >
        <span> {{ mensagem }} </span>
        <button
            @click="fechar"
            id="botao-fechar"
            data-cy="botao-fechar-alerta"
        >
            <v-icon
            color="var(--inverse-on-surface)"
            >mdi-close</v-icon>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'AlertaInfo',

        props: {
            mensagem: {
                type: String,
                required: true
            },
            fechar: Function
        },
    }
</script>

<style scoped>

#alerta {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 34.4rem;

    padding-block: 1rem;
    padding-inline: 1.5rem;

    background-color: var(--inverse-surface);

    border-radius: 0.4rem;

    font: var(--body-medium);
    color: var(--inverse-on-surface);

    gap: 1.5rem;
}


</style>