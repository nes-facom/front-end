<template>
    <div
    id="background">
        <div id="wrapper">
            <v-card
                outlined
                id="card"
                >
                <v-form
                    id="form"
                    :disabled="formDesabilitado"
                    ref="form"
                    @submit.prevent="validate()"
                >
                    <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
                    <div>
                        <v-text-field
                            label="CPF"
                            v-model="cpf"
                            counter="11"
                            maxlength="11"
                            prepend-inner-icon="mdi-account"
                            outlined
                            required
                            :rules="regrasCPF"
                        ></v-text-field>
                        <v-text-field
                            prepend-inner-icon="mdi-key"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Senha"
                            v-model="senha"
                            outlined
                            required
                            :rules="regrasSenha"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </div>
                    <AlertaInfo v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                    <div class="loader" v-if="this.formDesabilitado">
                        <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                    <v-btn
                        id="button"
                        rounded
                        elevation="0"
                        type="submit"
                        :diabled="btnLogar"
                    >
                        Entrar
                    </v-btn>
                </v-form>
                <a href="#">Cadastrar bibliotecário</a>
            </v-card>
        </div>
    </div>
</template>


<script>
import bcrypt from 'bcryptjs';
import { fazerLogin } from "../service/autenticacao.js";
import router from "@/router";
import AlertaInfo from '../components/AlertaInfo.vue';

export default {
    data() {
        return {
            showPassword: false,
            cpf: "",
            senha: "",
            regrasCPF: [
                (v) => !!v || "Insira um cpf!",
                (v) => !/[ ]/.test(v) || "Não insira espaços!",
            ],
            regrasSenha: [
                (v) => !!v || "Insira uma senha!",
                (v) => (v && v.length >= 8) || "Senha deve conter pelo menos 8 caracteres!",
                (v) => !/[ ]/.test(v) || "Não insira espaços!",
            ],
            valid: true,
            formDesabilitado: false,
            btnLogar: true,
            alerta: false,
            mensagemAlerta: '',
        }
    },

    components: {
        AlertaInfo,
    },
    
    methods: {
        async validate() {
                this.autenticar();
        },

        async autenticar() {
            this.formDesabilitado = true;

            const dadosLogin = {
                cpf: this.criptografarDado(this.cpf),
                senha: this.criptografarDado(this.senha)
            }
            
            const requisicao = await fazerLogin(dadosLogin);
            if (requisicao === 200) {
                this.formDesabilitado = false;
                router.push("/admin");
            } else {
                this.tratarErroRequisicao(requisicao);
            }
        },

        criptografarDado(dado) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(dado, salt);
            return hash;
        },

        tratarErroRequisicao(requisicao) {
            this.formDesabilitado = false;
            this.btnLogar = true;

            const status = requisicao.request.status;
            if (status === 401) {
                this.mensagemAlerta = "Usuário/Senha inválido!"
            } else if (status === 500) {
                this.mensagemAlerta = "Ops! Ocorreu algum problema interno no servidor!"
            }
            else {
                this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
                console.log(status);
            }

            this.alerta = true;
            setTimeout(() => {
                this.fecharAlerta();
            }, 5000);
        },

        fecharAlerta() {
            this.alerta = false;
        },
    }
}

</script>

<style scoped>

#background {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;

    background-image: url('@/components/icons/BackgroundLogin.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

#wrapper {
    display: flex;
    justify-content: end;
    align-items: center;
    
    height: 100vh;
    width: 100vw;
    max-width: 144rem;

    padding-inline: 2rem;
}

#card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 70rem;
    width: 35vw;
    min-width: 40rem;
    min-height: 65rem;
    max-height: 90rem;

    border-radius: 2rem;

    gap: 2rem;
}

#form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 8rem;

    ::v-deep .v-input__slot {
        gap: 1.5rem;
    }

    ::v-deep .v-label {
        font: var(--body-large);
        color: var(--on-surface-variant);
    }

    ::v-deep .v-icon {
        color: var(--primary);
    }

    ::v-deep .v-input--is-focused:first-child legend {
        width: 7.5rem !important;
    }

    ::v-deep .v-input--is-label-active:first-child legend {
        width: 7.5rem !important;
    }

    ::v-deep .v-input--is-focused:last-child legend {
        width: 8.5rem !important;
    }

    ::v-deep .v-input--is-label-active:last-child legend {
        width: 8.5rem !important;
    }
}

#button {
    background-color: var(--primary);
    color: var(--on-primary);
    width: fit-content; 
}

a {
    font: var(--label-large);
    color: var(--primary);
    text-decoration: none;
}

@media only screen and (max-width: 768px) {
  #wrapper {
    justify-content: center;
  }
}


</style>