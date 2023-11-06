<template>
    <div id="background">
        <div id="wrapper">
            <div id="wrapper-cabecalho">
                <BarraDeNavegacao></BarraDeNavegacao>
                <section id="acoes">
                    <router-link to="/leitores">
                        <!-- Icone de return -->
                    </router-link>
                    <!-- label "Informações do leior" -->
                    <!-- ícone de edição (leva pra tela de editar leitor) -->
                </section>
                <!-- window: docente -->
                    <!-- div esquerda: -->
                        <!-- imagem do docente -->
                        <!-- nome -->
                        <!-- disciplina -->
                        <!-- turno -->
                        <!-- tipo -->
                    <!-- div direita: -->
                    <!-- header da lista de empréstimos -->
                        <!-- título -->
                        <!-- data de empréstimo -->
                        <!-- data de devolução -->
                        <!-- estadp -->
                    <!-- lista de empréstimos -->
                        <!-- item empréstimo -->
                <!-- window: discente -->
                    <!-- div esquerda: -->
                        <!-- imagem do discente -->
                        <!-- nome -->
                        <!-- série e turma -->
                        <!-- tipo -->
                    <!-- div direita: -->
                    <!-- header da lista de empréstimos -->
                        <!-- título -->
                        <!-- data de empréstimo -->
                        <!-- data de devolução -->
                        <!-- estadp -->
                    <!-- lista de empréstimos -->
                        <!-- item empréstimo -->
            </div>            
        </div>
    </div>
</template>

<script>

import BarraDeNavegacao from '@/components/BarraDeNavegacao.vue'

export default {
    components: {
        BarraDeNavegacao
    }
}


</script>

<style>
    
</style>