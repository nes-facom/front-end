<template>
    <div id="wrapper-seletor">
        <v-select
            data-cy="filtro-seletor"
            dense
            hide-details
            id="filtro-seletor"
            label="Filtros"
            outlined
            prepend-inner-icon="mdi-filter-outline"
            rounded
            v-model="filtros"
            :items="opcoes"
        ></v-select>
    </div>
</template>

<script>

export default {
    data() {
        return {
            opcoes: ['discente', 'docente']
        }
    },

    props: {
        // opcoes: {
        //     type: Array,
        //     required: true
        // }
    }
}

</script>

<style scoped>
    
#wrapper-seletor {
    >>> label {
        color: var(--primary);
        font: var(--label-large);
    }

    >>> .v-icon {
        color: var(--primary);
    }

    >>> fieldset {
        border-color: var(--outline);
    }
}

</style>