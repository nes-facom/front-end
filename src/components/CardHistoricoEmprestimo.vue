<template>
    <div class="item">
        <span>{{ emprestimo.titulo }}</span>
        <span>{{ dataEmprestimo }}</span>
        <span>{{ dataDevolucao }}</span>
        <span>{{ situacaoCapitalized }}</span>
    </div>
</template>
<script>

export default {
    props: {
        emprestimo: {
            type: Object,
            required: true
        }
    },

    computed: {
        dataDevolucao(){
            const dataString = this.emprestimo.data_devolucao
            const dataArr = dataString.split("T")[0].split("-");
            return`${dataArr[2]}/${dataArr[1]}/${dataArr[0]}`;
        },
        dataEmprestimo(){
            const dataString = this.emprestimo.data_emprestimo
            const dataArr = dataString.split("T")[0].split("-");
            return`${dataArr[2]}/${dataArr[1]}/${dataArr[0]}`;
        },
        situacaoCapitalized(){
            const str = this.emprestimo.situacao
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
}

</script>

<style scoped>

.item {
    display: grid;
    grid-template-columns: 33% 18% 18% 1fr;
    align-items: center;

    gap: 3rem;

    font: var(--body-large);
    text-align: center;
    color: var(--black);

    width: 100%;
}

.item span:first-child{
    text-align: start;
}
    
</style>