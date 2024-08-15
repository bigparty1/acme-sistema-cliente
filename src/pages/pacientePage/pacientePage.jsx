import './pacientePage.css';

import React, {useEffect,  useState} from 'react';
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa';

import PacienteForm from '../../components/pacienteForm/pacienteForm';
import Overlay from '../../components/overlay/overlay';
import SearchBar from '../../components/searchBar/searchBar';
import TableNavegation from '../../components/tableNavegation/tableNavegation';
import Button from '../../components/button/button';
import ToggleButton from '../../components/toggle/toggle';

import Paciente from '../../data/models/entities/paciente';

import PacienteServices from '../../services/pacienteServices';
const pacienteServices = new PacienteServices();


export default function PacientePage() {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState(new Paciente({}));
    const [search, setSearch] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [activeStatus, setActiveStatus] = useState(true);
    const [actionsButtonData, setActionsButtonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(1);

    const onStatusChange = (status) => {
        setActiveStatus(status);
    };

    useEffect(() => {
        if(activeStatus)
            setActionsButtonData([
                { label: 'edit', icon: <FaEdit className='icon'/>, action: onEdit, style: {fontSize: '20px', color: '#007bff'}, tooltip: 'Editar Paciente' },
                { label: 'delete', icon: <FaTrash className='icon' />, action: onInativate, style: {fontSize: '18px', color: '#cc4856'}, tooltip: 'Inativar Paciente' }
            ]);
        else
            setActionsButtonData([
                { label: 'restore', icon: <FaTrashRestore className='icon'/>, action: onActivate, style: {fontSize: '18px', color: '#007bff'}, tooltip: 'Ativar Paciente' }
            ]);
        
        onSearch();
    }, [activeStatus]);

    const onSearchChange = (search) => {
        setSearch(search);
    };

    const onSearch = async () => {
        try {
            const response = await pacienteServices.getPacientes(search, activeStatus, currentPage, pageSize);
            setCurrentPage(response.paginaAtual);
            setTotalPages(Math.ceil(response.totalItems/response.totalPorPaginas));
            setPacientes(response.items.map(item => ({
                paciente: new Paciente(item), 
                Nome: item.nome,
                Nascimento: new Date(item.nascimento).toLocaleDateString(),
                CPF: item.cpf,
                Sexo: item.sexo === 0 ? 'Feminino' : 'Masculino'})));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const onEdit = (obj) => {
        let paciente = obj.paciente;
        setPaciente(paciente);
        setIsFormVisible(true);
    };

    const onInativate = async (obj) => {
        let paciente = obj.paciente;
        try {
            paciente.ativo = false;
            await pacienteServices.updatePaciente(paciente);
            onSearch();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const onActivate = async (obj) => {
        let paciente = obj.paciente;
        try {
            paciente.ativo = true;
            await pacienteServices.updatePaciente(paciente);
            onSearch();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const cancelPacienteForm = () => {
        setIsFormVisible(false);
    };

    const PacienteFormSave = async (paciente) => {
        
        if(paciente.idPaciente){ //update
            try {
                await pacienteServices.updatePaciente(paciente);
                onSearch();
                setIsFormVisible(false);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        } else { //create
            try {
                await pacienteServices.createPaciente(paciente);
                onSearch();
                setIsFormVisible(false);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }
    };

    const AddPaciente = () => {
        setPaciente(new Paciente({}));
        setIsFormVisible(true);
    };

    const onNextPage = () => {
        if(currentPage < totalPages)
            setCurrentPage(currentPage + 1);
    }

    const onPrevPage = () => {
        if(currentPage > 1)
            setCurrentPage(currentPage - 1);
    }

    const onFirstPage = () => {
        setCurrentPage(1);
    }

    const onLastPage = () => {
        setCurrentPage(totalPages);
    }

    useEffect(() => {
        onSearch();
    }, [currentPage]);

    return (
        <div>
            <Overlay isVisible={isFormVisible}>
                <PacienteForm pacienteData={paciente} 
                            onCancel={cancelPacienteForm}
                            onSave={PacienteFormSave}/>
            </Overlay>

            <div className='patient-page-header'>
                <span>Paciente</span>
            </div>

            <div className='patient-page-content'>

                <div className='patient-page-content-search-addbtn'>  
                    <SearchBar placeholder='Digite o nome do paciente'
                                value={search}
                                onChange={onSearchChange}
                                onClick={onSearch}
                    />
                    <Button onClick={AddPaciente} content={'Adicionar Paciente'} />

                    <ToggleButton content={activeStatus == true ? 'Pacientes Ativos' : 'Pacientes Inativos'} 
                                    value={activeStatus}
                                    onChange={onStatusChange}
                                    style={{width: '200px'}}/>
                    
                </div>
                <TableNavegation
                    showActionButton={true}
                    actionButtonData={actionsButtonData}
                    canSelectRow={false}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    columns={['Nome', 'Nascimento', 'CPF', 'Sexo']}
                    data={pacientes}
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    onFirst={onFirstPage}
                    onLast={onLastPage}
                />
            </div>
        </div>
    );
}