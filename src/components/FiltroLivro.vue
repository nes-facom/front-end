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
            <v-list class="overflow-y-auto" style="max-height: 300px;">
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
                {nome: 'Ação', value: 'açao'},
                {nome: 'Aventura', value: 'aventura'},
                {nome: 'Arte', value: 'arte'},
                {nome: 'Atlas', value: 'atlas'},
                {nome: 'Comédia', value: 'comedia'},
                {nome: 'Conto', value: 'conto'},
                {nome: 'Cordel', value: 'cordel'},
                {nome: 'Crônica', value: 'cronica'},
                {nome: 'Drama', value: 'drama'},
                {nome: 'Epopeia', value: 'epopeia'},
                {nome: 'Fábula', value: 'fabula'},
                {nome: 'Fantasia', value: 'fantasia'},
                {nome: 'Ficção científica', value: 'ficcao'},
                {nome: 'Gibi/História em quadrinhos', value: 'gibi'},
                {nome: 'História geral', value: 'historia'},
                {nome: 'Leitura para iniciantes(letra bastão)', value: 'leituraIniciantes'},
                {nome: 'Leitura para jovens', value: 'leituraJovens'},
                {nome: 'Leitura para professores', value: 'leituraProfessores'},
                {nome: 'Livro de imagem', value: 'livroImagem'},
                {nome: 'Mapa', value: 'mapa'},
                {nome: 'Novela', value: 'novela'},
                {nome: 'Poema', value: 'poema'},
                {nome: 'Romance', value: 'romance'},
                {nome: 'Tragédia', value: 'tragedia'},
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