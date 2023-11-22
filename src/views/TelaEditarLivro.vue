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
          @submit.prevent="validate()"
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
                required
                :rules="regrasQuantidade"
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
              <img src="../assets/images/area-foto.png" />
              <div class="botoes-camera">
                <v-btn id="camera-options">
                  <v-icon>mdi-camera</v-icon>
                  Tirar nova Foto
                </v-btn>
              </div>
            </div>
          </div>

          <!-- LISTAGEM DE EXEMPLARES -->

          <span id="title-listar-exemplar">Lista de exemplares</span>
          <ListaDeExemplares></ListaDeExemplares>

          <section id="wrapper-botoes" v-if="!isLoading">
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
            <BotaoPadrao conteudo="Cadastrar" type="submit"></BotaoPadrao>
          </section>
          <section id="wrapper-loader" v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </section>
        </v-form>
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
import { cadastrarLivro } from "@/service/requisicao.js";
import { validarTokenAcesso } from "@/service/autenticacao.js";

export default {
  data() {
    return {
      formDesabilitado: false,
      alerta: false,
      isLoading: false,
      mensagemAlerta: "",
      tabSelecionado: "Manual",
      titulo: "Diário de Anne Frank",
      autor: "Anne Frank",
      tipologiaTextual: "Autobiografia",
      quantidade: "8",
      prateleira: "B12",
    };
  },

  components: {
    BotaoPadrao,
    BarraDeNavegacao,
    AlertaInfo,
    ListaDeExemplares,
  },

  mounted() {
    validarTokenAcesso().then((token) => {
      if (!token) {
        router.push("/login");
      }
    });
  },

  methods: {
    async validate() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        if (this.radioGroup === "Docente") {
          if (this.disciplinaEscolhida === "") {
            this.mensagemAlerta = "Selecione uma disciplina!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else if (this.turnoEscolhido === "") {
            this.mensagemAlerta = "Selecione um turno!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else {
            this.autenticarDocente();
          }
        } else {
          if (this.serieEscolhida === "") {
            this.mensagemAlerta = "Selecione uma série!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else if (this.turmaEscolhida === "") {
            this.mensagemAlerta = "Selecione uma turma!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else {
            this.autenticarDiscente();
          }
        }
      }
    },

    fecharAlerta() {
      this.alerta = false;
    },

    async autenticarLivro() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const dadosCadastrarLivro = {
        titulo: this.titulo,
        autor: this.autor,
        tipologiaTextual: this.tipologiaTextual,
        quantidade: this.quantidade,
        prateleira: this.prateleira,
      };

      const requisicao = await cadastrarLivro(dadosCadastrarLivro);

      if (requisicao === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoLivro();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    tratarSucessoLivro() {
      this.mensagemAlerta = "Livro cadastrado com sucesso!";
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

  justify-content: end;
  gap: 4.8rem;
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
</style>
