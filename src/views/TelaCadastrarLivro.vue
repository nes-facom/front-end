<template>
  <div id="background" data-app>
    <div id="wrapper">
      <BarraDeNavegacao></BarraDeNavegacao>
      <span id="title-cadastrar-livro">Cadastrar novo livro</span>
      <div id="upper-window">
        <v-form
          :disabled="formDesabilitado"
          data-cy="formulario"
          class="formulario"
          ref="form"
          @submit.prevent="autenticarLivro"
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
                v-model="tipologia"
                outlined
                required
                :rules="regrasTipologiaTextual"
              >
              </v-text-field>
              <v-text-field
                data-cy="input-quantidade"
                label="Quantidade"
                v-model="quantidade"
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
                <v-btn id="camera-options">Repetir</v-btn>
                <v-btn id="camera-options">
                  <v-icon>mdi-camera</v-icon>
                  Tirar Foto
                </v-btn>
              </div>
            </div>
          </div>
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
import BotaoPadrao from "@/components/BotaoPadrao.vue";
import { cadastrarLivro } from "@/service/requisicao.js";
import { validarTokenAcesso } from "@/service/autenticacao.js";

export default {
  data() {
    return {
      regrasTitulo: [
        (v) => !!v || "Insira um título!",
        (v) =>
          (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
        (v) =>
          /^[A-Za-zÀ-ü\s]+$/.test(v) ||
          "O nome deve conter apenas letras e acentos",
        (v) =>
          /^[A-Za-zÀ-ü]+\s[A-Za-zÀ-ü]+$/.test(v) ||
          "Informe um nome completo (Nome Sobrenome)",
      ],
      regrasAutor: [
        (v) => !!v || "Insira um autor(a)!",
        (v) =>
          (v && v.length >= 3) ||
          "O nome do autor(a) deve ter pelo menos 3 caracteres",
        (v) =>
          /^[A-Za-zÀ-ü\s]+$/.test(v) ||
          "O nome do autor(a) deve conter apenas letras e acentos",
        (v) =>
          /^[A-Za-zÀ-ü]+\s[A-Za-zÀ-ü]+$/.test(v) ||
          "Informe um nome completo (Nome Sobrenome)",
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
      regrasQuantidade: [
        (v) => !!v || "Insira uma quantidade!",
        (v) => /^[0-9]+$/.test(v) || "A quantidade deve conter apenas números",
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
      tipologia: "",
      quantidade: "",
      prateleira: "",
    };
  },

  components: {
    BotaoPadrao,
    BarraDeNavegacao,
    AlertaInfo,
  },

  mounted() {
    validarTokenAcesso().then((token) => {
      if (!token) {
        router.push("/login");
      }
    });
  },

  methods: {
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
        tipologia: this.tipologia,
        quantidade: this.quantidade,
        prateleira: this.prateleira,
      };

      console.log(dadosCadastrarLivro);

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

  width: 100%;

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
  color: var(--primary);
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

#csv {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8rem;
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
</style>
