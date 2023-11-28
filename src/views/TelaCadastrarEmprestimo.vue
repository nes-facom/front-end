<template>
    <div id="background">
        <div id="wrapper">
            <BarraDeNavegacao></BarraDeNavegacao>
            <span id="title-editar-leitor">Cadastrar empréstimo</span>
            <div
                class="wrapper-tela-cadastro"
            >
                <Webcam :fotoBtnVisivel="false" @imagem64="salvarFoto" :solicitarImagem="pedirFoto" :emprestimo="true"/>
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
                            hide-details
                            label="Livro"
                            v-model="titulo"
                            outlined
                        ></v-text-field>
                        <v-autocomplete
                            v-model="select"
                            :loading="loadingAutocomplete"
                            :items="items"
                            :search-input.sync="search"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            label="Nome"
                            @change="buscarAtributos"
                        ></v-autocomplete>
                        <v-text-field
                            data-cy="input-serie-disciplina"
                            disabled
                            hide-details
                            label="Série/Disciplina"
                            v-model="serieDisciplina"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            data-cy="input-dataDevolucao"
                            disabled
                            hide-details
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
import Webcam from '@/components/Webcam.vue'
import { validarTokenAcesso } from "@/service/autenticacao.js";
import { getLivro, cadastrarLivro, getLeitorPorNome, getLeitorInteiro, cadastrarEmprestimo } from '@/service/requisicao.js'


export default {
    components: {
        BarraDeNavegacao,
        BotaoPadrao,
        AlertaInfo,
        Webcam,
    },

    data() {
        return {
            titulo: '',
            serieDisciplina: '',
            select: '',
            loadingAutocomplete: false,
            items: [],
            itemsObject: [],
            search: '',
            idLeitor: null,
            foto: null,

            formDesabilitado: false,
            alerta: false,
            isLoading: false,
            mensagemAlerta: '',
        }
    },

    computed: {
        dataDevolucao() {
            const dataDevolucao = new Date()
            dataDevolucao.setDate(dataDevolucao.getDate() + 15)
            const dia = String(dataDevolucao.getDate()).padStart(2, '0');
            const mes = String(dataDevolucao.getMonth() + 1).padStart(2, '0');
            const ano = dataDevolucao.getFullYear();

            return `${dia} ${mes} ${ano}`;
        }
    },

    methods: {
        salvarFoto(imagem64) {
            this.foto = imagem64
        },
        
        irParaEmprestimos() {
            this.$router.push({ path: '/emprestimos/'});
        },

        async buscarLivro(id) {
            const requisicao = await getLivro(id)

            this.titulo = requisicao.data.titulo
        },

        async querySelection (v) {
            this.loading = true

            const jsonLeitor = {
                input: v
            }

            const requisicao = await getLeitorPorNome(jsonLeitor);

            requisicao.data.map((v) => this.items.push(v.nome))
            requisicao.data.map((v) => this.itemsObject.push(v))
        },

        async buscarAtributos(e) {

            const jsonNome = {
                nome: e
            }

            for (let i = 0; i < this.itemsObject.length; i++) {
                const leitor = this.itemsObject[i];

                if (leitor.nome === this.select) {
                    this.idLeitor = leitor.id;
                    break;
                }
            }

            const requisicao = await getLeitorInteiro(jsonNome);

            this.foto = requisicao.data.foto

            if (requisicao.data.tipo === 'Discente') {
                this.serieDisciplina = requisicao.data.serie + ' ' + requisicao.data.turma
            } else if (requisicao.data.tipo === 'Docente') {
                this.serieDisciplina = requisicao.data.disciplina
            }
        },

        async validate() {
            if (this.select === '' || this.id === null) {
                this.mensagemAlerta = 'Escolha um leitor válido!';

                this.alerta = true;
                setTimeout(() => {
                    this.fecharAlerta();
                }, 5000);
            } else {

                const id = parseInt(this.idLeitor)

                setTimeout( async () => {
                    const jsonEmprestimo = {
                        leitor_id: this.idLeitor,
                        tombo: this.$route.params.id,
                        foto: this.foto
                    }
                    const requisicao = await cadastrarEmprestimo(jsonEmprestimo)
    
                    if (requisicao === 200) {
                        this.formDesabilitado = false;
                        this.isLoading = false;
                        this.tratarSucessoCadastro();
                    } else {
                        this.tratarErroRequisicao(requisicao);
                    }
                }, 2000);

            }
        },

        fecharAlerta() {
            this.alerta = false;
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

    watch: {
      search (val) {
        val && val !== this.select && this.querySelection(val)
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
  align-items: start;

  width: 100%;

  gap: 4.8rem;
}

#wrapper-formulario{
    width: 80%;

    display: flex;    
    flex-direction: column;

    gap: 4.8rem;
}

.wrapper-tela-cadastro{
    width: 100%;
    
    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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