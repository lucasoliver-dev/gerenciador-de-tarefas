<template>
  <div class="header">
    <img alt="logo" src="./assets/logo.png" height="100" width="100">
    <h1>Gerenciador de Tarefas</h1>
  </div>
  <UploadJson />
  <JobsAgrupador />
</template>

<script>
  import JobsAgrupador from './components/JobsAgrupador.vue'
  import UploadJson from './components/UploadJson.vue';

  export default {
  components: {
    UploadJson,
    JobsAgrupador,
  },
  // ...
};
</script>

<style>
  .header{
    background:#3498db;
    display: flex;
    margin: 0.5rem;
    justify-content: center;
    box-shadow:
  4.3px 4.3px 6.5px rgba(0, 0, 0, 0.113),
  7px 7px 12px rgba(0, 0, 0, 0.24);
  }
</style>
