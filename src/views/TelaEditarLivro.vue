<template>
  <div id="background" data-app>
    <div id="wrapper">
      <BarraDeNavegacao></BarraDeNavegacao>

      <!-- EDITAR LIVRO -->

      <span id="title-cadastrar-livro">Editar livro</span>
      <div id="upper-window">
        <v-form
          :disabled="formDesabilitado"
          data-cy="formulario"
          class="formulario"
          ref="form"
          @submit.prevent="autenticarLivro()"
        >
          <div id="wrapper-conteudo">
            <div id="credenciais">
              <v-text-field
                data-cy="input-titulo"
                label="Título"
                v-model="titulo"
                outlined
                required
                :rules="regrasTitulo"
              >
              </v-text-field>
              <v-text-field
                data-cy="input-autor"
                label="Autor(a)"
                v-model="autor"
                outlined
                required
                :rules="regrasAutor"
              >
              </v-text-field>
              <v-text-field
                data-cy="input-tipologia"
                label="Tipologia textual"
                v-model="tipologiaTextual"
                outlined
                required
                :rules="regrasTipologiaTextual"
              >
              </v-text-field>
              <v-text-field
                data-cy="input-quantidade"
                label="Quantidade"
                v-model="quantidade"
                disabled
                outlined
              >
              </v-text-field>
              <v-text-field
                data-cy="input-prateleira"
                label="Prateleira"
                v-model="prateleira"
                outlined
                required
                :rules="regrasPrateleira"
              >
              </v-text-field>
            </div>
            <div id="area-foto">
              <v-img v-if="imageBlobUrl != null" :src="imageBlobUrl"></v-img>
            </div>
          </div>

          <!-- LISTAGEM DE EXEMPLARES -->

          <span id="title-listar-exemplar">Lista de exemplares</span>
          <ListaDeExemplares
            :exemplares="this.exemplaresArrayResponse"
            @atualizacaoExemplar="atualizacaoExemplar"
          ></ListaDeExemplares>

          <section id="wrapper-botoes" v-if="!isLoading">
            <div class="botao-excluir">
              <BotaoPadrao
                txtColor="#351000"
                btnColor="#FFDBCC"
                @click="toggleModalExcluirLivro"
                conteudo="Excluir livro"
                icon="mdi-trash-can"
                type="button"
              />
            </div>
            <div class="botoes-cadastro">
              <AlertaInfo
                v-if="alerta"
                :mensagem="mensagemAlerta"
                :fechar="fecharAlerta"
              ></AlertaInfo>
              <router-link to="/livros">
                <BotaoPadrao
                  conteudo="Cancelar"
                  :outlined="true"
                  type="button"
                ></BotaoPadrao>
              </router-link>
              <BotaoPadrao conteudo="Salvar" type="submit"></BotaoPadrao>
            </div>
          </section>
          <section id="wrapper-loader" v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </section>
        </v-form>
      </div>
      <div class="overlay-excluir-livro" v-if="showModalExcluirLivro">
        <div class="modal-excluir-livro" v-if="showModalExcluirLivro">
          <v-icon> mdi-trash-can </v-icon>
          <span> Você tem certeza que deseja excluir este livro? </span>
          <p>
            Caso exclua o livro, todos os seus exemplares também serão
            excluídos.
          </p>
          <section class="overlay-buttons">
            <span @click="toggleModalExcluirLivro">Cancelar</span>
            <span @click="deleteLivro">Excluir</span>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import AlertaInfo from "@/components/AlertaInfo.vue";
import BarraDeNavegacao from "@/components/BarraDeNavegacao.vue";
import ListaDeExemplares from "@/components/ListaDeExemplares.vue";
import BotaoPadrao from "@/components/BotaoPadrao.vue";
import { validarTokenAcesso } from "@/service/autenticacao.js";
import Webcam from "@/components/Webcam.vue";
import {
  updateLivro,
  getLivroById,
  getExemplarByLivroId,
  deleteLivro,
} from "../service/requisicao";

