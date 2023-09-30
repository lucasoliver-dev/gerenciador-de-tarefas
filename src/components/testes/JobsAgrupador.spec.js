import { mount } from '@vue/test-utils';
import JobsAgrupador from '@/components/JobsAgrupador.vue';

describe('JobsAgrupador', () => {
    it('Agrupa os jobs corretamente', () => {
      const wrapper = mount(JobsAgrupador, {
        propsData: {
          jobs,
        },
      });
  
      // Verificando se o componente renderiza os grupos corretamente
      const grupos = wrapper.findAll('.grupo');
      expect(grupos.length).toBe(2);
  
      // Verificando se a duração de cada grupo não excede 8 horas
      grupos.wrappers.forEach((grupo) => {
        const tempoTotal = grupo.findAll('.tempo-estimado').wrappers.reduce(
          (total, tempo) => total + parseInt(tempo.text(), 10),
          0
        );
        expect(tempoTotal).toBeLessThanOrEqual(8);
      });
    });
  });


