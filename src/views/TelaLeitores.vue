<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <BarraDeBusca
                        class="acoes-item1"
                        conteudo="Busque por um leitor"
                        @busca="salvarQueryDeBusca"
                    ></BarraDeBusca>
                    <div class="acoes-item2">
                        <FiltroLeitor
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
            </div>
            <ListaDeLeitores :busca="this.queryDeBusca"></ListaDeLeitores>
        </div>
    </div>
</template>

<script>

import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue';
import BarraDeBusca from '@/components/BarraDeBusca.vue';
import FiltroLeitor from '@/components/FiltroLeitor.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue'
import { validarTokenAcesso } from '../service/autenticacao';
import ListaDeLeitores from '@/components/ListaDeLeitores.vue';

export default {
    data() {
        return {
            queryDeBusca: '',
        }
    },

    components: {
        BarraDeNavegacao,
        BarraDeBusca,
        BotaoPadrao,
        FiltroLeitor,
        ListaDeLeitores
    },

    methods: {
        salvarQueryDeBusca(query) {
            this.queryDeBusca = query;
        }
    },

    mounted() {
        validarTokenAcesso().then((token) => {
        if (!token) {
            router.push('/login');
        }
        })
    },
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

#wrapper-cabecalho {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    gap: 4rem;

    width: 100%;
}

#acoes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    width: 100%;
    max-width: 100.8rem;
}

.acoes-item1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.acoes-item2 {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    gap: 5rem;
}

</style>