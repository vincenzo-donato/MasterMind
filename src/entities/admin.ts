import { User } from "./user";
import { UserService } from "../services/userService";

export class Admin implements User {

    constructor(private accountNameUser:string, private password:string,private accountBloccato:boolean = false, private permessi:string){

    }

    get isBlocked() {
        return this.accountBloccato
    }
    
    get accountName(){
        return this.accountNameUser
    }


    get accountPassword(){
        return this.password
    }


    get gestionePermessi(){
        return this.permessi
    }

    public tentativoErrato(){
        return this.accountBloccato = true;
    }


}
