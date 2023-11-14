<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho" v-if="!isLoading">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <router-link to="/leitores">
                        <v-icon
                            medium
                            class="icon"
                        >
                            mdi-arrow-left
                        </v-icon>
                    </router-link>
                    <span id="title-detalhes-leitor">Informações do leitor</span>
                        <v-icon
                            medium
                            class="icon"
                            @click="irParaEditar"
                        >
                            mdi-pencil-outline
                        </v-icon>
                </section>
                <section class="leitor-info">
                    <div
                        class="wrapper-leitor-info-esq a"
                        v-if="isDocente()"
                    >
                        <div class="wrapper-img">
                            <img
                                v-if="leitor.foto === null"
                                src="@/components/icons/userPhotoDefault.png"
                                alt="Icone de usuário, uma pessoa genérica."
                            >
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Nome
                            </span>
                            <span class="conteudo">
                                {{ leitor.nome }}
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Disciplina
                            </span>
                            <span class="conteudo">
                                {{ leitor.disciplina }}
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Turno
                            </span>
                            <span class="conteudo">
                                Vespertino
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Tipo
                            </span>
                            <span class="conteudo">
                                Docente
                            </span>
                        </div>
                    </div>
                    <div
                        class="wrapper-leitor-info-esq a"
                        v-if="!isDocente()"
                    > 
                        <div class="wrapper-img">
                            <img
                                src="@/components/icons/userPhotoDefault.png"
                                alt="Icone de usuário, uma pessoa genérica."
                            >
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Nome
                            </span>
                            <span class="conteudo">
                                {{ leitor.nome }}                                </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Série
                            </span>
                            <span class="conteudo">
                                {{ serieTurma }}
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Tipo
                            </span>
                            <span class="conteudo">
                                {{ leitor.tipo }}
                            </span>
                        </div>
                    </div>
                    <v-divider
                        vertical
                        class="b"
                    ></v-divider>
                    <section class="wrapper-leitor-info-dir c">
                        <div
                            id="head-lista-histórico"
                        >
                            <span class="title"> Título </span>
                            <span class="title"> Data do empréstimo </span>
                            <span class="title"> Data de devolução </span>
                            <span class="title"> Estado </span>
                        </div>
                            <div id="historico-de-emprestimo">
                                <CardHistoricoEmprestimo
                                    v-for="(item, index) in historicoEmprestimo"
                                    :key="index"
                                    :emprestimo="item"
                                >
                                </CardHistoricoEmprestimo>
                            </div>
                    </section>
                </section>
            </div>
            <CircleLoader :loading="isLoading">
            </CircleLoader>
        </div>
    </div>
</template>

<script>

import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue'
import CircleLoader from '@/components/CircleLoader.vue'
import CardHistoricoEmprestimo from '@/components/CardHistoricoEmprestimo.vue';
import { getLeitor, getHistoricoEmprestimo } from '@/service/requisicao.js'
import { validarTokenAcesso } from "@/service/autenticacao.js";

export default {
    components: {
        BarraDeNavegacao,
        CardHistoricoEmprestimo,
        CircleLoader
    },

    data() {
        return {
            leitor: null,
            historicoEmprestimo: [],
            isLoading: undefined
        }
    },

    methods: {
        irParaEditar() {
            this.$router.push({ path: `/leitores/editar/${this.$route.params.id}`});
        },
        async buscarInfoLeitor(id) {
            const requisicao = await getLeitor(id)
            this.leitor = requisicao.data
        },
        async buscarHistorico(id) {
            const requisicao = await getHistoricoEmprestimo(id)
            this.historicoEmprestimo = requisicao.data
        },
        isDocente() {
            return this.leitor && this.leitor.tipo === 'Docente';
        },
    },

    computed: {
        serieTurma() {
            return this.leitor.serie + ' ' + this.leitor.turma
        }
    },

    created() {
        this.isLoading = true
        this.buscarInfoLeitor(this.$route.params.id)
        this.buscarHistorico(this.$route.params.id)
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    },

    mounted() {
        validarTokenAcesso().then((token) => {
        if (!token) {
            router.push('/login');
        }
        })
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
    max-width: 100.8rem;
}

.icon {
    color: var(--on-surface-variant);
}

#title-detalhes-leitor {
    font: var(--display-small);
    color: var(--black);
}

.leitor-info {
    display: grid;
    grid-template:
    "a b c";
    grid-template-columns: 34% 1% 1fr;

    width: 100%;
}

.a {
    grid-area: a;
}

.b {
    grid-area: b;
}

.c {
    grid-area: c;
}

.wrapper-leitor-info-esq {
    display: flex;
    flex-direction: column;
    
    gap: 2rem;
}

.wrapper-leitor-info-dir {
    display: flex;
    flex-direction: column;
    
    gap: 1rem;

    padding-inline-start: 3rem;
}

.wrapper-img {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
}

.wrapper-info {
    display: flex;
    flex-direction: column;

    gap: 1rem;
}

.title {
    font: var(--title-medium);
    color: var(--terciary);
}

.conteudo {
    font: var(--body-large);
    color: var(--black);
}

#head-lista-histórico {
    display: grid;
    grid-template-columns: 33% 18% 18% 1fr;
    align-items: center;

    gap: 3rem;

    text-align: center;

    width: 100%;
}

#head-lista-histórico span:first-child{
    text-align: start;
}

#historico-de-emprestimo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    width: 100%;
}
</style>