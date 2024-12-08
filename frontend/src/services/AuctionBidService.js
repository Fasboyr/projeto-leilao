import BaseService from "./BaseService";

class AuctionBidService extends BaseService{

    constructor(){
        super('bid');
    }

    
    async createBid(data){
        
        const response = await this.api.post(`${this.endPoint}`, data);
        return response.data;
    }

    async updateBid(data){
        const response = await this.api.put(`${this.endPoint}`, data);
        return response.data;
    }

    async listBid(){
        const response = await this.api.get(`${this.endPoint}`);
        return response.data;
    }


    async deleteBid(id){
        const response = await this.api.delete(`${this.endPoint}/${id}`);
        return response.data;
    }

}

export default AuctionBidService;