import BaseService from "./BaseService";

class PersonService extends BaseService{

    constructor(){
        super('person');
    }

    async login(credentials){
        
        
        const response = await this.api.post(`${this.endPoint}/login`, credentials);
        return response.data;
    }

    
    async register(credentials){
        
        const response = await this.api.post(`${this.endPoint}`, credentials);
        return response.data;
    }

    async validate(credentials){
        
        const response = await this.api.post(`${this.endPoint}/confirm-registration`, credentials);
        return response.data;
    }

    async recover(credentials){
        console.log('Credenciais:', credentials);
        
        const response = await this.api.post(`${this.endPoint}/password-code-request`, credentials);
        return response.data;
    }

    async changeLogout(credentials){
        console.log('Credenciais:', credentials);
        const response = await this.api.post(`${this.endPoint}/reset-password`, credentials);
        return response.data;
    }

    async changeLogin(credentials){
        console.log('Credenciais:', credentials);
        const response = await this.api.post(`${this.endPoint}/change-password`, credentials);
        return response.data;
    }
}

export default PersonService;