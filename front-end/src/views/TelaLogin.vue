<template>
    <div
    id="background">
        <div id="wrapper">
            <v-card
                outlined
                id="card"
                >
                <v-form
                    id="form"
                    @submit.prevent="login"
                >
                    <img src="@/components/icons/Logo.png" alt="Um livro fechado com o nome LibriX à esquerda.">
                    <div>
                        <v-text-field
                            label="CPF"
                            v-model="cpf"
                            counter="11"
                            maxlength="11"
                            prepend-inner-icon="mdi-account"
                            outlined
                            required
                            :rules="[rules.counter, rules.naonumerico]"
                        ></v-text-field>
                        <v-text-field
                            prepend-inner-icon="mdi-key"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Senha"
                            v-model="password"
                            outlined
                            required
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </div>
                    <v-btn
                        id="button"
                        rounded
                        elevation="0"
                        type="submit"
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
            cpf: "",
            password: "",
            rules: {
                counter: value => value.length <= 11 || 'O CPF deve possuir 11 caracteres.',
                naonumerico: value => {
                    for (let i = 0; i < value.length; i++) {
                        if (!/\d/.test(value[i])) {
                            return 'Apenas caracteres númericos!';
                        }
                    }
                    return true;
                }
            }
        }
    },
    
    methods: {
        login() {
            //Validar caso haja um ou mais campos vazios
            if (this.cpf === '') {
                return true
            }
        }
    }
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
    max-width: 144rem;

    padding-inline: 2rem;
}

#card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 70rem;
    width: 35vw;
    min-width: 40rem;
    min-height: 65rem;
    max-height: 90rem;

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

@media only screen and (max-width: 768px) {
  #wrapper {
    justify-content: center;
  }
}


</style>