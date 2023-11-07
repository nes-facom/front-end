<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <router-link to="/leitores">
                        <v-icon
                            x-large
                            class="icon"
                        >
                            mdi-arrow-left
                        </v-icon>
                    </router-link>
                    <span id="title-detalhes-leitor">Informações do leitor</span>
                        <v-icon
                            x-large
                            class="icon"
                            @click="irParaEditar"
                        >
                            mdi-pencil-outline
                        </v-icon>
                </section>
                <section class="leitor-info">
                    <div
                        class="wrapper-leitor-info-esq a"
                        v-if="tipoLeitor === 'docente'"
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
                                Ana Carolina da Silva
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Disciplina
                            </span>
                            <span class="conteudo">
                                Geografia
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Tunro
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
                        v-if="tipoLeitor === 'discente'"
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
                                Ana Gabrielle Oliveira                                </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Série
                            </span>
                            <span class="conteudo">
                                3° B
                            </span>
                        </div>
                        <div class="wrapper-info">
                            <span class="title">
                                Tipo
                            </span>
                            <span class="conteudo">
                                Discente
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
                        <!-- lista de empréstimos -->
                            <!-- item empréstimo -->
                            <div id="historico-de-emprestimo">
                                <CardHistoricoEmprestimo
                                    v-for="(item, index) in listaEmprestimosRequisicao"
                                    :key="index"
                                    :emprestimo="item"
                                >
                                </CardHistoricoEmprestimo>
                            </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>

<script>

import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue'
import CardHistoricoEmprestimo from '@/components/CardHistoricoEmprestimo.vue';

export default {
    components: {
        BarraDeNavegacao,
        CardHistoricoEmprestimo,
    },

    data() {
        return {
            idLeitor: 1,
            tipoLeitor: 'discente',
            listaEmprestimosRequisicao: [
                {
                    titulo: "Geografia Geral e do Brasil",
                    dataEmprestimo: "03/03/2023",
                    dataDevolucao: "Indeterminado",
                    situacao: "Emprestado"
                },
                {
                    titulo: "Por Uma Geografia dos Espaços Vividos",
                    dataEmprestimo: "25/02/2022",
                    dataDevolucao: "02/12/2022",
                    situacao: "Devolvido"
                },
                {
                    titulo: "Título do livro",
                    dataEmprestimo: "Data",
                    dataDevolucao: "Data",
                    situacao: "Estado"
                }
            ]
        }
    },

    props: {
        leitor: {
            type: Object,
            required: true
        },
    },

    methods: {
        irParaEditar() {
            this.$router.push({ path: `/leitores/editar/${this.idLeitor}`});
        }
    }
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