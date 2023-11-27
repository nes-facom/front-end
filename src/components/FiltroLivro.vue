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
                {nome: 'Ação', value: 'Açao'},
                {nome: 'Aventura', value: 'Aventura'},
                {nome: 'Arte', value: 'Arte'},
                {nome: 'Atlas', value: 'Atlas'},
                {nome: 'Comédia', value: 'Comedia'},
                {nome: 'Conto', value: 'Conto'},
                {nome: 'Cordel', value: 'Cordel'},
                {nome: 'Crônica', value: 'Cronica'},
                {nome: 'Drama', value: 'Drama'},
                {nome: 'Epopeia', value: 'Epopeia'},
                {nome: 'Fábula', value: 'Fabula'},
                {nome: 'Fantasia', value: 'Fantasia'},
                {nome: 'Ficção científica', value: 'Ficcao'},
                {nome: 'Gibi/História em quadrinhos', value: 'Gibi'},
                {nome: 'História geral', value: 'Historia'},
                {nome: 'Leitura para iniciantes(letra bastão)', value: 'LeituraIniciantes'},
                {nome: 'Leitura para jovens', value: 'LeituraJovens'},
                {nome: 'Leitura para professores', value: 'LeituraProfessores'},
                {nome: 'Livro de imagem', value: 'LivroImagem'},
                {nome: 'Mapa', value: 'Mapa'},
                {nome: 'Novela', value: 'Novela'},
                {nome: 'Poema', value: 'Poema'},
                {nome: 'Romance', value: 'Romance'},
                {nome: 'Tragédia', value: 'Tragedia'},
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