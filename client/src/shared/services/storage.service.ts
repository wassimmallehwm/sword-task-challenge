import { Account } from "@modules/users/models/Account";

class StorageService {
    private _USER_DATA = "userData";

    constructor() {
    }

    static instance = new StorageService();

    setUserData(userData: Account){
        localStorage.setItem(this._USER_DATA, JSON.stringify(userData))
    }

    getUserData(): Account | null{
        const data = localStorage.getItem(this._USER_DATA)
        if(data){
            return JSON.parse(data)
        }
        return null
    }

    clearUserData(){
        localStorage.removeItem(this._USER_DATA)
    }

}

export default StorageService.instance;

