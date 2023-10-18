<template>
    <div id="background">
        <div id="wrapper">

            <div>
                <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
            </div>

            <v-form
                id="formulario"
                ref="form"
                @submit.prevent="validate()"
            >
                <section id="credenciais">
                    <span>Cadastrar bibliotecário</span>
                    <div id="inputs">
                        <v-text-field
                            class="nome"
                            label="Nome"
                            v-model="nome"
                            outlined
                            required
                            :rules="regrasNome"
                        ></v-text-field>
                        <v-text-field
                            label="CPF"
                            v-model="cpf"
                            counter="11"
                            maxlength="11"
                            outlined
                            required
                            :rules="regrasCPF"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Senha"
                            v-model="senha"
                            outlined
                            required
                            :rules="regrasSenha"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Confirme sua senha"
                            v-model="confirmeSenha"
                            outlined
                            required
                            :rules="regrasConfirmeSenha"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </div>
                </section>
                
                <section id="senhaAdmin">
                    <span>Insira a senha do administrador</span>
                    <DropZone
                    extensaoDoArquivo="text/plain"
                    ></DropZone>
                </section>

                <section id="wrapper-botoes">
                    <router-link to="/login">
                        <BotaoPadrao
                        conteudo="Cancelar"
                        :outlined="true"
                        type="button"></BotaoPadrao>
                    </router-link>
                    <BotaoPadrao
                    conteudo="Continuar"
                    type="submit"></BotaoPadrao>
                </section>
            </v-form>
        </div>
    </div>
</template>

<script>
import sjcl from 'sjcl';
import BotaoPadrao from '@/components/BotaoPadrao.vue';
import DropZone from '@/components/DropZone.vue'

export default {

    data() {
        return {
            showPassword: false,
            nome: "",
            cpf: "",
            senha: "",
            confirmeSenha: "",
            regrasNome: [
                (v) => !!v || "Insira um nome!",
                (v) => (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
                (v) => /^[A-Za-z\s]+$/.test(v)|| "O nome deve conter apenas letras",
                (v) => /^[A-Za-z]+\s[A-Za-z]+$/.test(v) || "Informe um nome completo (Nome Sobrenome)",
            ],
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
            regrasConfirmeSenha: [
                (v) => !!v || "Confirme sua senha!",
                (v) => (v && v.length >= 8) || "Senha deve conter pelo menos 8 caracteres!",
                (v) => !/[ ]/.test(v) || "Não insira espaços!",
            ],
            valid: true,
            formDesabilitado: false,
            alerta: false,
            mensagemAlerta: '',
        }
    },

    components: {
        BotaoPadrao,
        DropZone,
    },

    methods: {
        async validate() {
            const valid = await this.$refs.form.validate()
            if (valid) {
                this.autenticar() 
            }
        },

        async autenticar() {
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
    },
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

    width: 100vw;
    max-width: 144rem;

    padding-bottom: 4rem;

    gap: 4.8rem;
}

img {
    width: 15rem;
    height: 5.6rem;
}

#formulario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 4.8rem;

    >>> .v-input__slot {
        width: 90vw;
        max-width: 50rem;
        
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

#credenciais {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 9rem;
}

#inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 3rem;
}

#senhaAdmin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 9rem;
}

#wrapper-botoes {
    display: flex;

    width: 90vw;
    max-width: 144rem;

    justify-content: end;
    gap: 4.8rem;
}

    
</style>