<template >
    <div>
        <v-btn
            id="button-default"
            class="button"
            data-cy="botao-padrao"
            rounded
            elevation="0"
            type="submit"
            v-if="!outlined"
        >
            {{ conteudo }}
        </v-btn>
        <v-btn
            id="button-outlined"
            class="button"
            data-cy="botao-padrao-outlined"
            rounded
            elevation="0"
            outlined
            type="submit"
            v-if="outlined"
        >
            {{ conteudo }}
        </v-btn>
    </div>
</template>

<script>

export default {
    props: {
        conteudo: {
            type: String,
            required: true
        },
        outlined: Boolean,
    },
}

</script>

<style scoped>

.button {
    font: var(--label-large);
    width: fit-content;

    text-transform: none;
}

#button-default {
    color: var(--on-primary);
    background-color: var(--primary);
}

#button-outlined {
    color: var(--primary);
    border-color: var(--primary);
}

</style>