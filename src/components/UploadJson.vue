<template>
  <div class="hello">
    <h2>Upload de Arquivo JSON</h2>
    <input class="" type="file" @change="handleFileUpload" accept=".json" />
    <button class="btn" @click="uploadFile">Enviar</button>

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
import api from '@/api'; // Importando o Axios configurado

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
  /* Estilização para a classe .btn */
.btn {
  margin: 1rem;
  display: inline-block;
  padding: 10px 20px; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}

/* Estilização para o botão quando o mouse passa por cima */
.btn:hover {
  background-color: #0056b3;
}
</style>
