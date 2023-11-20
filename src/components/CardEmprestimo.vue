<template>
    <div class="card-emprestimo">
        <span class="span1"> {{ emprestimo }} </span>
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

    methods: {
        
    }
}

</script>

<style>

span {
    font: var(--body-large);
    color: var(--on-surface);
}

.card-emprestimo {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;
    max-width: 100.8rem;
    height: 6rem;

    background-color: var(--surface);
    border-radius: 1.2rem;
    border: 0.1rem solid var(--outline-variant);

    transition: background-color 0.1s;
}

.card-emprestimo:hover {
    cursor: pointer;
    background-color: var(--surface-variant);
}

.card-emprestimo:active {
    cursor: pointer;
    background-color: var(--surface-dim);
}

</style>