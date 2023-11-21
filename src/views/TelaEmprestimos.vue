<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <BarraDeBusca
                        class="acoes-item1"
                        conteudo="Busque por um nome"
                        @busca="salvarQueryDeBusca"
                    ></BarraDeBusca>
                    <div class="acoes-item2">
                        <FiltroEmprestimo
                            @filtragem="salvarTipoDeFiltragem"
                        ></FiltroEmprestimo>
                        <div @click="toggleModal">
                            <BotaoPadrao
                                conteudo="Ler código de barras"
                                type="button"
                                icon="mdi-barcode-scan"
                            >
                            </BotaoPadrao>
                        </div>
                    </div>
                </section>
            </div>
            <ListaDeEmprestimos
                :pesquisa="this.queryDeBusca"
                :filtro="this.filtroSelecionado"
                :emprestimos="this.arrayResponse"
            >
            </ListaDeEmprestimos>
            <AlertaInfo
                data-cy="alerta"
                v-if="alerta"
                :mensagem="mensagemAlerta"
                :fechar="fecharAlerta"
            >
            </AlertaInfo>
        </div>
        <div
            class="overlay"
            v-if="showModal"
        >
            <div
                class="modal"
                v-if="showModal"
            >
                <v-icon>
                    mdi-barcode-scan
                </v-icon>
                <span>
                    Leia o código de barras
                </span>
                <p>
                    Esperando leitura do código de barras...
                </p>
                <span @click="toggleModal">
                    Cancelar
                </span>
            </div>
        </div>
    </div>
</template>

<script>

import AlertaInfo from '@/components/AlertaInfo.vue'
import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroEmprestimo from '@/components/FiltroEmprestimo.vue';
import ListaDeEmprestimos from '@/components/ListaDeEmprestimos.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue';
import router from '@/router';
import { getEmprestimos } from '@/service/requisicao';
import { validarTokenAcesso } from '@/service/autenticacao';
import { getEmprestimosPorQuery } from '@/service/requisicao';


export default {
    components: {
        AlertaInfo,
        BarraDeNavegacao,
        BarraDeBusca,
        BotaoPadrao,
        FiltroEmprestimo,
        ListaDeEmprestimos
    },

    data() {
        return {
            queryDeBusca: '',
            filtroSelecionado: null,
            arrayResponse: [],
            alerta: false,
            mensagemAlerta: '',
            showModal: true,
        }
    },

    methods: {
        salvarQueryDeBusca(query) {
            this.queryDeBusca = query;
        },

        salvarTipoDeFiltragem(filtro) {
            this.filtroSelecionado = filtro;
        },

        toggleModal() {
            this.showModal = !this.showModal
        },

        fecharAlerta() {
            this.alerta = false;
        },

        async primeiraBusca() {
            const requisicao = await getEmprestimos()

            if (requisicao.status === 200) {
                this.arrayResponse = requisicao.data
            } else {
                this.tratarErroRequisicao(requisicao)
            }
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
            if(newValue === '' && this.filtroSelecionado === null) {
                return
            } else {
                const json = {
                    nome: newValue,
                    tipo: this.filtroSelecionado
                }
    
                const requisicao = await getEmprestimosPorQuery(json)
    
                if (requisicao.status === 200) {
                    this.arrayResponse = requisicao.data
                } else {
                    this.tratarErroRequisicao(requisicao)
                }
            }
        },

        async filtroSelecionado(newValue) {

            if(this.queryDeBusca === '' && newValue === null) {
                return
            } else {
                const json = {
                    nome: this.queryDeBusca,
                    tipo: newValue
                }
    
                const requisicao = await getEmprestimosPorQuery(json)
    
                if (requisicao.status === 200) {
                    this.arrayResponse = requisicao.data
                } else {
                    this.tratarErroRequisicao(requisicao)
                }
            }
        },
    },
};

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

.overlay {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: #1a1c1e9d;;

    z-index: 10;
}

.modal {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    position: fixed;

    border-radius: 2.8rem;
    padding: 2.4rem;

    background-color: var(--background);
    box-shadow: 0 4px 8px rgba(0, 0, 5, 0.5);;

    z-index: 20;

    width: 50vw;
    max-width: 33.5rem;
}

.modal span {
    font: var(--headline-small)
}

.modal p {
    font: var(--body-medium)
}

.modal span:last-child {
    display: flex;
    justify-content: end;
    margin-top: 3.4rem;

    font: var(--label-large);
    color: var(--primary);

    cursor: pointer;
}

</style>