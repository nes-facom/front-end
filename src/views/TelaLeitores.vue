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
            <AlertaInfo data-cy="alerta" v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
        </div>
    </div>
</template>

<script>

import AlertaInfo from '@/components/AlertaInfo.vue'
import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroLeitor from '@/components/FiltroLeitor.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import ListaDeLeitores from '@/components/ListaDeLeitores.vue';
import { validarTokenAcesso } from '@/service/autenticacao';
import { getLeitores } from '@/service/requisicao.js';
import router from '@/router'

export default {
    data() {
        return {
            queryDeBusca: '',
            filtroSelecionado: null,
            arrayResponse: [],
            alerta: false,
            mensagemAlerta: '',
        }
    },

    components: {
        AlertaInfo,
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

        tratarErroRequisicao(requisicao) {
            const status = requisicao.request.status;
            if (status === 500) {
                this.mensagemAlerta = "Ops! Ocorreu algum problema interno no servidor!";
            }
            else {
                this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
            }

            this.alerta = true;

            setTimeout(() => {
                this.fecharAlerta();
            }, 5000);
        },

        fecharAlerta() {
            this.alerta = false;
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
        async queryDeBusca(newValue) {

            const json = {
                nome: newValue,
                tipo: this.filtroSelecionado
            }

            const requisicao = await getLeitores(json)
            
            const requisicao = await getLeitores(jsonLeitores)

            if (requisicao.status === 200) {
                this.arrayResponse = requisicao.data
            } else {
                this.tratarErroRequisicao(requisicao)
            }
        },

        async filtroSelecionado(newValue) {
            const jsonLeitores = {
                nome: this.queryDeBusca,
                tipo: newValue
            }

            const requisicao = await getLeitores(jsonLeitores)

            if (requisicao.status === 200) {
                this.arrayResponse = requisicao.data
            } else {
                console.log(requisicao.status)
            }
        },

        async filtroSelecionado(newValue) {

            const json = {
                nome: this.queryDeBusca,
                tipo: newValue
            }

            const requisicao = await getLeitores(json)

            if (requisicao.status === 200) {
                this.arrayResponse = requisicao.data
            } else {
                this.tratarErroRequisicao(requisicao)
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