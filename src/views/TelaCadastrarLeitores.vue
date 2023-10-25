<template>
  <div id="background" data-app>
    <div 
    id="wrapper">
      <span>Cadastrar leitor</span>
      <v-tabs
      data-cy="tabs"
      v-model="tabSelecionado">
        <v-tab
          data-cy="tab-manual"
          value="Manual"
        >Manual</v-tab>
        <v-tab
          data-cy="tab-csv"
          value="CSV"
        >CSV</v-tab>
      </v-tabs>
        <v-window v-model="tabSelecionado">
          <v-window-item :value="0">
            <v-form
              :disabled="formDesabilitado"
              data-cy="formulario"
              class="formulario"
              ref="form"
              @submit.prevent="validate()"
            >
              <section id="credenciais">
                  <v-text-field
                      data-cy="input-nome"
                      label="Nome"
                      v-model="nome"
                      outlined
                      required
                      :rules="regrasNome"
                  ></v-text-field>
                  <!-- Tipo de leitor -->
                  <span>Tipo de leitor</span>
                  <v-radio-group v-model="radioGroup" id="radioGroup">
                    <v-radio
                      label="Docente"
                      value="Docente"
                    ></v-radio>
                    <v-radio
                      label="Discente"
                      value="Discente"
                    ></v-radio>
                  </v-radio-group>
                  <!-- Disciplina e Turno -->
                  <v-window v-model="radioGroup">
                    <v-window-item value="Docente" id="window">
                      <v-select
                        data-cy="select-disciplina"
                        dense
                        label="Disciplina"
                        outlined
                        v-model="disciplinaEscolhida"
                        :items="disciplinas"
                      ></v-select>
                      <v-select
                        data-cy="select-turno"
                        dense
                        label="Turno"
                        outlined
                        v-model="turnoEsolhido"
                        :items="turnos"
                      ></v-select>
                    </v-window-item>
                    <v-window-item value="Discente" id="window">
                      <v-select
                        data-cy="select-serie"
                        dense
                        label="Série"
                        outlined
                        v-model="serieEscolhida"
                        :items="series"
                      ></v-select>
                      <v-select
                        data-cy="select-turma"
                        dense
                        label="Turma"
                        outlined
                        v-model="turmaEscolhida"
                        :items="turmas"
                      ></v-select>
                    </v-window-item>
                  </v-window>
              </section>
              <section
              id="wrapper-botoes"
              v-if="!isLoading">
                <AlertaInfo v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                <router-link to="/leitores">
                    <BotaoPadrao
                    conteudo="Cancelar"
                    :outlined="true"
                    type="button"></BotaoPadrao>
                </router-link>
                <BotaoPadrao
                conteudo="Cadastrar"
                type="submit"
                ></BotaoPadrao>
              </section>
              <section
              id="wrapper-loader"
              v-if="isLoading">
                  <v-progress-circular indeterminate></v-progress-circular>
              </section>
            </v-form>
          </v-window-item>
          <v-window-item :value="1" id="csv">
            <DropZone extensaoDoArquivo=".csv"></DropZone>
            <section
              id="wrapper-botoes"
              v-if="!isLoading">
                <AlertaInfo v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                <router-link to="/leitores">
                    <BotaoPadrao
                    conteudo="Cancelar"
                    :outlined="true"
                    type="button"></BotaoPadrao>
                </router-link>
                <BotaoPadrao
                conteudo="Importar"
                type="button"
                @click="importarCSV"
                ></BotaoPadrao>
              </section>
              <section
              id="wrapper-loader"
              v-if="isLoading">
                  <v-progress-circular indeterminate></v-progress-circular>
              </section>
          </v-window-item>
        </v-window>
    </div>
  </div>
</template>

<script>

import router from "@/router";
import AlertaInfo from '@/components/AlertaInfo.vue'
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import DropZone from '@/components/DropZone.vue'
import { cadastrarDocente, cadastrarDiscente } from "@/service/requisicao.js"
// import { validarTokenAcesso } from "@/service/autenticacao.js";

