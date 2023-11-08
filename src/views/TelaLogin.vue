<template>
    <div
    id="background">
        <div id="wrapper">
            <v-card
                outlined
                id="card"
            >
                <v-form
                    id="formulario"
                    :disabled="formDesabilitado"
                    ref="form"
                    @submit.prevent="validate()"
                >
                    <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
                    <div>
                        <v-text-field
                            data-cy="input-cpf"
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
                            data-cy="input-senha"
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
                    <div id="alerta-wrapper">
                        <AlertaInfo data-cy="alerta" v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                        <BotaoPadrao conteudo="Entrar" data-cy="botao-login" type="submit"></BotaoPadrao>
                    </div>
                </v-form>
                <router-link to="/bibliotecario">
                    Cadastrar bibliotecário
                </router-link>
            </v-card>
        </div>
    </div>
</template>


<script>
import sjcl from 'sjcl';
import { fazerLogin, validarTokenAcesso } from "@/service/autenticacao.js";
import router from "@/router";
import AlertaInfo from '@/components/AlertaInfo.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue';

export default {
    data() {
        return {
            showPassword: false,
            cpf: "",
            senha: "",
            regrasCPF: [
                (v) => !!v || "Insira um cpf!",
                (v) => !/[ ]/.test(v) || "Não insira espaços!",
                (v) => !/^[0-9]*$/.test(v) ? "Digite apenas números!" : true,
                (v) => (v && v.length === 11) || "Deve ter exatamente 11 dígitos",
            ],
            regrasSenha: [
                (v) => !!v || "Insira uma senha!",
                (v) => (v && v.length >= 8) || "Senha deve conter pelo menos 8 caracteres!",
                (v) => !/[ ]/.test(v) || "Não insira espaços!",
            ],
            formDesabilitado: false,
            isLoading: false,
            alerta: false,
            mensagemAlerta: '',
        }
    },

    mounted() {
        validarTokenAcesso().then((token) => {
            if (token) {
                router.push('/emprestimos');
            }
        })
    },

    components: {
        AlertaInfo,
        BotaoPadrao
    },
    
    methods: {
        async validate() {
            const valid = await this.$refs.form.validate()
            if (valid) {
                this.autenticar() 
            }
        },

        async autenticar() {
            this.formDesabilitado = true;
            this.isLoading =true;

            const dadosLogin = {
                cpf: this.criptografarDado(this.cpf),
                senha: this.criptografarDado(this.senha)
            }
            
            const requisicao = await fazerLogin(dadosLogin);

            if (requisicao === 200) {
                this.formDesabilitado = false;
                router.push("/emprestimos");
            } else {
                this.tratarErroRequisicao(requisicao);
            }
        },

        criptografarDado(dado) {
            const bitArray = sjcl.hash.sha256.hash(dado);
            const hash = sjcl.codec.hex.fromBits(bitArray);
            return hash;
        },

        tratarErroRequisicao(requisicao) {
            this.formDesabilitado = false;
            this.isLoading = false;

            const status = requisicao.request.status;
            if (status === 401) {
                this.mensagemAlerta = "Usuário/Senha inválido!";
            } else if (status === 500) {
                this.mensagemAlerta = "Ops! Ocorreu algum problema interno no servidor!";
            }
            else {
                this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
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

    height: 68rem;
    width: 45rem;

    border-radius: 2rem;

    gap: 2rem;
}

#formulario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 8rem;

    >>> .v-input__slot {
        gap: 1.5rem;
    }

    >>> .v-label {
        font: var(--body-large);
        color: var(--on-surface-variant);
    }

    >>> .v-icon {
        color: var(--primary);
    }

    >>> .v-input--is-focused:first-child legend {
        width: 7.5rem !important;
    }

    >>> .v-input--is-label-active:first-child legend {
        width: 7.5rem !important;
    }

    >>> .v-input--is-focused:last-child legend {
        width: 8.5rem !important;
    }

    >>> .v-input--is-label-active:last-child legend {
        width: 8.5rem !important;
    }
}

#alerta-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1.5rem;
}

#botaoEntrar {
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

@media only screen and (min-width: 1440px) {
  #wrapper {
    justify-content: center;
  }
}


</style>