import './navegationBarModel';

import { FaHospitalUser } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";

import PacientePage from '../../pages/pacientePage/pacientePage.jsx';
import TratamentoPage from '../../pages/tratamentopage/tratamentopage.jsx';

import NavegationBarModel from '../components/navegationBar/navegationBarModel';

const navBarData = [
    new NavegationBarModel({
        label: 'Paciente',
        path: '/Paciente',
        icon: <FaHospitalUser/>,
        className: 'navbar-patient',
        pageComponent: <PacientePage />
    }),
    new NavegationBarModel({
        label: 'Tratamento',
        path: '/Tratamento',
        icon: <FaFileWaveform/>,
        className: 'navbar-treatment',
        pageComponent: <TratamentoPage />
    })
];

export default navBarData;