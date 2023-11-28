    <template>
    <div class="card-exemplar">
        <span class="span1">{{ exemplar.tombo }}</span>
        <span class="span2">{{ exemplar.situacao }}</span>
        <div class="icons-wrapper">
        <v-icon @click="toggleModalAlterarEstado(exemplar.id)"
            >mdi-autorenew</v-icon
        >
        <v-icon @click="toggleModalExcluirExemplar(exemplar.id)">mdi-trash-can</v-icon>
        </div>

        <div class="overlay-alterar-estado" v-if="showModalAlterarEstado">
        <div class="modal-alterar-estado" v-if="showModalAlterarEstado">
            <span> Alterar estado de um exemplar </span>
            <v-radio-group v-model="exemplar.situacao" class="radioGroup">
            <v-radio label="Disponível" value="disponivel"></v-radio>
            <v-radio
                class="radioItem"
                label="Extraviado"
                value="extraviado"
            ></v-radio>
            <v-radio
                class="radioItem"
                label="Transferido"
                value="transferido"
            ></v-radio>
            </v-radio-group>
            <section class="overlay-buttons-alterar-estado">
            <span @click="toggleModalAlterarEstado">Cancelar</span>
            <span @click="updateState">Salvar</span>
            </section>
        </div>
        </div>
        <div class="overlay-excluir-exemplar" v-if="showModalExcluirExemplar">
        <div class="modal-excluir-exemplar" v-if="showModalExcluirExemplar">
            <v-icon> mdi-trash-can </v-icon>
            <span> Você tem certeza que deseja excluir esse exemplar? </span>
            <p>
            As informações deste exemplar serão excluídas e não poderão ser
            recuperadas.
            </p>
            <section class="overlay-buttons">
            <span @click="toggleModalExcluirExemplar">Cancelar</span>
            <span @click="deleteExemplar">Excluir</span>
            </section>
        </div>
        </div>
    </div>
    </template>

    <script>
    import { updateExemplar, deleteExemplar } from "../service/requisicao";

    export default {
    props: {
        exemplar: {
        type: Object,
        required: true,
        },
    },

    data() {
        return {
        showModalAlterarEstado: false,
        showModalExcluirExemplar: false,
        radioGroup: "",
        exemplarId: null,
        };
    },

    methods: {
        fecharAlerta() {
        this.alerta = false;
        },

        toggleModalAlterarEstado(id) {
        this.showModalAlterarEstado = !this.showModalAlterarEstado;
        this.exemplarId = id;
        },

        toggleModalExcluirExemplar(id) {
        this.showModalExcluirExemplar = !this.showModalExcluirExemplar;
        this.exemplarId = id;
        },

        async deleteExemplar() {
            this.formDesabilitado = true;
            this.isLoading = true;
            this.alerta = false;

            const requisicao = await deleteExemplar(
            this.exemplarId,
        );
        console.log(requisicao);
        if (requisicao.status === 200) {
            this.formDesabilitado = false;
            this.isLoading = false;
            this.tratarSucessoLivro();
            window.location.reload();
        } else {
            this.tratarErroRequisicao(requisicao);
        }
        this.toggleModalExcluirExemplar()
        },

        async updateState() {
        this.formDesabilitado = true;
        this.isLoading = true;
        this.alerta = false;

        const dadosEditarLivro = {
            situacao: this.exemplar.situacao,
        };
        const requisicao = await updateExemplar(
            this.exemplarId,
            dadosEditarLivro
        );
        console.log(requisicao);
        if (requisicao.status === 200) {
            this.formDesabilitado = false;
            this.isLoading = false;
            this.tratarSucessoLivro();
        } else {
            this.tratarErroRequisicao(requisicao);
        }
        this.toggleModalAlterarEstado()
        },

        tratarSucessoLivro() {
        this.mensagemAlerta = "Situação atualizada com sucesso!";
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
    .card-exemplar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: var(--surface);
    border-radius: 12px;

    width: 88%;
    height: 3.75rem;
    }

    .card-exemplar span {
    font: var(--body-large);
    }

    .icons-wrapper {
    display: flex;
    gap: 1.5rem;
    }

    .overlay-alterar-estado {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: #1a1c1e9d;

    z-index: 10;
    }

    .modal-alterar-estado {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    position: fixed;

    border-radius: 2.8rem;
    padding: 2.4rem;

    background-color: var(--background);
    box-shadow: 0 4px 8px rgba(0, 0, 5, 0.5);

    z-index: 20;

    width: 50vw;
    max-width: 33.5rem;
    }

    .modal-alterar-estado span {
    font: var(--headline-small);
    }

    .modal-alterar-estado p {
    font: var(--body-medium);
    }

    .modal-alterar-estado span:last-child,
    .modal-alterar-estado span:nth-last-child(2) {
    display: flex;
    justify-content: end;
    margin-top: 3.4rem;
    font: var(--label-large);
    color: var(--primary);
    cursor: pointer;
    }

    .overlay-buttons-alterar-estado {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 2.5rem;
    }

    .radioGroup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5rem;
    }

    .radioItem {
    margin-top: 2.5rem;
    }

    .overlay-excluir-exemplar {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: #1a1c1e9d;

    z-index: 10;
    }

    .modal-excluir-exemplar {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    position: fixed;

    border-radius: 2.8rem;
    padding: 2.4rem;

    background-color: var(--background);
    box-shadow: 0 4px 8px rgba(0, 0, 5, 0.5);

    z-index: 20;

    width: 50vw;
    max-width: 33.5rem;
    }

    .modal-excluir-exemplar span {
    font: var(--headline-small);
    }

    .modal-excluir-exemplar p {
    font: var(--body-medium);
    }

    .modal-excluir-exemplar span:last-child,
    .modal-excluir-exemplar span:nth-last-child(2) {
    display: flex;
    justify-content: end;
    margin-top: 3.4rem;
    font: var(--label-large);
    color: var(--primary);
    cursor: pointer;
    }

    .overlay-buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 2.5rem;
    }
    </style>
