import './navegationBarModel';

import { FaHospitalUser } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";

import PatientPage from '../../pages/patient/patient.jsx';
import TreatmentPage from '../../pages/treatment/treatment.jsx';

import navegationBarModel from '../components/navegationBar/navegationBarModel';

const navBarData = [
    new navegationBarModel({
        label: 'Paciente',
        path: '/Paciente',
        icon: <FaHospitalUser/>,
        className: 'navbar-patient',
        pageComponent: <PatientPage />
    }),
    new navegationBarModel({
        label: 'Tratamento',
        path: '/Tratamento',
        icon: <FaFileWaveform/>,
        className: 'navbar-treatment',
        pageComponent: <TreatmentPage />
    })
];

export default navBarData;