export default {
  props: ["id"],

  components: {
    BotaoPadrao,
    BarraDeNavegacao,
    AlertaInfo,
    ListaDeExemplares,
    Webcam,
  },

  data() {
    return {
      regrasTitulo: [
        (v) => !!v || "Insira um título!",
        (v) =>
          (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
        (v) =>
          /^[A-Za-zÀ-ü\s]+$/.test(v) ||
          "O nome deve conter apenas letras e acentos",
      ],
      regrasAutor: [
        (v) => !!v || "Insira um autor(a)!",
        (v) =>
          (v && v.length >= 3) ||
          "O nome do autor(a) deve ter pelo menos 3 caracteres",
        (v) =>
          /^[A-Za-zÀ-ü\s]+$/.test(v) ||
          "O nome do autor(a) deve conter apenas letras e acentos",
      ],
      regrasTipologiaTextual: [
        (v) => !!v || "Insira uma tipologia textual!",
        (v) =>
          (v && v.length >= 3) ||
          "A tipologia textual deve ter pelo menos 3 caracteres",
        (v) =>
          /^[A-Za-zÀ-ü\s]+$/.test(v) ||
          "A tipologia textual deve conter apenas letras e acentos",
      ],
      regrasPrateleira: [
        (v) => !!v || "Insira uma prateleira!",
        (v) =>
          /^[A-D]-([1-9]|1[0-2])$/.test(v) ||
          "Formato inválido de identificador de prateleira",
      ],
      formDesabilitado: false,
      alerta: false,
      isLoading: false,
      mensagemAlerta: "",
      tabSelecionado: "Manual",
      titulo: "",
      autor: "",
      tipologiaTextual: "",
      quantidade: "",
      prateleira: "",
      exemplaresArrayResponse: [],
      showModalExcluirLivro: false,
      imagemLivro: '',
      imageBlobUrl: null,
    };
  },

  methods: {
    toggleModalExcluirLivro() {
      this.showModalExcluirLivro = !this.showModalExcluirLivro;
    },

    fecharAlerta() {
      this.alerta = false;
    },

    atualizacaoExemplar(exemplar) {

    },

    async deleteLivro() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const requisicao = await deleteLivro(this.$route.params.id);
      if (requisicao.status === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoLivro("excluir"); // Passando 'excluir' como parâmetro
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    async buscarExemplares(livroId) {
      const requisicao = await getExemplarByLivroId(livroId);
      if (requisicao.status === 200) {
        this.exemplaresArrayResponse = requisicao.data;
        console.log(this.exemplaresArrayResponse);
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    async autenticarLivro() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const dadosEditarLivro = {
        titulo: this.titulo,
        autor: this.autor,
        tipologia: this.tipologiaTextual,
        quantidade: this.quantidade_disponivel,
        prateleira: this.prateleira,
      };
      const requisicao = await updateLivro(
        this.$route.params.id,
        dadosEditarLivro
      );
      if (requisicao.status === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoLivro();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    tratarSucessoLivro(tipo) {
      if (tipo === "excluir") {
        this.mensagemAlerta = "Livro excluído com sucesso!";
      } else {
        this.mensagemAlerta = "Livro atualizado com sucesso!";
      }
      this.alerta = true;
      setTimeout(() => {
        this.fecharAlerta();
      }, 5000);
    },

    tratarErroRequisicao(requisicao) {
      this.formDesabilitado = false;
      this.isLoading = false;
      const status = requisicao.request.status;
      if (status === 400) {
        this.mensagemAlerta = "Falha ao efetuar requisição!";
      } else if (status === 500) {
        this.mensagemAlerta =
          "Ops! Ocorreu algum problema interno no servidor!";
      } else {
        this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
      }

      this.alerta = true;
      setTimeout(() => {
        this.fecharAlerta();
      }, 5000);
    },

    async buscarInfoLivro(id) {
      const requisicao = await getLivroById(id);
      const livro = requisicao.data;
      console.log(livro);
      this.titulo = livro.titulo;
      this.autor = livro.autor;
      this.tipologiaTextual = livro.tipologia;
      this.quantidade = livro.quantidade_disponivel;
      this.prateleira = livro.Exemplares[0].prateleira;
      this.imagemLivro = livro.foto;

      this.convertBase64ToBlob()
    },

    convertBase64ToBlob() {
      const byteString = atob(this.imagemLivro.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: "image/png" });

      // Criar uma URL do Blob
      this.imageBlobUrl = URL.createObjectURL(blob);
    }
  },

  mounted() {
    validarTokenAcesso().then((token) => {
      if (!token) {
        router.push("/login");
      }
    });
  },

  created() {
    this.buscarExemplares(this.$route.params.id);
    this.buscarInfoLivro(this.$route.params.id);
  },
};
</script>

<!-- PRIMEIRA PARTE -->

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

  >>> .v-slide-group__content {
    justify-content: end;
  }

  >>> .v-tabs-slider {
    justify-content: end;
  }
}

[data-cy="tabs"] {
  flex: none;
}

#tab-cadastrar {
  width: 100%;
}

#upper-window {
  width: 102.4rem;
}

.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 4.8rem;

  >>> .v-input__slot {
    width: 95%;

    gap: 0.7rem;
  }

  #wrapper-conteudo {
    display: flex;
    flex-direction: row;
    width: 85%;
  }

  >>> .v-label {
    font: var(--body-large);
    color: var(--on-surface-variant);
  }

  >>> #radioGroup {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    gap: 8.4rem;
  }

  >>> .v-radio {
    margin-bottom: 0px;
    gap: 1.4rem;
  }
}

