import { Page } from '@shared/types';
import { BaseService } from '../../../shared/services/base.service';
import { Notification } from '../models/notification';

export class NotificationsService extends BaseService {
    SRC_URL = "notifications/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    findTop(){
        return this.httpClient<Page<Notification>>(this.httpUrl('list'), "GET", {limit: 5});
    }
    
    count(){
        return this.httpClient<number>(this.httpUrl('count'), "GET");
    }
    
    read(id: string){
        return this.httpClient(this.httpUrl(`read/${id}`), "GET");
    }

    list(query?: any){
        return this.httpClient<Page<Notification>>(this.httpUrl('list'), "GET", query);
    }

}

