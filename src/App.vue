<template>
  <div class="header">
    <img alt="logo" src="./assets/logo.png" height="100" width="100">
    <h1>Gerenciador de Tarefas</h1>
  </div>
  <JobsAgrupador />
</template>

<script>
  import JobsAgrupador from './components/JobsAgrupador.vue'

  export default {
  components: {
    JobsAgrupador, // Registre o componente para poder usá-lo no template
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
