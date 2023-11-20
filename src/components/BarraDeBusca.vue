<template>
    <div id="wrapper-barra-de-busca">
        <v-text-field
            data-cy="barra-de-busca"
            dense
            flat
            hide-details
            id="barra-de-busca"
            rounded
            outlined
            v-model="stringBusca"
            :placeholder="conteudo"
            @keydown.enter="busca"
        ></v-text-field>
        <v-btn
            fab
            small
            @click="busca"
        >
            <v-icon>
                mdi-magnify
            </v-icon>
        </v-btn>
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

#wrapper-barra-de-busca {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 3rem;
    
    >>> div.v-input {
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        width: 30vw;
        max-width: 30rem;
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