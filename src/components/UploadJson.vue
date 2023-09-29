<template>
    <div class="hello">
      <h2>Upload de Arquivo JSON</h2>
      <input type="file" @change="handleFileUpload" accept=".json" />
      <button @click="uploadFile">Enviar</button>
  
      <div v-if="jsonData">
        <h2>Dados do JSON:</h2>
        <pre>{{ jsonData }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFile: null,
        jsonData: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadFile() {
        if (!this.selectedFile) {
          alert('Selecione um arquivo JSON.');
          return;
        }
  
        const formData = new FormData();
        formData.append('jsonFile', this.selectedFile);
  
        try {
          const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            const jsonData = await response.json();
            this.jsonData = JSON.stringify(jsonData, null, 2);
          } else {
            alert('Falha no upload do arquivo.');
          }
        } catch (error) {
          console.error('Erro:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados aqui */
  </style>
  