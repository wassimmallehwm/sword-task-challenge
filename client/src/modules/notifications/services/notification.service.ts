import { BaseService } from '../../../shared/services/base.service';

export class NotificationsService extends BaseService {
    SRC_URL = "notifications/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    findTopFive(){
        return this.httpClient(this.httpUrl('top-five'), "GET");
    }
    
    count(){
        return this.httpClient(this.httpUrl('count'), "GET");
    }
    
    read(id: string){
        return this.httpClient(this.httpUrl(`read/${id}`), "GET");
    }

    list(query?: any){
        return this.httpClient(this.httpUrl('list'), "GET", query);
    }

    findOne(id: string){
        return this.httpClient(this.httpUrl(id), 'GET');
    }
    
    approve(id: string){
        return this.httpClient(this.httpUrl(`approve/${id}`), "PUT", null);
    }
    
    reject(id: string, comment: string){
        return this.httpClient(this.httpUrl(`reject/${id}`), "PUT", {comment});
    }

}

