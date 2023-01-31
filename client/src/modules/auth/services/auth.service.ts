import { Account } from '@modules/users/models/Account';
import { BaseService } from '@shared/services/base.service';

class AuthService extends BaseService {
    private SRC_URL = "auth/";

    constructor() {
        super();
    }
    static instance = new AuthService();

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    authenticate(data?: any){
        return this.httpClient<Account>({
            apiUrl: this.httpUrl('login'),
            method: "POST",
            body: data
        });
    }

}

export default AuthService.instance;