#credenciais {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  max-width: 80rem;
}

span {
  font: var(--title-medium);
  color: var(--primary);
}

#title-cadastrar-livro {
  font: var(--display-small);
  color: var(--black);
}

#window {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 10rem;

  >>> .v-input__slot {
    width: 90vw;
    max-width: 35rem;

    gap: 1.5rem;
  }
}

#wrapper-botoes {
  display: flex;

  width: 100%;
  max-width: 144rem;

  justify-content: space-between;
  gap: 4.8rem;
}

.botoes-cadastro {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
}

#area-foto {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 80rem;
}

#camera-options {
  border: transparent;
  background-color: transparent;
  color: var(--primary);
  font: var(--label-large);
}

.botoes-camera {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 2.5rem;

  width: 48%;
}

img {
  height: 22rem;
  width: 22rem;
}

/* SEGUNDA PARTE */

#lista-exemplares-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 60%;
  max-width: 100.8rem;
}

#title-listar-exemplar {
  font: var(--title-large);
}

#head-options {
  display: flex;
  flex-direction: row;
}

#head-options a {
  font: var(--title-medium);
  color: var(--primary);
}

span {
  font: var(--title-medium);
  color: var(--black);
}

#wrapper-lista {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  gap: 3rem;
}

#head-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  width: 100%;
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

.span2,
.span3 {
  display: flex;
  justify-content: center;
  align-items: center;
}

img:nth-child(2) {
  width: 40rem;
}

.overlay-excluir-livro {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #1a1c1e9d;

  z-index: 10;
}

.modal-excluir-livro {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  justify-content: center;
  align-items: center;

  position: fixed;

  border-radius: 2.8rem;
  padding: 2.4rem;

  background-color: var(--background);
  box-shadow: 0 4px 8px rgba(0, 0, 5, 0.5);

  z-index: 20;

  width: 30vw;
}

.modal-excluir-livro span {
  font: var(--headline-small);
}

.modal-excluir-livro p {
  font: var(--body-medium);
}

.modal-excluir-livro span:last-child,
.modal-excluir-livro span:nth-last-child(2) {
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

  width: 100%;

  gap: 2.5rem;
}
</style>
