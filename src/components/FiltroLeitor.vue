<template lang="">
    <div data-app>
        <v-menu
        rounded
        offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="button-outlined"
                    data-cy="botao-filtro-outlined"
                    elevation="0"
                    rounded
                    outlined
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon
                        left
                    >
                        mdi-filter-outline
                    </v-icon>
                    Filtros
                </v-btn>
            </template>
            <v-list>
                <v-list-item-group
                v-model="filtroSelecionado">
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :value="item.value"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.nome }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
import BotaoPadrao from '@/components/BotaoPadrao.vue'

export default {
    data() {
        return {
            items: [
                {nome: 'Discente', value: 'Discente'},
                {nome: 'Docente', value: 'Docente'},
                {nome: 'Todos', value: null}
            ],
            filtroSelecionado: null,
        }
    },

    components: {
        BotaoPadrao
    },

    watch: {
        filtroSelecionado(newValue) {
            if (newValue === undefined) {
                this.filtroSelecionado = null
            }

            this.$emit('filtragem', this.filtroSelecionado);
        }
    }
}
</script>
<style scoped>

.button-outlined {
    color: var(--primary);
    border-color: var(--primary);

    height: 4rem;

    font: var(--label-large);
    width: fit-content;

    text-transform: none;

    >>> .v-btn:not(.v-btn--round).v-size--default {
        height: 4rem;
    }
}
</style>