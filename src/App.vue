<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <JobsAgrupador></JobsAgrupador>
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

</style>
