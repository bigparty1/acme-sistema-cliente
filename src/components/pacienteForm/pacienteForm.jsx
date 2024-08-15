import  './pacienteForm.css';

import React, { useState } from 'react';
import { FaHospitalUser } from 'react-icons/fa6';
import FormHeader from '../formHeader/formHeader';
import FormFooter from '../formFooter/formFooter';

import  Paciente from '../../data/models/entities/paciente';
import  Sexo from '../../data/models/sexo';

export default function PacienteForm({ pacienteData = {}, onCancel, onSave }) {

    const [paciente, setPaciente] = useState(new Paciente(pacienteData));

    const formatCPF = (cpf) => {  //Formata CPF para 000.000.000-00
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    const handleCPFChange = (event) => {
        let {value } = event.target;
        value = formatCPF(value);
        setPaciente({...paciente, cpf: value});
    };

    const formatCEP = (cep) => {  //Formata CEP para 00000-000
        cep = cep.replace(/\D/g, '');
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
        return cep;
    }

    const handleCEPChange = (event) => {
        let {value } = event.target;
        value = formatCEP(value);
        setPaciente({...paciente, cep: value});
    };
    
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setPaciente({ 
            ...paciente, 
            [name]: type === 'radio' ? (checked ? value : paciente[name]) : value 
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Tab' || event.key === 'Backspace') 
            return;

        if(!/[0-9]/.test(event.key))
            event.preventDefault();
    };

    return (
        <div className='component-patiente-form'>
            <FormHeader title={'Paciente'} icon={<FaHospitalUser className='icon' />} onClose={onCancel} />
            <form className='component-patiente-form-form'>
                <label>Nome</label>
                <input type='text' name='nome' value={paciente.nome} onChange={handleChange} />
                <label>CPF</label>
                <input type='text' 
                    name='cpf' 
                    value={paciente.cpf} 
                    onChange={handleCPFChange} 
                    onKeyDown={handleKeyPress} 
                    maxLength="14" 
                />
                <label>Data de Nascimento</label>
                <input type='date' name='nascimento' value={paciente.nascimento} onChange={handleChange} />
                <label>CEP</label>
                <input type='text' 
                    name='zipCod' 
                    value={paciente.cep} 
                    onChange={handleCEPChange} 
                    onKeyDown={handleKeyPress} 
                    maxLength="9" 
                />
                <label>Sexo Biológico</label>
                <div className='radio-group'>
                    <input type='radio' 
                        name='sexo' 
                        value={Sexo.Masculino} 
                        checked={paciente.sexo == Sexo.Masculino} 
                        onChange={handleChange} 
                    /> <label>Masculino</label>
                    <input 
                        type='radio' 
                        name='sexo' 
                        value={Sexo.Feminino} 
                        checked={paciente.sexo == Sexo.Feminino} 
                        onChange={handleChange} 
                    /> <label>Feminino</label>
                </div>
                <label>Cidade</label>
                <input type='text' name='cidade' value={paciente.cidade} onChange={handleChange} />
                <label>Bairro</label>
                <input type='text' name='bairro' value={paciente.bairro} onChange={handleChange} />
                <label>Rua</label>
                <input type='text' name='rua' value={paciente.rua} onChange={handleChange} />
                <label>Complemento</label>
                <input type='text' name='complemento' value={paciente.complemento} onChange={handleChange} />
            </form>
            <FormFooter onCancel={onCancel} onSave={() => onSave(paciente)} />
        </div>
    );
}
