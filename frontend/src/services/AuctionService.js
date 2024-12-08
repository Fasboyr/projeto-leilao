import BaseService from "./BaseService";

class AuctionService extends BaseService{

    constructor(){
        super('auction');
    }

    
    async createAuction(data){
        console.log('Entoru no createAuction: ', data);
        
        const response = await this.api.post(`${this.endPoint}/public`, data);
        return response.data;
    }

    async updateAuction(data){
        const response = await this.api.put(`${this.endPoint}/public`, data);
        return response.data;
    }

    async listAuction(){
        const response = await this.api.get(`${this.endPoint}`);
        return response.data;
    }

    async listAuctionPublic(){
        const response = await this.api.get(`${this.endPoint}/public`);
        return response.data;
    }

    async deleteAuction(id){
        console.log('Delete do leilao: ', id);
        
        const response = await this.api.delete(`${this.endPoint}/public/${id}`);
        return response.data;
    }

}

export default AuctionService;