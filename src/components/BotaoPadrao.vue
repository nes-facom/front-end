<template >
    <div>
        <v-btn
            id="button-default"
            class="button"
            :disabled="disabled"
            data-cy="botao-padrao"
            rounded
            elevation="0"
            :type="type"
            v-if="!outlined"
        >
            <v-icon
                v-if="icon"
                dark
                left
            >
                {{ icon }}
            </v-icon>
            {{ conteudo }}
        </v-btn>
        <v-btn
            id="button-outlined"
            class="button"
            data-cy="botao-padrao-outlined"
            rounded
            elevation="0"
            outlined
            :type="type"
            v-if="outlined"
        >
            <v-icon
                v-if="icon"
                dark
                left
            >
                {{ icon }}
            </v-icon>
            {{ conteudo }}
        </v-btn>
    </div>
</template>

<script>

export default {
    data() {
        return {
            disabled: this.isDisabled,
        }
    },
    props: {
        conteudo: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        icon: String,
        isDisabled: false,
        outlined: Boolean,
    },
    watch: {
        isDisabled: function(newValue, oldValue) {
            this.disabled = newValue
        }
    }
}

</script>

<style scoped>

.button {
    font: var(--label-large);
    width: fit-content;

    text-transform: none;
}

#button-default {
    color: var(--on-primary);
    background-color: var(--primary);

    height: 4rem;
}

#button-outlined {
    color: var(--primary);
    border-color: var(--primary);
    height: 4rem;
}

</style>