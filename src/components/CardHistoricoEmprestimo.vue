<template>
    <div class="item">
        <span>{{ emprestimo.titulo }}</span>
        <span>{{ emprestimo.dataEmprestimo }}</span>
        <span>{{ emprestimo.dataDevolucao }}</span>
        <span>{{ emprestimo.situacao }}</span>
    </div>
</template>
<script>

export default {
    props: {
        emprestimo: {
            type: Object,
            required: true
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