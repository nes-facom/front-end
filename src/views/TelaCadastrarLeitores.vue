<template>
  <div id="background">
    <div 
    id="wrapper">
      <span>Cadastrar leitor</span>
      <!-- Switch manual / csv -->
      <v-form
        :disabled="formDesabilitado"
        data-cy="formulario"
        id="formulario"
        ref="form"
        @submit.prevent="validate()"
      >
        <section id="credenciais">
            <div id="inputs">
                <v-text-field
                    data-cy="input-nome"
                    label="Nome"
                    v-model="nome"
                    outlined
                    required
                    :rules="regrasNome"
                ></v-text-field>
                <!-- Tipo de leitor -->
                
                <!-- Disciplina e Turno -->
            </div>
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
    </div>
  </div>
</template>

<script>

import BotaoPadrao from '@/components/BotaoPadrao.vue'

export default {
    data() {
      return {
        nome: '',
        regrasNome: [
          (v) => !!v || "Insira um nome!",
          (v) => (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
          (v) => /^[A-Za-z\s]+$/.test(v)|| "O nome deve conter apenas letras",
          (v) => /^[A-Za-z]+\s[A-Za-z]+$/.test(v) || "Informe um nome completo (Nome Sobrenome)",
        ],
        formDesabilitado: false,
        alerta: false,
        isLoading: false,
        mensagemAlerta: '',
      }
    },

    components: {
      BotaoPadrao,
    }
}

</script>

<style scoped>

#background {
    display: flex;
    justify-content: center;
    align-items: center;
}

#wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 80%;
    max-width: 144rem;

    padding-bottom: 4rem;

    gap: 4.8rem;
}

#formulario {
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
}

span {
    font: var(--display-small);
    color: var(--black);
}


    
</style>