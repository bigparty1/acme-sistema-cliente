class PacienteServices {

    constructor() {
        this.acmeSistemaAPI = process.env.REACT_APP_ACME_SISTEMA_API;
    }

    async getPacientes(prefix, status, page, pageSize) {
        
        const response = await fetch(`${this.acmeSistemaAPI}/api/Paciente?status=${status}&nomePrefixo=${prefix}&pagina=${page}&quantidadePorPagina=${pageSize}`);
        
        if(!response.ok) {
            throw await response.text();
        }

        return await response.json();
    }

    async updatePaciente(paciente) {

        const response = await fetch(`${this.acmeSistemaAPI}/api/Paciente`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });

        if(!response.ok) {
            throw await response.text();
        }
    }

    async createPaciente(paciente) {

        const response = await fetch(`${this.acmeSistemaAPI}/api/Paciente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });

        if(!response.ok) {
            throw await response.text();
        }
    }
}

export default PacienteServices;