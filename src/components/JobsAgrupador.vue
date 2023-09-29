function calcularTempoEmHoras(tempoStr) {
    // Converte uma string de tempo em horas
    const tempo = tempoStr.split(' ');
    const horas = parseInt(tempo[0]);
    return horas;
  }
  
  function agruparJobs(jobs) {
    const jobsOrdenados = jobs.slice().sort((a, b) => {
      const dataA = new Date(a["Data Máxima de conclusão"]);
      const dataB = new Date(b["Data Máxima de conclusão"]);
  
      if (dataA < dataB) return -1;
      if (dataA > dataB) return 1;
  
      const tempoA = calcularTempoEmHoras(a["Tempo estimado"]);
      const tempoB = calcularTempoEmHoras(b["Tempo estimado"]);
  
      return tempoA - tempoB;
    });
  
    const conjuntosDeJobs = [];
    let conjuntoAtual = [];
    let tempoAtual = 0;
    let dataMaxima = null;
  
    for (const job of jobsOrdenados) {
      const tempoJob = calcularTempoEmHoras(job["Tempo estimado"]);
      const dataConclusao = new Date(job["Data Máxima de conclusão"]);
  
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
  }
  
  // Exemplo de uso com o JSON fornecido
  const jobs = [
    {
      "ID": 1,
      "Descrição": "Importação de arquivos de fundos",
      "Data Máxima de conclusão": '2021-02-04 12:00:00',
      "Tempo estimado": '8 horas'
    },
    {
      "ID": 2,
      "Descrição": 'Importação de dados da Base Legada',
      "Data Máxima de conclusão": '2021-02-04 12:00:00',
      "Tempo estimado": '4 horas'
    },
    // ... Outros jobs ...
  ];
  
  const conjuntosDeJobs = agruparJobs(jobs);
  
  // Exibir os conjuntos de jobs
  for (let i = 0; i < conjuntosDeJobs.length; i++) {
    console.log(`Conjunto ${i + 1}:`);
    for (const job of conjuntosDeJobs[i]) {
      console.log(`  ID: ${job.ID}, Descrição: ${job.Descrição}`);
    }
  }
  