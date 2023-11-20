<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <BarraDeBusca
                        class="acoes-item1"
                        conteudo="Busque por um livro"
                        @busca="salvarQueryDeBusca"
                    ></BarraDeBusca>
                    <div class="acoes-item2">
                        <FiltroLivro
                            @filtragem="salvarTipoDeFiltragem"
                        ></FiltroLivro>
                        <router-link to="/livros/cadastrar">
                            <BotaoPadrao
                                conteudo="Cadastrar livro"
                                type="button"
                                icon="mdi-plus"
                            >
                            </BotaoPadrao>
                        </router-link>
                    </div>
                </section>
            </div>
            <ListaDeLivros
                :pesquisa="this.queryDeBusca"
                :filtro="this.filtroSelecionado"
                :leitores="this.arrayResponse"
            >
            </ListaDeLivros>
            <AlertaInfo
                data-cy="alerta"
                v-if="alerta"
                :mensagem="mensagemAlerta"
                :fechar="fecharAlerta"
            >
            </AlertaInfo>
        </div>
    </div>
</template>

<script>

import AlertaInfo from '@/components/AlertaInfo.vue'
import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroLivro from '@/components/FiltroLivro.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import ListaDeLivros from '@/components/ListaDeLivros.vue';
import { validarTokenAcesso } from '@/service/autenticacao';
import { getLivros } from '@/service/requisicao.js';
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
    FiltroLivro,
    ListaDeLivros,
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
            const jsonLivros = {
                nome: newValue,
                tipo: this.filtroSelecionado
            }
            
            const requisicao = await getLivros(jsonLivros)

            if (requisicao.status === 200) {
                this.arrayResponse = requisicao.data
            } else {
                this.tratarErroRequisicao(requisicao)
            }
        },

        async filtroSelecionado(newValue) {
            const jsonLivros = {
                nome: this.queryDeBusca,
                tipo: newValue
            }

            const requisicao = await getLivros(jsonLivros)

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