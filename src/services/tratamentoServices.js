class TratamentoServices {

    constructor() {
        // this.acmeSistemaAPI = process.env.REACT_APP_ACME_SISTEMA_API;
        this.acmeSistemaAPI = 'http://acmesistema.servehttp.com:90';
    }

    async getTratamentos(idPaciente, initialDate, finalDate, status, page, pageSize) {
        
        const response = await fetch(`${this.acmeSistemaAPI}/api/Tratamento?idPaciente=${idPaciente}&dataInicial=${initialDate}&dataFinal=${finalDate}&status=${status}&pagina=${page}&quantidadePorPagina=${pageSize}`);
        
        if(!response.ok) {
            throw await response.text();
        }

        return await response.json();
    }

    async updateTratamento(tratamento) {

        const response = await fetch(`${this.acmeSistemaAPI}/api/Tratamento`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tratamento)
        });

        if(!response.ok) {
            throw await response.text();
        }
    }

    async createTratamento(tratamento) {

        const response = await fetch(`${this.acmeSistemaAPI}/api/Tratamento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tratamento)
        });

        if(!response.ok) {
            throw await response.text();
        }
    }
}

export default TratamentoServices;