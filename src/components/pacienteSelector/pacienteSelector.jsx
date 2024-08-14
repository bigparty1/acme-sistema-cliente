import './pacienteSelector.css';

import  React, { useState } from 'react';
import { faHospitalUser } from "react-icons/fa";
import FormHeader from '../formHeader/formHeader';
import FormFooter from '../formFooter/formFooter';
import SearchBar from '../searchBar/searchBar';
import Table from '../table/table';

import Paciente from '../../data/models/entities/paciente';

//TODO: Importação de pacienteserviços para requisições

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
            //TODO: Pegar dados 
        
        } catch (error) {
 
            console.error(error);
        }
    };

    const  handleSelect = (index) => {
        setPaciente(pacientes[index]);
    };

    return (
        <div className='component-patiente-selector'>
            <FormHeader title={'Selecionar Paciente'} icon={<FaHospitalUser className='icon' />} onClose={onCancel} />
            <SearchBar placeholder='Digite o nome do paciente'  onClick={handleSubmit} value={searchTerm} onChange={handleInputChange}/>
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

