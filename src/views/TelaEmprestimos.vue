<template>
    <div>
        <BarraDeNavegacao />
    </div>
</template>

<script>
import BarraDeNavegacao from '../components/BarraDeNavegacao.vue';



export default {
    components: {
    BarraDeNavegacao
},
    data() {
        return {
            isLogado: true,
        };
    },
};

</script>

<style scoped>
    
</style>