<template>
    <div
    id="background">
        <div id="wrapper">
            <v-card
                outlined
                height="90vh"
                width="25vw"
                min-width="45rem"
                id="card"
                >
                <v-form
                    id="form"
                >
                    <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
                    <div>
                        <v-text-field
                            label="CPF"
                            outlined
                            prepend-inner-icon="mdi-account"
                        ></v-text-field>
                        <v-text-field
                            prepend-inner-icon="mdi-key"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Senha"
                            outlined
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </div>
                    <v-btn
                        id="button"
                        rounded
                        elevation="0"
                    >
                        Entrar
                    </v-btn>
                </v-form>
                <a href="#">Cadastrar bibliotecário</a>
            </v-card>
        </div>
    </div>
</template>


<script>


export default {
    data() {
        return {
            showPassword: false,
        }
    },
}

</script>

<style scoped>

#background {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;

    background-image: url('@/components/icons/BackgroundLogin.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

#wrapper {
    display: flex;
    justify-content: end;
    align-items: center;
    
    height: 100vh;
    width: 100vw;
    max-width: 128rem;

    padding-inline: 2rem;
}

#card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 2rem;

    gap: 2rem;
}

#form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 8rem;

    ::v-deep .v-input__slot {
        gap: 1.5rem;
    }

    ::v-deep .v-label {
        font: var(--body-large);
        color: var(--on-surface-variant);
    }

    ::v-deep .v-icon {
        color: var(--primary);
    }

    ::v-deep .v-input--is-focused:first-child legend {
        width: 7.5rem !important;
    }

    ::v-deep .v-input--is-label-active:first-child legend {
        width: 7.5rem !important;
    }

    ::v-deep .v-input--is-focused:last-child legend {
        width: 8.5rem !important;
    }

    ::v-deep .v-input--is-label-active:last-child legend {
        width: 8.5rem !important;
    }
}

#button {
    background-color: var(--primary);
    color: var(--on-primary);
    width: fit-content; 
}

a {
    font: var(--label-large);
    color: var(--primary);
    text-decoration: none;
}


</style>