<template>
    <div class="upload-container">
      <input type="file" @change="handleFileUpload" />
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async () => {
            const csvData = reader.result;
            this.$emit('csvDataLoaded', csvData);
          };
          reader.readAsText(file);
        }
      },
    }
  };
  </script>
  
  <style>
  .upload-container {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }
  </style>
  