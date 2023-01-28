import { Account } from '@modules/users/models/Account';
import { BaseService } from '@shared/services/base.service';
import { AuthResponse } from '@shared/types';

class AuthService extends BaseService {
    private SRC_URL = "auth/";

    private static instance: AuthService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new AuthService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    authenticate(data?: any){
        return this.httpClient<Account>(this.httpUrl('login'), "POST", data);
    }

    signup(data?: any){
        return this.httpClient(this.httpUrl('signup'), 'POST', data);
    }

}

export default AuthService.getInstance();
