import './tratamentoForm.css';

import React, { useState } from 'react';
import { FaFileWaveform } from "react-icons/fa6";
import FormHeader from '../formHeader/formHeader';
import FormFooter from '../formFooter/formFooter';

import Tratamento from '../../data/models/entities/tratamento';
import LocalISOTime from '../../utils/localISOTime';

export default function TratamentoForm({ tratamentoData = new Tratamento(), onCancel, onSave }) {

    const [tratamento, setTratamento] = useState(new Tratamento(tratamentoData));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTratamento({ ...Tratamento, [name]: value });
    };

    const getCurrentDateTime = () => {
        return LocalISOTime().slice(0, 16);
    };

    return (
        <div className='component-tratamento-form'>
            <FormHeader title={'Tratamento'} icon={<FaFileWaveform className='icon' />} onClose={onCancel} />
            <form className='component-tratamento-form-form'>
                <label>Paciente: {tratamento.paciente.nome}</label>
                <label>Data</label>
                <input type='datetime-local' name='date' value={tratamento.data} max={getCurrentDateTime} onChange={handleChange} />
                <label>Descrição</label>
                <textarea name='description' value={tratamento.descricao} onChange={handleChange} />
            </form>
            <FormFooter onCancel={onCancel} onSave={() => onSave(tratamento)} />
        </div>
    );
}

