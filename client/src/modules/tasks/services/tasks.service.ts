import { BaseService } from '@shared/services/base.service';
import { Page } from '@shared/types';
import { Task } from '../models/task';

class TasksService extends BaseService {
    private SRC_URL = "tasks/";

    private static instance: TasksService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new TasksService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    list(query?: any){
        return this.httpClient<Page<Task>>(this.httpUrl('list'), "POST", query);
    }

    findOne(id: string){
        return this.httpClient<Task>(this.httpUrl(id), 'GET');
    }

    save(id: string|undefined, data: Task){
        if(id && id.trim() !== ""){
            return this.update(id, data);
        }
        return this.create(data);
    }

    create(data: Task){
        return this.httpClient(this.httpUrl(""), 'POST', data);
    }

    update(id: string, data: Task){
        return this.httpClient(this.httpUrl(id), 'PUT', data);
    }

    delete(id: string){
        return this.httpClient(this.httpUrl(id), 'DELETE');
    }

}

export default TasksService.getInstance();

