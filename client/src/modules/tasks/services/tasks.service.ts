import { BaseService } from '@shared/services/base.service';
import { Page } from '@shared/types';
import { Task } from '../models/task';

class TasksService extends BaseService {
    private SRC_URL = "tasks/";

    constructor() {
        super();
    }
    static instance = new TasksService();

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    list(query?: any){
        return this.httpClient<Page<Task>>({
            apiUrl: this.httpUrl('list'),
            method: "POST",
            body: query
        });
    }

    save(id: string|undefined, data: Task){
        if(id && id.trim() !== ""){
            return this.update(id, data);
        }
        return this.create(data);
    }

    create(data: Task){
        return this.httpClient<Task>({
            apiUrl: this.httpUrl(''),
            method: "POST",
            body: data
        });
    }

    update(id: string, data: Task){
        return this.httpClient<Task>({
            apiUrl: this.httpUrl(id),
            method: "PUT",
            body: data
        });
    }

    delete(id: string){
        return this.httpClient({
            apiUrl: this.httpUrl(id),
            method: "DELETE"
        });
    }

}

export default TasksService.instance;

