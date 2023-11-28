<template>
    <div id="lista-exemplares-wrapper">
        <div id="head-options">
            <span @click="toggleModalImprimirCodigo">Imprimir código de barras</span>
            <span @click="toggleModalAdicionar">Adicionar exemplar</span>
        </div>
        <div id="wrapper-lista">
            <div id="list-head-wrapper">
                <span class="span1"> Nº do tombo </span>
            </div>
            <div
                id="lista-card-wrapper" 
            >
                <CardExemplar
                v-for="(exemplar, index) in exemplares"
                :key="index"
                :exemplar="exemplar"></CardExemplar>
            </div>
        </div>
        <div class="overlay" v-if="showModalAdicionar">
            <div class="modal" v-if="showModalAdicionar">
                <v-icon>
                    mdi-book-open-blank-variant
                </v-icon>
                <span>
                    Você quer cadastrar quantos exemplares?
                </span>
                <AdicionarNumeroDeExemplares  @atualizacao="atualizacaoExemplares"/>
                <section class="overlay-buttons">
                    <span @click="toggleModalAdicionar">Cancelar</span>
                    <span @click="createExemplar">Cadastrar e Imprimir</span>
                </section>
            </div>
        </div>
        <div class="overlay-imprimir-codigo" v-if="showModalImprimirCodigo">
            <div class="modal-imprimir-codigo" v-if="showModalImprimirCodigo">
                <img id="icone-logo" src="./icons/Logo.png" />
                <span>
                    Livro cadastrado com sucesso!
                </span>
                <p>Clique em continuar para seguir para a tela de impressão de etiquetas, mas se você prefere imprimir as etiquetas mais tarde, clique em cancelar</p>
                <section class="overlay-buttons">
                    <span @click="toggleModalImprimirCodigo">Cancelar</span>
                    <span>Continuar</span>
                </section>
            </div>
        </div>
    </div>
</template>

<script>

import CardExemplar from '@/components/CardExemplar.vue';
import AdicionarNumeroDeExemplares from '@/components/AdicionarNumeroDeExemplares.vue';
import { createExemplar } from "@/service/requisicao.js";

export default {
    components: {
        CardExemplar,
        AdicionarNumeroDeExemplares,
    },

    props: {
        exemplares: {
            type: Array,
            required: true
        },
    },

    data() {
        return {
            showModalAdicionar: false,
            showModalExcluirExemplar: false,
            showModalImprimirCodigo: false,
            exemplares: 0,
        }
    },

    methods: {
        atualizacaoExemplares(exemplares) {
            this.exemplares = exemplares
            console.log(this.exemplares);
        },

      toggleModalAdicionar() {
        this.showModalAdicionar = !this.showModalAdicionar
      },
      toggleModalExcluirExemplar() {
        this.showModalExcluirExemplar = !this.showModalExcluirExemplar
      },
      toggleModalImprimirCodigo() {
        this.showModalImprimirCodigo = !this.showModalImprimirCodigo
      },
    },
}
</script>


<style scoped>

#lista-exemplares-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: var(--surface-variant);
    border-radius: 12px;

    width: 80%;
    height: 43.6rem;
    max-width: 100.8rem;
    
}

#head-options {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    margin-top: 2.5rem;
    width: 100%;
}

#head-options span {
    font: var(--body-medium);
    color: var(--primary);
    cursor: pointer;
}

.span1 {
    font: var(--title-small);
    color: var(--black);

    margin-left: 8rem;
}

#wrapper-lista {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    gap: 3rem;
}

#list-head-wrapper {
    display: flex;
    justify-content: left;

    margin-top: 2.5rem;
}

#lista-card-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    width: 100%;
}

.span1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1.6rem;
}

/* PRIMEIRO MODAL */
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

.modal span:last-child,
.modal span:nth-last-child(2) {
  display: flex;
  justify-content: end;
  margin-top: 3.4rem;
  font: var(--label-large);
  color: var(--primary);
  cursor: pointer;
}

/* SEGUNDO MODAL */

.overlay-imprimir-codigo {
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

.modal-imprimir-codigo {
display: flex;
flex-direction: column;
gap: 1.6rem;

justify-content: center;
align-items: center;

position: fixed;

border-radius: 2.8rem;
padding: 2.4rem;

background-color: var(--background);
box-shadow: 0 4px 8px rgba(0, 0, 5, 0.5);;

z-index: 20;

width: 50vw;
height: 65vh;
}

.modal-imprimir-codigo span {
font: var(--headline-small)
}

.modal-imprimir-codigo p {
font: var(--body-medium)
}

.modal-imprimir-codigo span:last-child,
.modal-imprimir-codigo span:nth-last-child(2) {
  display: flex;
  justify-content: end;
  margin-top: 3.4rem;
  font: var(--label-large);
  color: var(--primary);
  cursor: pointer;
}

.overlay-buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;

    margin-top: 10rem;
    width: 100%;

    gap: 2.5rem;
}
</style>