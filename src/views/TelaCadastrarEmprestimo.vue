<template>
    <div id="background">
        <div id="wrapper">
            <BarraDeNavegacao></BarraDeNavegacao>
            <span id="title-editar-leitor">Editar leitor</span>
            <div>
                <div
                    class="wrapper-camera"
                >
                    TESTE
                </div>
                <v-form
                    :disabled="formDesabilitado"
                    data-cy="formulario"
                    class="formulario"
                    ref="form"
                    @submit.prevent="validate()"
                >
                    <section
                        id="wrapper-formulario"
                    >
                        <v-text-field
                            data-cy="input-livro"
                            disabled
                            label="Livro"
                            v-model="titulo"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            data-cy="input-nome"
                            label="Nome"
                            v-model="nome"
                            outlined
                            required
                        ></v-text-field>
                        <v-text-field
                            data-cy="input-serie-disciplina"
                            disabled
                            label="Série/Disciplina"
                            v-model="serieDisciplina"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            data-cy="input-dataDevolucao"
                            disabled
                            label="Data de Devolução"
                            v-model="dataDevolucao"
                            outlined
                        ></v-text-field>
                    </section>
                    <section
                    id="wrapper-botoes"
                    v-if="!isLoading">
                    <AlertaInfo v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                    <div
                    @click="irParaEmprestimos">
                        <BotaoPadrao
                        conteudo="Cancelar"
                        :outlined="true"
                        type="button"
                        ></BotaoPadrao>
                    </div>
                    <BotaoPadrao
                        conteudo="Emprestar"
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
    </div>
</template>

<script>

import AlertaInfo from '@/components/AlertaInfo.vue'
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import { validarTokenAcesso } from "@/service/autenticacao.js";
import { getLivro, cadastrarLivro } from '@/service/requisicao.js'


export default {
    components: {
        BarraDeNavegacao,
        BotaoPadrao,
        AlertaInfo
    },

    data() {
        return {
            titulo: 'Diário de Anne Frank',
            nome: '',
            serieDisciplina: '',
            dataDevolucao: null,

            formDesabilitado: false,
            alerta: false,
            isLoading: false,
            mensagemAlerta: '',
        }
    },

    methods: {
        irParaEmprestimos() {
            this.$router.push({ path: '/emprestimos/'});
        },

        async buscarLivro(id) {
            const requisicao = await getLivro(id)

            const livro = requisicao.data

            this.livro = livro.titulo
        },

        async validate() {
            const valid = await this.$refs.form.validate()
            console.log(valid)
        },

        fecharAlerta() {
            this.alerta = false;
        },

        async cadastrarLivro() {
            this.formDesabilitado = true;
            this.isLoading = true;
            this.alerta = false;

            const dadosCadastrarEmprestimo = {
                idLivro: this.$route.params.id,
                idLeitor: this.idLeitor,
                dataDevolucao: this.dataDevolucao,
            }
        
            const requisicao = await cadastrarLivro(dadosCadastrarEmprestimo);

            if (requisicao === 200) {
                this.formDesabilitado = false;
                this.isLoading = false;
                this.tratarSucessoCadastro();
            } else {
                this.tratarErroRequisicao(requisicao);
            }
        },

        tratarSucessoCadastro() {
            this.mensagemAlerta = 'Cadastro atualizado com sucesso!';
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
        this.buscarLivro(this.$route.params.id)
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
}

span {
  font: var(--title-medium);
  color: var(--primary);
}

#wrapper-botoes {
  display: flex;

  width: 100%;
  max-width: 144rem;

  justify-content: end;
  gap: 4.8rem;
}

</style>