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
                    <FiltroLeitor
                        :opcoes="filtrosLeitores"
                    ></FiltroLeitor>
                    <router-link to="/leitores/cadastrar">
                        <BotaoPadrao
                            conteudo="Cadastrar leitor"
                            type="button"
                            icon="mdi-plus"
                        >
                        </BotaoPadrao>
                    </router-link>
                </div>

            </section>
            <ListaDeLeitores></ListaDeLeitores>
        </div>
    </div>
</template>

<script>

import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroLeitor from '@/components/FiltroLeitor.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import ListaDeLeitores from '@/components/ListaDeLeitores.vue';

export default {
    data() {
        return {
            filtrosLeitores: ['discente', 'docente']
        }
    },

    components: {
    BarraDeBusca,
    BotaoPadrao,
    FiltroLeitor,
    ListaDeLeitores
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

    width: 100%;
    height: 100%;
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