export default {
  data() {
    return {
      regrasNome: [
        (v) => !!v || "Insira um nome!",
        (v) => (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
        (v) => /^[A-Za-z\s]+$/.test(v)|| "O nome deve conter apenas letras",
        (v) => /^[A-Za-z]+\s[A-Za-z]+$/.test(v) || "Informe um nome completo (Nome Sobrenome)",
      ],
      disciplinas: ['Língua Portuguesa',
      'Matemática', 
      'Física',
      'Química',
      'Biologia',
      'História',
      'Geografia',
      'Filosofia',
      'Sociologia',
      'Inglês',
      'Espanhol',
      'Educação Física',
      'Artes',
      'Ensino Religioso',
      'Sociologia',
      'Filosofia',
      'Outra'],
      turnos: ['Matutino',
      'Vespertino',
      'Noturno'],
      series: ['Grupo 4',
      'Grupo 5',
      '1°',
      '2°',
      '3°',
      '4°',
      '5°',
      '6°',
      '7°',
      '8°',
      '9°'],
      turmas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'],
      formDesabilitado: false,
      alerta: false,
      isLoading: false,
      mensagemAlerta: '',
      tabSelecionado: 'Manual',
      nome: '',
      radioGroup: 'Docente',
      disciplinaEscolhida: '',
      turnoEsolhido: '',
      serieEscolhida: '',
      turmaEscolhida: '',
    }
  },

  components: {
    BotaoPadrao,
    AlertaInfo,
    DropZone,
  },

  // mounted() {
  //   validarTokenAcesso().then((token) => {
  //     if (!token) {
  //       router.push('/login');
  //     }
  //   })
  // },

  methods: {
    async validate() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        if(this.radioGroup === 'Docente') {
          if (this.disciplinaEscolhida === '') {
            this.mensagemAlerta = "Selecione uma disciplina!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else if (this.turnoEsolhido === '') {
            this.mensagemAlerta = "Selecione um turno!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else {
            this.autenticarDocente()
          }
        } else {
          if (this.serieEscolhida === '') {
            this.mensagemAlerta = "Selecione uma série!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else if (this.turmaEscolhida === '') {
            this.mensagemAlerta = "Selecione uma turma!";
            this.alerta = true;

            setTimeout(() => {
              this.fecharAlerta();
            }, 5000);
          } else {
            this.autenticarDiscente()
          }
        }
      }
    },

    fecharAlerta() {
      this.alerta = false;
    },

    async autenticarDocente() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const dadosCadastrarDocente = {
        nome: this.nome,
        disciplina: this.disciplinaEscolhida,
        turno: this.turnoEscolhido,
      }
      
      const requisicao = await cadastrarDocente(dadosCadastrarDocente);

      if (requisicao === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoDocente();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    tratarSucessoDocente() {
      this.mensagemAlerta = 'Docente cadastrado com sucesso!';
      this.alerta = true;
      setTimeout(() => {
        this.fecharAlerta();
      }, 5000);
    },

    async autenticarDiscente() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const dadosCadastrarDiscente = {
        nome: this.nome,
        disciplina: this.serieEscolhida,
        turno: this.turmaEscolhida,
      }
      
      const requisicao = await cadastrarDiscente(dadosCadastrarDiscente);

      if (requisicao === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoDiscente();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    tratarSucessoDiscente() {
      this.mensagemAlerta = 'Discente cadastrado com sucesso!';
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
        this.mensagemAlerta = 'Falha ao efetuar requisição!';
      } else if (status === 500) {
        this.mensagemAlerta = 'Ops! Ocorreu algum problema interno no servidor!';
      } else {
        this.mensagemAlerta = 'Um erro inesperado aconteceu, busque suporte!';
      }

      this.alerta = true;
      setTimeout(() => {
        this.fecharAlerta();
      }, 5000);
    },

    importarCSV(){
      console.log('importando...')
    }
  }
}

</script>

<style scoped>

#background {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
}

#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  max-width: 144rem;

  height: 100%;

  padding-bottom: 4rem;

  gap: 4.8rem;

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

.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  gap: 4.8rem;

  >>> .v-input__slot {
    width: 90vw;
    max-width: 80rem;
    
    gap: 1.5rem;
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

  gap: 3rem;
}

span {
  font: var(--title-medium);
  color: var(--primary);
}

span:first-child {
  font: var(--display-small);
  color: var(--black);
}

#window {
  display: flex;
  justify-content: start;
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
  justify-content: center;
  align-items: center;

  gap: 10rem;
}

#wrapper-botoes {
  display: flex;

  width: 100%;
  max-width: 144rem;

  justify-content: end;
  gap: 4.8rem;
}
    
</style>