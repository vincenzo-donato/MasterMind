import { User } from "./user";
import { Customer } from "./customer";

export class SpecialCustomer extends Customer {
    
    constructor(accountName:string, accountPassword:string,private contoSpeciale:number = 0,accountBloccato:boolean = true){
        super(accountName,accountPassword, contoSpeciale,accountBloccato);
    }

    get isBlocked() {
        return this.accountBloccato
    }

    get contoCustomerSpeciale(){
        return this.contoSpeciale;
    }

    public ripristinoSpecialCustomer(){
        return super.ripristinoCustomer;
    }

    public prelievo(prelievoInserito):boolean{
        let trasformaCifraDesiderata = Number(prelievoInserito);
        if(this.contoSpeciale >= trasformaCifraDesiderata){
            let newConto = this.contoSpeciale - trasformaCifraDesiderata;
            this.contoSpeciale = newConto;
            return false;
        }
        else{
            return true;
        }
    }

    public deposito(deposito):boolean{
        let trasformaCifraDesiderata = Number(deposito);
        if(trasformaCifraDesiderata >= 1){
            let newConto = this.contoSpeciale + trasformaCifraDesiderata;
            this.contoSpeciale = newConto;
            return false;
        }
        else{
            return true;
        }
    }

    public deleteAccountSuperCustomer(users,userName){
        return super.deleteAccount(users,userName)
    }

}


