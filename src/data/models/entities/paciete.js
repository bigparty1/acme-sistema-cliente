import LocalISOTime from "../../../utils/localISOTime";
import Sexo from '../sexo';

class Paciente {
    constructor({
        idPaciente  = 0,
        nome =  '',
        nascimento = LocalISOTime().slice(0, 10),
        cpf = '',
        sexo  = Sexo.Feminino,
        cep = '',
        cidade = '',
        bairro = '',
        rua = '',
        complemente = '',
        ativo = true
    }) {

        this.idPaciente = idPaciente;
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.sexo = sexo;
        this.cep = cep;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.complemente = complemente;
        this.ativo = ativo;
    }  
}