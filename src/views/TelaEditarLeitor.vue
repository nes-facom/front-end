<template>
    <div id="background">
        <div id="wrapper">
            <BarraDeNavegacao></BarraDeNavegacao>
            <span id="title-editar-leitor">Editar leitor</span>
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
                        v-model="turnoEscolhido"
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
                <div
                @click="irParaDetalhes">
                  <BotaoPadrao
                  conteudo="Cancelar"
                  :outlined="true"
                  type="button"
                  ></BotaoPadrao>
                </div>
                <BotaoPadrao
                conteudo="Editar"
                type="submit"
                ></BotaoPadrao>
                </section>
                <section
                id="wrapper-loader"
                v-if="isLoading">
                    <v-progress-circular indeterminate></v-progress-circular>
                </section>
            </v-form>
        </div>
    </div>
</template>

<script>

import AlertaInfo from '@/components/AlertaInfo.vue'
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import { validarTokenAcesso } from "@/service/autenticacao.js";
import { getLeitor, updateLeitor } from '@/service/requisicao.js'

export default {
    props: ['id'],

    components: {
        BarraDeNavegacao,
        BotaoPadrao,
        AlertaInfo
    },

    data() {
    return {
      regrasNome: [
        (v) => !!v || "Insira um nome!",
        (v) => (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
        (v) => /^[A-Za-zÀ-ú\s]+$/.test(v)|| "O nome deve conter apenas letras e espaços",
        (v) => (v.trim().includes(' ')) || "Informe um nome completo (Nome Sobrenome)"
      ],
      disciplinas: ["Arte",
      "Ciências Naturais",
      "Educação Física",
      "Geografia",
      "História",
      "Inglês",
      "Matemática",
      "Português",
      "Regente"],
      turnos: ['Matutino',
      'Vespertino'],
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
      turnoEscolhido: '',
      serieEscolhida: '',
      turmaEscolhida: '',
    }
  },

  methods: {
    irParaDetalhes() {
      this.$router.push({ path: `/leitores/detalhes/${this.$route.params.id}`});
    },

    async buscarInfoLeitor(id) {
      const requisicao = await getLeitor(id)
      const leitor = requisicao.data
      this.nome = leitor.nome
      this.radioGroup = leitor.tipo
      if (leitor.tipo === "Docente") {
        this.disciplinaEscolhida = leitor.disciplina
        this.turnoEscolhido = leitor.turno
      } else {
        this.serieEscolhida = leitor.serieEscolhida
        this.turmaEscolhida = leitor.turma
      }
    },

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

          } else if (this.turnoEscolhido === '') {
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

      const dadosEditarDocente = {
        nome: this.nome,
        tipo: this.radioGroup,
        disciplina: this.disciplinaEscolhida,
        turno: this.turnoEscolhido,
      }
      
      const requisicao = await updateLeitor(this.$route.params.id, dadosEditarDocente);

      if (requisicao === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoDocente();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    async autenticarDiscente() {
      this.formDesabilitado = true;
      this.isLoading = true;
      this.alerta = false;

      const dadosEditarDiscente = {
        nome: this.nome,
        tipo: this.radioGroup,
        serie: this.serieEscolhida,
        turma: this.turmaEscolhida,
      }
      
      const requisicao = await updateLeitor(this.$route.params.id, dadosEditarDiscente);

      if (requisicao === 200) {
        this.formDesabilitado = false;
        this.isLoading = false;
        this.tratarSucessoDiscente();
      } else {
        this.tratarErroRequisicao(requisicao);
      }
    },

    tratarSucessoDocente() {
      this.mensagemAlerta = 'Docente atualizado com sucesso!';
      this.alerta = true;
      setTimeout(() => {
        this.fecharAlerta();
      }, 5000);
    },

    tratarSucessoDiscente() {
      this.mensagemAlerta = 'Discente atualizado com sucesso!';
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
  },



  mounted() {
    validarTokenAcesso().then((token) => {
      if (!token) {
        router.push('/login');
      }
    })
  },

  created() {
    this.buscarInfoLeitor(this.$route.params.id)
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

#title-editar-leitor {
    font: var(--display-small);
    color: var(--black);
}

.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  gap: 4.8rem;

  >>> .v-input__slot {
    width: 100%;
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

  width: 100%;
  max-width: 80rem;

  gap: 3rem;
}

span {
  font: var(--title-medium);
  color: var(--primary);
}

#window {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 10rem;

  >>> .v-input__slot {
    width: 100%;
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

</style>