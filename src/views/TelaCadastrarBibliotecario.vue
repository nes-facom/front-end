<template>
    <div id="background">
        <div id="wrapper">

            <div>
                <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
            </div>

            <span>Insira a senha</span>

            <DropZone extensaoDoArquivo="text/plain"></DropZone>

            <div id="wrapper-botoes">
                <BotaoPadrao 
                conteudo="Cancelar"
                :outlined="true"></BotaoPadrao>
                <BotaoPadrao
                conteudo="Continuar"
                :disabled="this.$store.state.arquivoSenhaBibliotecario"
                @click="enviarArquivo"></BotaoPadrao>
            </div>
        </div>
    </div>
</template>

<script>
import BotaoPadrao from '@/components/BotaoPadrao.vue';
import DropZone from '@/components/DropZone.vue'

export default {

    data() {
        return {
            loaderArquivo: false,
        }
    },

    components: {
        BotaoPadrao,
        DropZone,
    },

    methods: {
        // async enviarArquivo() {
        //     this.loaderArquivo = true;
        //     let json = this.$store.state.jsonMetas;
        //     const formatarJSON = formatarMetas(json);
        //     const requisicao = await importarMetas(formatarJSON);
        //     if (requisicao === 200) {
        //         this.tratarSucessoMetas();
        //     } else {
        //         this.tratarErroMetas(requisicao);
        //     }
        // },

        async enviarArquivo() {
            this.loaderArquivo = true;
            let json = this.$store.state.jsonMetas;
            const formatarJSON = formatarMetas(json);
            const requisicao = await importarMetas(formatarJSON);
            if (requisicao === 200) {
                this.tratarSucessoMetas();
            } else {
                this.tratarErroMetas(requisicao);
            }
        },
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
    
    height: 100vh;
    width: 100vw;
    max-width: 144rem;

    padding-bottom: 4rem;
}

span {
    font: var(--display-small);
    color: var(--black);
}

#wrapper-botoes {
    display: flex;

    width: 90vw;
    max-width: 144rem;

    justify-content: end;
    gap: 4.8rem;
}

    
</style>