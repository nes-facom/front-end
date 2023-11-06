<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <BarraDeBusca
                        class="acoes-item1"
                        conteudo="Busque por um leitor"
                        @busca="salvarQueryDeBusca"
                    ></BarraDeBusca>
                    <div class="acoes-item2">
                        <FiltroLeitor
                            @filtragem="salvarTipoDeFiltragem"
                        ></FiltroLeitor>
                        <router-link to="/leitores/cadastrar">
                            <BotaoPadrao
                                conteudo="Cadastrar leitor"
                                type="button"
                                icon="mdi-plus"
                            >
                            </BotaoPadrao>
                        </router-link>
                    </div>
                </section>
            </div>
            <ListaDeLeitores :leitores="this.arrayResponse"></ListaDeLeitores>
        </div>
    </div>
</template>

<script>

import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroLeitor from '@/components/FiltroLeitor.vue';
import router from '@/router'
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import { validarTokenAcesso } from '@/service/autenticacao';
import ListaDeLeitores from '@/components/ListaDeLeitores.vue';
import { getLeitores } from '@/service/requisicao.js';

export default {
    data() {
        return {
            queryDeBusca: '',
            filtroSelecionado: null,
            arrayResponse: []
        }
    },

    components: {
        BarraDeNavegacao,
        BarraDeBusca,
        BotaoPadrao,
        FiltroLeitor,
        ListaDeLeitores
    },

    methods: {
        salvarQueryDeBusca(query) {
            this.queryDeBusca = query;
        },

        salvarTipoDeFiltragem(filtro) {
            this.filtroSelecionado = filtro;
        },
    },

    mounted() {
        validarTokenAcesso().then((token) => {
            if (!token) {
                router.push('/login');
            }
        })
    },

    watch: {
        async queryDeBusca() {
            const requisicao = await getLeitores()
            
            if (requisicao.status === 200) {
                console.log(requisicao.data)
                this.arrayResponse = requisicao.data
            } else {
                console.log(requisicao.status)
            }
        }
    },
}

</script>
 
<style scoped>

#background {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}

#wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;
    max-width: 144rem;

    height: 100%;

    gap: 4.4rem;
}

#wrapper-cabecalho {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    gap: 4rem;

    width: 100%;
}

#acoes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    width: 100%;
    max-width: 100.8rem;
}

.acoes-item1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.acoes-item2 {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    gap: 5rem;
}

</style>