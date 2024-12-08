import BaseService from "./BaseService";

class ImageService extends BaseService{

    constructor(){
        super('image');
    }

    
    async createImage(data){
        
        const response = await this.api.post(`${this.endPoint}`, data);
        return response.data;
    }

    async updateImage(data){
        const response = await this.api.put(`${this.endPoint}`, data);
        return response.data;
    }

    async listImage(){
        const response = await this.api.get(`${this.endPoint}`);
        return response.data;
    }


    async deleteImage(id){
        const response = await this.api.delete(`${this.endPoint}/${id}`);
        return response.data;
    }

}

export default ImageService;