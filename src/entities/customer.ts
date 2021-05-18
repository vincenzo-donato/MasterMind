import { UserService } from "../services/userService";
import { User } from "./user";

export class Customer implements User {

    constructor(private accountNameUser:string, private password:string, private contoTot:number = 0, public accountBloccato:boolean = true){

    }

    get isBlocked() {
        return this.accountBloccato
    }
    
    get recuperaContoTot(){
        return this.contoTot;
    }
    
    get accountName(){
        return this.accountNameUser
    }

    get accountTentativi(){
        return this.accountBloccato;
    }

    get accountPassword(){
        return this.password
    }

    public tentativoErrato(){
            return this.accountBloccato = true;
    }

    public ripristinoCustomer(){
        return this.accountBloccato = false;
    }

    public prelievo(prelievoInserito):boolean{
        let trasformaCifraDesiderata = Number(prelievoInserito);
        if(this.contoTot >= trasformaCifraDesiderata && trasformaCifraDesiderata <= 500){
            let newConto = this.contoTot - trasformaCifraDesiderata;
            this.contoTot = newConto;
            return false;
        }
        else{
            return true;
        }
    }

    public deposito(deposito):boolean{
        let trasformaCifraDesiderata = Number(deposito);
        if(trasformaCifraDesiderata >= 1){
            let newConto = this.contoTot + trasformaCifraDesiderata;
            this.contoTot = newConto;
            return false;
        }
        else{
            return true;
        }
    }

    public deleteAccount(users,userName){
        users.forEach((element,index)=>{
            if(element.accountName == userName){
                users.splice(index,1);
            }
        });
    }

}


function singledon(singledon: any) {
    throw new Error("Function not implemented.");
}