<template>
  <div class="jobs-agrupador">
    <h2>Conjuntos de Jobs</h2>
    <ul class="conjuntos-list">
      <li v-for="(conjunto, index) in conjuntosDeJobs" :key="index" class="conjunto">
        <strong>Conjunto {{ index + 1 }}:</strong>
        <ul>
          <li v-for="job in conjunto" :key="job.ID" class="job-item">
            <span>ID: {{ job.ID }}</span>
            <span>Descrição: {{ job.Descrição }}</span>
            <span>Data máxima de conclusão: {{ job.DataMáximadeconclusão }}</span>
            <span>Tempo Estimado: {{ job.TempoEstimado }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conjuntosDeJobs: [], // Aqui serão armazenados os conjuntos de jobs
    };
  },
  methods: {
    calcularTempoEmHoras(tempoStr) {
      // Função para calcular o tempo em horas (mesma lógica da função anterior)
      const tempo = tempoStr.split(' ');
      const horas = parseInt(tempo[0]);
      return horas;
    },
    agruparJobs(jobs) {
      // Função para agrupar os jobs (mesma lógica da função anterior)
      const jobsOrdenados = jobs.slice().sort((a, b) => {
        const dataA = new Date(a["DataMáximadeconclusão"]);
        const dataB = new Date(b["DataMáximadeconclusão"]);

        if (dataA < dataB) return -1;
        if (dataA > dataB) return 1;

        const tempoA = this.calcularTempoEmHoras(a["TempoEstimado"]);
        const tempoB = this.calcularTempoEmHoras(b["TempoEstimado"]);

        return tempoA - tempoB;
      });

      const conjuntosDeJobs = [];
      let conjuntoAtual = [];
      let tempoAtual = 0;
      let dataMaxima = null;

      for (const job of jobsOrdenados) {
        const tempoJob = this.calcularTempoEmHoras(job["TempoEstimado"]);
        const dataConclusao = new Date(job["DataMáximadeconclusão"]);

        if (!dataMaxima) {
          dataMaxima = dataConclusao;
        }

        if (tempoAtual + tempoJob <= 8 && dataConclusao <= dataMaxima) {
          conjuntoAtual.push(job);
          tempoAtual += tempoJob;

          if (dataConclusao < dataMaxima) {
            dataMaxima = dataConclusao;
          }
        } else {
          conjuntosDeJobs.push(conjuntoAtual);
          conjuntoAtual = [job];
          tempoAtual = tempoJob;
          dataMaxima = dataConclusao;
        }
      }

      if (conjuntoAtual.length > 0) {
        conjuntosDeJobs.push(conjuntoAtual);
      }

      return conjuntosDeJobs;
    },
  },
  created() {
    // Exemplo de uso com o JSON fornecido
    const jobs = [
      {
        "ID": 1,
        "Descrição": "Importação de arquivos de fundos",
        "DataMáximadeconclusão": '2021-02-04 12:00:00',
        "TempoEstimado": '8 horas'
      },
      {
        "ID": 2,
        "Descrição": 'Importação de dados da Base Legada',
        "DataMáximadeconclusão": '2021-02-04 12:00:00',
        "TempoEstimado": '4 horas'
      },
      {
        "ID": 3,
        "Descrição": 'Importação de dados',
        "DataMáximadeconclusão": '2021-02-02 12:00:00',
        "TempoEstimado": '6 horas'
      },
      {
        "ID": 4,
        "Descrição": 'Desenvolver historia 745',
        "DataMáximadeconclusão": '2021-02-02 12:00:00',
        "TempoEstimado": '2 horas'
      },
      {"ID": 5,
        "Descrição": 'Gerar QRCode',
        "DataMáximadeconclusão": '2020-02-15 12:00:00',
        "TempoEstimado": '6 horas'
      },
      {
        "ID": 6,
        "Descrição": 'Importação de dados de integração',
        "DataMáximadeconclusão": '2020-02-15 12:00:00',
        "TempoEstimado": '8 horas'
      },
      // ... Outros jobs ...
    ];    

    this.conjuntosDeJobs = this.agruparJobs(jobs);
  },
};
</script>

<style scoped>
.jobs-agrupador {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px; 
}

.conjuntos-list {
  list-style-type: none;
  padding: 0;
 
}

.conjunto {
  margin-bottom: 20px;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow:
  4.3px 4.3px 6.5px rgba(0, 0, 0, 0.113),
  7px 7px 12px rgba(0, 0, 0, 0.24);
}

.job-item {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
