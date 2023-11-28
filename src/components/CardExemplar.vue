<template>
    <div class="card-exemplar">
        <span class="span1">{{ exemplar.tombo }}</span>
        <span class="span2">{{ exemplar.situacao }}</span>
        <v-icon @click="toggleModalAlterarEstado">mdi-autorenew</v-icon>

        <div class="overlay-alterar-estado" v-if="showModalAlterarEstado">
            <div class="modal-alterar-estado" v-if="showModalAlterarEstado">
                <span>
                    Alterar estado de um exemplar
                </span>
                <v-radio-group v-model="radioGroup" class="radioGroup">
                    <v-radio
                        label="Disponível"
                        value="exemplar.situacao.ativo"
                    ></v-radio>
                    <v-radio
                        class="radioItem"
                        label="Emprestado"
                        value="exemplar.situacao.emprestado"
                    ></v-radio>
                    <v-radio
                        class="radioItem"
                        label="Extraviado"
                        value="exemplar.situacao.extraviado"
                    ></v-radio>
                    <v-radio
                        class="radioItem"
                        label="Transferido"
                        value="exemplar.situacao.transferido"
                    ></v-radio>
                </v-radio-group>
                <section class="overlay-buttons-alterar-estado">
                    <span @click="toggleModalAlterarEstado">Cancelar</span>
                    <span>Salvar</span>
                </section>
            </div>
        </div>
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

    data() {
        return {
            showModalAlterarEstado: false,
        }
    },

    methods: {
        toggleModalAlterarEstado() {
        this.showModalAlterarEstado = !this.showModalAlterarEstado
      }
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

.overlay-alterar-estado {
display: flex;
justify-content: center;
align-items: center;

position: fixed;
top: 0;
left: 0;

width: 100%;
height: 100%;

background-color: #1a1c1e9d;;

z-index: 10;
}

.modal-alterar-estado {
display: flex;
flex-direction: column;
gap: 1.6rem;

position: fixed;

border-radius: 2.8rem;
padding: 2.4rem;

background-color: var(--background);
box-shadow: 0 4px 8px rgba(0, 0, 5, 0.5);;

z-index: 20;

width: 50vw;
max-width: 33.5rem;
}

.modal-alterar-estado span {
font: var(--headline-small)
}

.modal-alterar-estado p {
font: var(--body-medium)
}

.modal-alterar-estado span:last-child,
.modal-alterar-estado span:nth-last-child(2) {
  display: flex;
  justify-content: end;
  margin-top: 3.4rem;
  font: var(--label-large);
  color: var(--primary);
  cursor: pointer;
}

.overlay-buttons-alterar-estado {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 2.5rem;
}

.radioGroup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5rem;
}

.radioItem {
    margin-top: 2.5rem;
}
</style>