<template>
    <div id="background">
        <div id="wrapper">
            <!-- Header -->
            <section id="acoes">
                <BarraDeBusca
                    conteudo="Busque por um leitor"
                    @busca="realizarBusca"
                ></BarraDeBusca>

                <div id="botoes-direita">
                    <FiltroSelect
                        :opcoes="filtrosLeitores"
                    ></FiltroSelect>
                    <BotaoPadrao
                        conteudo="Cadastrar leitor"
                        type="button"
                        icon="mdi-plus"
                    >
                    </BotaoPadrao>
                </div>

            </section>
            <!-- Componente de Listagem de Leitores -->
        </div>
    </div>
</template>

<script>

import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroSelect from '@/components/FiltroSelect.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue'

export default {
    data() {
        return {
            filtrosLeitores: ['discente', 'docente']
        }
    },

    components: {
        BarraDeBusca,
        BotaoPadrao,
        FiltroSelect
    },

    methods: {
        realizarBusca(query) {
            // Lógica de pesquisa com o "query" recebido
            // Atualize os resultados da pesquisa aqui
        }
    }
}

</script>
 
<style scoped>

#background {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
}

#wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80%;
    max-width: 144rem;

    height: 100%;
}

#acoes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
}

#botoes-direita {
    display: flex;
    justify-content: end;
    align-items: center;
    
    width: 100%;
}

</style>