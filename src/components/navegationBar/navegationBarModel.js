class navegationBarModel {
    constructor({label, path, icon, className, pageComponent}) {
        this.label = label;
        this.path = path;
        this.icon = icon;
        this.className = className;
        this.pageComponent = pageComponent;
    }
}

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