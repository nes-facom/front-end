<template>
    <div id="background">
        <div 
        id="wrapper"
        v-if="!isBibliotecarioCadastrado">

            <div>
                <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
            </div>

            <v-form
                :disabled="formDesabilitado"
                data-cy="formulario"
                id="formulario"
                ref="form"
                @submit.prevent="validate()"
            >
                <section id="credenciais">
                    <span>Cadastrar bibliotecário</span>
                    <div id="inputs">
                        <v-text-field
                            data-cy="input-nome"
                            label="Nome"
                            v-model="nome"
                            outlined
                            required
                            :rules="regrasNome"
                        ></v-text-field>
                        <v-text-field
                            data-cy="input-cpf"
                            label="CPF"
                            v-model="cpf"
                            counter="11"
                            maxlength="11"
                            outlined
                            required
                            :rules="regrasCPF"
                        ></v-text-field>
                        <v-text-field
                            data-cy="input-senha"
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
                            data-cy="input-confirmeSenha"
                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            label="Confirme sua senha"
                            v-model="confirmeSenha"
                            outlined
                            required
                            :rules="regrasConfirmeSenha"
                            @click:append="showConfirmPassword = !showConfirmPassword"
                        ></v-text-field>
                    </div>
                </section>
                
                <section id="senhaAdmin">
                    <span>Insira a senha do administrador</span>
                    <DropZone
                    extensaoDoArquivo=".txt"
                    :isDisabled="isLoading"
                    ></DropZone>
                </section>
                
                <section
                id="wrapper-botoes"
                v-if="!isLoading">
                    <AlertaInfo v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                    <router-link to="/login">
                        <BotaoPadrao
                        conteudo="Cancelar"
                        :outlined="true"
                        type="button"></BotaoPadrao>
                    </router-link>
                    <BotaoPadrao
                    conteudo="Continuar"
                    type="submit"
                    :isDisabled="arquivoSenhaBibliotecario === null"></BotaoPadrao>
                </section>
                <section
                id="wrapper-loader"
                v-if="isLoading">
                    <v-progress-circular indeterminate></v-progress-circular>
                </section>
            </v-form>
        </div>
        <div
        id="wrapper-cadastro-sucesso"
        v-if="isBibliotecarioCadastrado">
            <div>
                <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
            </div>

            <span>Bibliotecário cadastrado com sucesso!</span>

            <section id="wrapper-botoes">
                <router-link to="/login">
                    <BotaoPadrao
                    conteudo="Fazer login"
                    type="button"></BotaoPadrao>
                </router-link>
            </section>
        </div>
    </div>
</template>

<script>
import sjcl from 'sjcl';
import BotaoPadrao from '@/components/BotaoPadrao.vue';
import DropZone from '@/components/DropZone.vue'
import AlertaInfo from '@/components/AlertaInfo.vue'
import { cadastrarBibliotecario } from "@/service/requisicao.js";

export default {

    data() {
        return {
            showPassword: false,
            showConfirmPassword: false,
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
            alerta: false,
            mensagemAlerta: '',
            conteudoArquivo: null,
            isBibliotecarioCadastrado: false,
            formDesabilitado: false,
            isLoading: false,
        }
    },

    components: {
        BotaoPadrao,
        DropZone,
        AlertaInfo,
    },

    methods: {
        async validate() {
            const valid = await this.$refs.form.validate()
            if (valid) {
                const passwordValid = this.senha === this.confirmeSenha
                if(passwordValid) {
                    await this.formatarSenhaAdmin()
                        this.autenticar()
                } else {
                    this.confirmeSenha = ''
                    this.mensagemAlerta = "Senha inválida. Confirme a senha novamente!";
                    this.alerta = true;

                    setTimeout(() => {
                        this.fecharAlerta();
                    }, 5000);
                }
            }
        },
        
        fecharAlerta() {
            this.alerta = false;
        },

        async autenticar() {
                this.formDesabilitado = true;
                this.isLoading = true;
                this.alerta = false;

                const dadosCadastrarBibliotecario = {
                    nome: this.nome,
                    cpf: this.criptografarDado(this.cpf),
                    senha: this.criptografarDado(this.senha),
                    senhaAdmin: this.conteudoArquivo
                } 
                
                const requisicao = await cadastrarBibliotecario(dadosCadastrarBibliotecario);
    
                if (requisicao === 200) {
                    this.formDesabilitado = false;
                    this.isLoading = false;
                    this.bibliotecarioCadastrado()
                } else {
                    this.tratarErroRequisicao(requisicao);
                }
        },

        async formatarSenhaAdmin() {
            return new Promise((resolve, reject) => {
                const arquivo = this.arquivoSenhaBibliotecario;

                if (arquivo) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.conteudoArquivo = e.target.result;
                    resolve();
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsText(arquivo);
                } else {
                reject("Nenhum arquivo fornecido.");
                }
            });
        },

        criptografarDado(dado) {
            const bitArray = sjcl.hash.sha256.hash(dado);
            const hash = sjcl.codec.hex.fromBits(bitArray);
            return hash;
        },

        bibliotecarioCadastrado() {
            this.isBibliotecarioCadastrado = true
        },

        tratarErroRequisicao(requisicao) {
            this.formDesabilitado = false;
            this.isLoading = false;
            const status = requisicao.request.status;
            if (status === 401) {
                this.mensagemAlerta = "Senha do Administrador inválida!"
            } else if (status === 500) {
                this.mensagemAlerta = "CPF já cadastrado! Por favor cadastre um novo CPF."
            } else {
                this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
            }

            this.alerta = true;
            setTimeout(() => {
                this.fecharAlerta();
            }, 5000);
        },
    },

    computed: {
        arquivoSenhaBibliotecario() {
            return this.$store.state.arquivoSenhaBibliotecario;
        },
        senhaAdmin() {
            return this.$store.getters.senhaAdmin;
        },
    },

    beforeRouteLeave(to, from, next) {
        this.$store.commit("limparNomeArquivoSenhaBibliotecario");
        this.$store.commit("limparSalvarArquivoSenhaBibliotecario");
        next();
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

#wrapper-cadastro-sucesso {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 100vw;
    height: 95vh;
}

#wrapper-cadastro-sucesso img{
    width: 25rem;
    height: 8rem;
}
    
</style>