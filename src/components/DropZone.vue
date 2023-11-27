<template>
    <div class="area-upload">
        <div 
        @dragover.prevent
        @dragenter.prevent="alternarAtivo"
        @dragleave.prevent="alternarAtivo"
        @drop.prevent="alternarAtivo"
        @drop="submissaoDrop"
        :class="{'dropzone-ativo' : ativo}"
        class="dropzone">
            <div class="divLabels">
                <label for="dropzoneFile"><img src="@/components/icons/DragAndDropIcon.png" alt="Nuvem com uma seta apontada pera ela, simbolizando a importação de arquivos."></label>
                <label :class="{'estilo-desabilitado': isDisabled}" id="primeira-label" for="dropzoneFile">Arraste e solte</label>
                <label id="segunda-label" for="dropzoneFile">Somente arquivos {{extensaoDoArquivo }} serão aceitos</label>
                <input data-cy="input-dropzone" :disabled="isDisabled" ref="entradaArquivo" id="dropzoneFile" type="file" @change="submissaoInput" :accept="extensaoDoArquivo"/>
            </div>
            <div class="descricao" v-if="info">
                <span>{{ descricao }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                descricao: '',
                info: false,
                arquivoImportado: false,
            }
        },

        props: {
            extensaoDoArquivo: {
                type: String,
                required: true
            },
            isDisabled: {
                type: Boolean
            }
        },

        setup() {
            const ativo = ref(false);

            const alternarAtivo = () => {
                ativo.value = !ativo.value;
            }

            return { ativo, alternarAtivo }
        },

        methods: {
            submissaoDrop(event) {
                this.info = false;
                this.descricao = '';
                const file = event.dataTransfer.files[0];
                this.validarArquivo(file);
            },

            submissaoInput() {
                this.info = false;
                this.descricao = '';
                const file = this.$refs.entradaArquivo.files[0]
                this.validarArquivo(file);
            },

            ...mapActions(['salvarArquivo', 'salvarNomeArquivo']),

            validarArquivo(arquivo) {
                if (arquivo) {
                    this.info = true;
                        this.descricao = arquivo.name;
                        this.salvarNomeArquivo(arquivo.name);
                        this.salvarArquivo(arquivo);
                        this.arquivoImportado = true;
                }
            }
        },
    }
</script>

<style scoped>
.area-upload {
    display: flex;
    justify-content: center;
}
.dropzone {
    width: 75vw;
    max-width: 80rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.2rem dashed hsla(270, 6%, 20%, 0.16);
    border-radius: 1.2rem;
}
.divLabels {
    display: flex;
    flex-direction: column;
    text-align: center;
}
.divLabels > label > img {
    width: 4.5rem;
    height: 5rem;
    margin-bottom: 1rem;
}

#primeira-label {
    font: var(--headline-small);
    color: var(--black);
}

#segunda-label {
    font: var(--body-large);
    color: var(--on-surface-variant);
}
.divLabels > input {
    display: none;
}
.descricao {
    margin: 1.2rem 0;
    padding: 0.2rem 1.2rem;
    font: var(--headline-small);
    color: var(--black);
}
.dropzone-ativo {
    border: 0.2rem solid var(--inverse-surface);
    transition: 0.3s ease all;
}

#primeira-label.estilo-desabilitado {
    color: var(--outline);
}

#segunda-label.estilo-desabilitado {
    color: var(--outline);
}

</style>