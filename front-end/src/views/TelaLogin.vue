<template>
    <div
    id="background">
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
                        hint="Utilize apenas números"
                        counter="11"
                        class="font-style-body-large"
                    ></v-text-field>
                    <v-text-field
                        prepend-inner-icon="mdi-key"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        label="Senha"
                        outlined
                        hint="Pelo menos 8 caracteres"
                        @click:append="showPassword = !showPassword"
                        class="font-style-body-large"
                    ></v-text-field>
                </div>

                <v-btn
                    id="button"
                    rounded
                    class="font-size-label-large"
                >
                    Entrar
                </v-btn>
            </v-form>

            <a href="#">Cadastrar bibliotecário</a>
        </v-card>
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
    justify-content: end;
    align-items: center;

    padding-inline: 2rem;

    height: 100vh;

    background-image: url('@/components/icons/BackgroundLogin.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
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
}

#button {
    background-color: var(--primary-color);
    color: var(--white);
    width: fit-content;
}

a {
    color: var(--primary-color);
    text-decoration: none;
}

</style>