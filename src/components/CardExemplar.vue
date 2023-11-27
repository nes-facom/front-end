<template>
    <div class="card-exemplar">
        <span class="span1">{{ exemplar.tombo }}</span>
        <span class="span2">{{ exemplar.situacao }}</span>
        <v-icon>mdi-autorenew</v-icon>
    </div>
</template>

<script>

export default {
    props: {
        exemplar: {
            type: Object,
            required: true
        }
    },

    methods: {

    }
}

</script>

<style scoped>

.card-exemplar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: var(--surface);
    border-radius: 12px ;

    width: 88%;
    height: 3.75rem;
}

.card-exemplar span {
    font: var(--body-large);
}


</style>