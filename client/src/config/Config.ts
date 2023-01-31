import menu from './json/menu.json'

export class Config {

    static host = "localhost"
    static port = "4000"

    static prod = {
        apiUrl: `/api/`,
        publicUrl: "/public/",
        socketUrl: "/"
    };

    static dev = {
        apiUrl: `http://${this.host}:${this.port}/api/`,
        publicUrl: `http://${this.host}:${this.port}/public/`,
        socketUrl: `ws://${this.host}:${this.port}`,
    };

    public static getConfig(){
        return process.env.NODE_ENV === 'development' ? this.dev : this.prod
    }

    public static getMenu(role: string){
        const result = menu.filter((menu: any) => menu.roles.find((elem: string) => elem == role || elem == "ALL") != undefined)
        return result
    }

    public static getBaseUrl(){
        return this.getConfig().apiUrl.split('/api')[0]
    }
}
