<template>
    <div id="loader-wrapper">
        <div class="loader" v-if="loading">
        </div>
    </div>
</template>

<script>

export default {
    props: [
        'loading'
    ],
}

</script>

<style scoped>
    
#loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
}

.loader {
  border: 16px solid var(--white);
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>