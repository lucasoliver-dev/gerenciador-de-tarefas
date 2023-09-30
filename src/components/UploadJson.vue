<template>
  <div class="hello">
    <h2>Upload de Arquivo JSON</h2>
    <input type="file" @change="handleFileUpload" accept=".json" />
    <button @click="uploadFile">Enviar</button>

    <div v-if="jsonData">
      <h2>Dados do JSON:</h2>
      <ul>
        <li v-for="(job, index) in jsonData" :key="index">
          {{ job.ID }} - {{ job.Descrição }} - {{ job['DataMáximadeconclusão'] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api'; // Importe o Axios configurado

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
        const response = await api.post('/upload', formData);

        if (response.status === 200) {
          // Supondo que a resposta do servidor seja um array de objetos JSON
          this.jsonData = response.data;
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
