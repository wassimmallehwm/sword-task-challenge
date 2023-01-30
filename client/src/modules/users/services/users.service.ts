import { Account } from '@modules/users/models/Account';
import { BaseService } from '@shared/services/base.service';
import { Page } from '@shared/types';

class UsersService extends BaseService {
    private SRC_URL = "users/";

    private static instance: UsersService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new UsersService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    list(query?: any){
        return this.httpClient<Page<Account>>({
            apiUrl: this.httpUrl('list'),
            method: "POST",
            body: query
        });
    }

}

export default UsersService.getInstance();

