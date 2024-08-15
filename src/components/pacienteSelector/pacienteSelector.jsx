import './pacienteSelector.css';

import  React, { useState } from 'react';
import { FaHospitalUser } from "react-icons/fa";
import FormHeader from '../formHeader/formHeader';
import FormFooter from '../formFooter/formFooter';
import SearchBar from '../searchBar/searchBar';
import Table from '../table/table';

import Paciente from '../../data/models/entities/paciente';

import PacienteServices from '../../services/pacienteServices';
const pacienteServices = new PacienteServices();

export default function PacienteSelector({ onSelect, onCancel }) 
{
    const [paciente, setPaciente] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (value) => {
        setSearchTerm(value);
    };

    const onSelectClick = () => {
        if(paciente)
            onSelect(paciente);
        else
            alert('Selecione um paciente');
    }

    const handleSubmit = async () => {

        if(searchTerm === '')
        {
            alert('Digite o nome do paciente');
            return;
        }

        try {
            const response = await pacienteServices.getPacientes(searchTerm, true, 1, 50);
            setPacientes(response.items.map(item => ({paciente: new Paciente(item), Nome: item.nome, CPF: item.cpf})));
        
        } catch (error) {
 
            console.error(error);
        }
    };

    const  handleSelect = (index) => {
        setPaciente(pacientes[index].paciente);
    };

    return (
        <div className='component-patiente-selector'>
            <FormHeader title={'Selecionar Paciente'} icon={<FaHospitalUser className='icon' />} onClose={onCancel} />
            <SearchBar placeholder='Digite o nome do paciente ou CPF'  onClick={handleSubmit} value={searchTerm} onChange={handleInputChange}/>
            <div className='table-container'>
                <Table 
                    columns={['Nome', 'CPF']}
                    showActionButton={false}
                    canSelectRow={true}
                    onRowSelect={handleSelect}
                    data={pacientes}
                />
            </div>
            <FormFooter onCancel={onCancel} onSave={onSelectClick} nameRight='Selecionar' />
        </div>
    );

}

