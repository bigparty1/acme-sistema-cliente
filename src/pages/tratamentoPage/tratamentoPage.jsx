import './tratamentoPage.css';

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa';

import TratamentoForm  from '../../components/tratamentoForm/tratamentoForm';
import PacienteSelector from '../../components/pacienteSelector/pacienteSelector';
import Overlay from '../../components/overlay/overlay';
import Button from '../../components/button/button';
import ToggleButton from '../../components/toggle/toggle';
import TableNavegation from '../../components/tableNavegation/tableNavegation';

import Tratamento from '../../data/models/entities/tratamento';
import Paciente from '../../data/models/entities/paciente';
import LocalISOTime from '../../utils/localISOTime';

import TratamentoServices from '../../services/tratamentoServices';
const tratamentoServices = new TratamentoServices();

export default function TratamentoPage() {

    const [isPacienteSelectorVisible, setIsPacienteSelectorVisible] = useState(false);
    const [isTratamentoFormVisible, setIsTratamentoFormVisible] = useState(false);
    const [paciente, setPaciente] = useState(new Paciente({}));
    const [tratamento, setTratamento] = useState(new Tratamento({}));
    const [tratamentos, setTratamentos] = useState([]);
    const [isNewTratamento, setIsNewTratamento] = useState(false);
    const [pageSize, setPageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [actionButtonData, setActionButtonData] = useState([]);
    const [initialDate, setInitialDate] = useState(LocalISOTime(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)).slice(0, 10));
    const [finalDate, setFinalDate] = useState(LocalISOTime().slice(0, 10));
    const [active, setActive] = useState(true);

    const onPacienteSelector = () => {
        setIsPacienteSelectorVisible(true);
    };

    const cancelPacienteSelector = () => {
        setIsPacienteSelectorVisible(false);
    };

    const onPacienteSelect = (paciente) => {
        setPaciente(paciente);
        setIsPacienteSelectorVisible(false);
    };

    const onAddTratamento = () => {
        setIsNewTratamento(true);
        setIsPacienteSelectorVisible(true);
    };

    const onCancelTratamentoForm = () => {
        setIsNewTratamento(false);
        setIsTratamentoFormVisible(false);
    };

    const onStatusChange = (status) => {
        setActive(status);
    };

    const onEdit = (obj) => {
        let tratamento = obj.tratamento;
        setTratamento(tratamento);
        setIsTratamentoFormVisible(true);
    }

    const onInativate = async (obj) => {
        try {
            let tratamento = obj.tratamento;
            tratamento.ativo = false;
            await tratamentoServices.updateTratamento(tratamento);
            getTratamentos();
        } catch (error) {
            console.error(error);
        }
    }

    const onActivate = async (obj) => {
        try {
            let tratamento = obj.tratamento;
            tratamento.ativo = true;
            await tratamentoServices.updateTratamento(tratamento);
            getTratamentos();
        } catch (error) {
            console.error(error);
        }
    }

    const  updateTableButtons = () => {
        if(active)
            setActionButtonData([
                { label: 'edit', icon: <FaEdit className='icon'/>, action: onEdit, style: {fontSize: '20px', color: '#007bff'}, tooltip: 'Editar tratamento' },
                { label: 'delete', icon: <FaTrash className='icon' />, action: onInativate, style: {fontSize: '18px', color: '#cc4856'}, tooltip: 'Inativar tratamento' }
            ]);
        else
            setActionButtonData([
                { label: 'restore', icon: <FaTrashRestore className='icon'/>, action: onActivate, style: {fontSize: '18px', color: '#007bff'}, tooltip: 'Ativar tratamento' }
            ]); 
    };

    const onSaveTratmentoForm = async (tratamento) => {
        try {
            if(tratamento.idTratamento) { //update
                await tratamentoServices.updateTratamento(tratamento);
                setIsTratamentoFormVisible(false);
                alert('Tratamento atualizado com sucesso!');
            }
            else  //create
            {
                await tratamentoServices.createTratamento(tratamento);
                setIsTratamentoFormVisible(false);
                alert('Tratamento criado com sucesso!');
            }
            getTratamentos();
        } catch (error) {
            console.error(error);
        }
    };

    const getTratamentos = async () => {
        
        if(paciente.idPaciente === 0)
            return;
        
        try {
            let response = await tratamentoServices.getTratamentos(paciente.idPaciente, initialDate, finalDate, active, currentPage, pageSize);
            setCurrentPage(response.paginaAtual);
            setTotalPages(Math.ceil(response.totalItems/response.totalPorPaginas));
            setTratamentos(response.items.map(item => ({
                tratamento: new Tratamento({...item, 
                                            paciente: paciente,
                                            data: LocalISOTime(item.data).slice(0, 16)}),
                Data: new Date(item.data).toLocaleString('pt-BR', 
                    { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: false 
                    }),
                Descrição: item.descricao.substring(0, 60).replace('\n', ' ') + '...' })));
        } catch (error) {
            console.error(error);
        }
    };

    const onInitialDateChange = (event) => {
        setInitialDate(event.target.value);
    };

    const onFinalDateChange = (event) => {
        setFinalDate(event.target.value);
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
        getTratamentos();
    }, [currentPage]);

    useEffect(() => {
        updateTableButtons();

        if(isNewTratamento) {
            setIsNewTratamento(false);
            setTratamento(new Tratamento({paciente: paciente, data: LocalISOTime(new Date()).slice(0, 16), idPaciente: paciente.idPaciente}));
            setIsTratamentoFormVisible(true);
        } else if (paciente.idPaciente !== 0)
        {
            getTratamentos();
        }
    }, [paciente, initialDate, finalDate]);

    useEffect(() => {
        updateTableButtons();
        getTratamentos();
    }, [active]);

    return (
<div>
            <Overlay isVisible={isTratamentoFormVisible}>
                <TratamentoForm tratamentoData={tratamento} onCancel={onCancelTratamentoForm} onSave={onSaveTratmentoForm}/>
            </Overlay>

            <Overlay isVisible={isPacienteSelectorVisible}>
                <PacienteSelector onCancel={cancelPacienteSelector} onSelect={onPacienteSelect}/>
            </Overlay>
            
            <div className='treatment-page-header'>
                <span>Tratamento</span>
            </div>

            <div className='treatment-page-content'>

                <div className='treatment-page-filters'>

                    <Button content='Selecionar Paciente' onClick={onPacienteSelector}/>

                    <div className='treatment-page-patient-name'>
                        <span className='treatment-page-label'>Paciente: {paciente.nome}</span>
                    </div>

                    <div className='treatment-page-date-init'>
                        <span className='treatment-page-label'>Data Inicial</span>
                        <input type='date' name='dateInit' value={initialDate} onChange={onInitialDateChange} max={LocalISOTime().slice(0, 10)}/>
                    </div>
                    <div className='treatment-page-date-end'>
                        <span className='treatment-page-label'>Data Final</span>
                        <input type='date' name='dateEnd' value={finalDate} onChange={onFinalDateChange} max={LocalISOTime().slice(0, 10)} />
                    </div>

                    <Button content='Novo Tratamento' onClick={onAddTratamento} />

                    <ToggleButton content={active === true ? 'Tratamentos Ativos' : 'Tratamentos Inativos'}
                                    value={active}
                                    onChange={onStatusChange}
                                    style={{width: '220px'}} />
                </div>
                <TableNavegation 
                    columns={['Data', 'Descrição']}
                    data={tratamentos}
                    showActionButton={true}
                    actionButtonData={actionButtonData}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    onFirst={onFirstPage}
                    onLast={onLastPage}
                />
            </div>
        </div>
    );


}