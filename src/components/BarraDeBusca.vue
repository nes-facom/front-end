<template>
    <div id="wrapper">
        <v-text-field
            append-icon="mdi-magnify"
            hide-details
            id="barra-de-busca"
            flat
            rounded
            outlined
            v-model="stringBusca"
            :placeholder="conteudo"
            @input="busca"
        ></v-text-field>
    </div>
</template>

<script>

export default {
    data() {
        return {
            stringBusca: ''
        }
    },

    props: {
        conteudo: {
            type: String,
            required: true
        }
    },

    methods: {
        busca() {
            this.$emit('busca', this.stringBusca);
        }
    }
}

</script>

<style scoped>

#wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    
    >>> div.v-input__control {
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        width: 80vw;
        max-width: 36rem;
    }

    >>> input#barra-de-busca::placeholder {
        color: var(--on-surface-variant);
        font: var(--body-large);
    }

    >>> .v-icon {
        color: var(--terciary);
    }

    >>> fieldset {
        border-color: var(--terciary);
    }
}
    
</style>