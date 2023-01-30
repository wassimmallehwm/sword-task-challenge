import { Page } from '@shared/types';
import { BaseService } from '../../../shared/services/base.service';
import { Notification } from '../models/notification';

class NotificationsService extends BaseService {
    SRC_URL = "notifications/";

    private static instance: NotificationsService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new NotificationsService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    findTop(){
        return this.httpClient<Page<Notification>>({
            apiUrl: this.httpUrl('list'),
            method: "POST",
            body: {limit: 4}
        });
    }
    
    count(){
        return this.httpClient<number>({
            apiUrl: this.httpUrl('count'),
            method: "GET"
        });
    }
    
    read(id: string){
        return this.httpClient<number>({
            apiUrl: this.httpUrl(`read/${id}`),
            method: "GET"
        });
    }

    list(query?: any){
        return this.httpClient<Page<Notification>>({
            apiUrl: this.httpUrl('list'),
            method: "POST",
            body: query
        });
    }

}

export default NotificationsService.getInstance();

