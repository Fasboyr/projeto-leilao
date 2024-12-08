import BaseService from "./BaseService";

class CategoryService extends BaseService{

    constructor(){
        super('category');
    }

    
    async createCategory(data){
        console.log('Create data:', data);
        
        const response = await this.api.post(`${this.endPoint}`, data);
        return response.data;
    }

    async updateCategory(data){
        
        console.log('Update data:', data);
        const response = await this.api.put(`${this.endPoint}`, data);
        return response.data;
    }

    async listCategory(){
        const response = await this.api.get(`${this.endPoint}`);
        return response.data;
    }


    async deleteCategory(id){
        console.log('Entrou no dele, id: ', id);
        
        const response = await this.api.delete(`${this.endPoint}/${id}`);
        return response.data;
    }

}

export default CategoryService;