<template>
  <div class="counter-wraper">
    <v-btn @click="decrement">-</v-btn>
    <v-text-field class="input-counter" solo type="number" v-model="counter" @input="handleChange"></v-text-field>
    <v-btn @click="increment">+</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      if (this.counter > 0) {
        this.counter--;
      }
    },
    handleChange(value) {
      if (!isNaN(value)) {
        this.counter = parseInt(value);
      }
    },
  },
};
</script>

<style scoped>
.counter-wraper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.input-counter {
    width: calc(50% - 0.5rem);
    margin-right: 0.5rem;
}
</style>
