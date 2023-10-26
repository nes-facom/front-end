<template lang="">
    <div data-app>
        <!-- <v-select
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
        ></v-select> -->
        <BotaoPadrao
            conteudo="Filtros"
            type="button"
            icon="mdi-filter-outline"
            outlined
        >
        </BotaoPadrao>
    </div>
</template>
<script>
import BotaoPadrao from '@/components/BotaoPadrao.vue'

export default {
    data() {
        return {
            filtros: [],
            opcoes: ['discente', 'docente']
        }
    },

    components: {
        BotaoPadrao
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