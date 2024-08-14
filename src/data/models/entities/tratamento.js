import LocalISOTime from '../../../utils/localISOTime';
import Paciente from './paciente';

class Tratamento {
    constructor({
        idTratamento = 0,
        idPaciente = 0,
        data = LocalISOTime().slice(0, 16),
        descricao = '',
        ativo = true,
        paciente = new Paciente({})
    }) {
        this.idTratamento = idTratamento;
        this.idPaciente = idPaciente;
        this.data = data;
        this.descricao = descricao;
        this.ativo = ativo;
        this.paciente = paciente;
    }
}

export default Tratamento;