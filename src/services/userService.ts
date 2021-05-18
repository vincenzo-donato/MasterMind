import { use } from "chai";
import { Customer} from "../entities/customer";
import { InputService } from "./inputService";
import { User } from "../entities/user";
import { SpecialCustomer } from "../entities/specialCustomer";
import {isAdmin, isCustomer, isSpecialCustomer} from "../entities/utils"
import { Admin } from "../entities/admin";


export class UserService {

    constructor(private users:Array<User> = new Array<User>(), private inputServece =  InputService.singleton) {
    }

    get user(){
        return this.users
    }

    public async getUserAccountName():Promise<User> {
        
        let input = this.inputServece;

        const account = new Admin("Vincenzo","1234",false,"permessi");
        const account2 = new SpecialCustomer("Ale","4321",121212);
        const account3 = new Customer("Anna","0987",4000);


        this.users.push(account);
        this.users.push(account2);
        this.users.push(account3);

        let tentativoAccessoNomeAccount = await input.ask("Inserisci il tuo nome Account \n");
        
        let user = this.users.find(element =>
            element.accountName === tentativoAccessoNomeAccount
        );

        while(!user || user.isBlocked == true){
            tentativoAccessoNomeAccount = await input.ask("Account non disponibile, controlla che i dati siano corretti\n");
            user = this.users.find(element =>
                element.accountName === tentativoAccessoNomeAccount
            );
        }

        if(isCustomer(user)){

            console.log(user.recuperaContoTot);

            let sentinella = true;
            let controller = true;
            let tentativi = 3;
                
            do {
                
                tentativi--;
                
                let tentativoAccessoAccountPassword = await input.ask("Inserisci la Password correttamente\n");
                
                if(tentativoAccessoAccountPassword === user.accountPassword){
                    sentinella = false;
                    tentativi = 3;
                }
                
                if(tentativi < 1){
                    user.tentativoErrato();
                    controller = false;
                }
                
            }while (tentativi > 0 && sentinella);
                
            if(controller){
    
                const operazioniPossibili = ["Prelievo: 1", "Deposito: 2", "Elimina: 3"]
                
                operazioniPossibili.forEach(element =>{
                    console.log(element);
                })
                
                let scegliOperazioneDaEseguire = await input.ask("Inserisci l'operazione desiderata \n");
                let result = true;
                let cifraDesiderata;
                
                switch (scegliOperazioneDaEseguire){
                    case "1":
                        cifraDesiderata = await input.ask("Quanto vuoi prelavare? \n");
                        result = user.prelievo(cifraDesiderata);
                        while(result){
                            cifraDesiderata = await input.ask("Operazione non supportata \n");
                            result = user.prelievo(cifraDesiderata);
                        }
                        console.log(user);
                    break;
                    case "2":
                        cifraDesiderata = await input.ask("Quanto vuoi depositare? \n");
                        result = user.deposito(cifraDesiderata);
                        while(result){
                            cifraDesiderata = await input.ask("Operazione non supportata \n");
                            result = user.deposito(cifraDesiderata);
                        }
                        console.log(user);
                    break;
                    case "3":
                        console.log(`Account: ${user.accountName} è stato eliminato`)
                        user.deleteAccount(this.users,user.accountName);
                    break; 
                    default:
                        console.log("Operazione inesistente");
                        input.close();
                    break;
                }
                                
            }
        }
        else if(isSpecialCustomer(user)){
            console.log(user.contoCustomerSpeciale);
            let sentinella = true;
            let controller = true;
            let tentativi = 3;
                
            do {
                
                tentativi--;
                
                let tentativoAccessoAccountPassword = await input.ask("Inserisci la Password correttamente\n");
                
                if(tentativoAccessoAccountPassword === user.accountPassword){
                    sentinella = false;
                    tentativi = 3;
                }
                
                if(tentativi < 1){
                    user.tentativoErrato();
                    controller = false;
                }
                
            }while (tentativi > 0 && sentinella);

            if(controller){
    
                const operazioniPossibili = ["Prelievo: 1", "Deposito: 2", "Elimina: 3"]
                
                operazioniPossibili.forEach(element =>{
                    console.log(element);
                })
                
                let scegliOperazioneDaEseguire = await input.ask("Inserisci l'operazione desiderata \n");
                let result = true;
                let cifraDesiderata;
                
                switch (scegliOperazioneDaEseguire){
                    case "1":
                        cifraDesiderata = await input.ask("Quanto vuoi prelavare? \n");
                        result = user.prelievo(cifraDesiderata);
                        while(result){
                            cifraDesiderata = await input.ask("Operazione non supportata \n");
                            result = user.prelievo(cifraDesiderata);
                        }
                        console.log(user);
                    break;
                    case "2":
                        cifraDesiderata = await input.ask("Quanto vuoi depositare? \n");
                        result = user.deposito(cifraDesiderata);
                        while(result){
                            cifraDesiderata = await input.ask("Operazione non supportata \n");
                            result = user.deposito(cifraDesiderata);
                        }
                        console.log(user);
                    break;
                    case "3":
                        console.log(`Account: ${user.accountName} è stato eliminato`)
                        user.deleteAccount(this.users,user.accountName);
                    break; 
                    default:
                        console.log("Operazione inesistente");
                        input.close();
                    break;
                }
                                
            }
        }
        else if(isAdmin(user)){
            console.log(user.gestionePermessi);
            let sentinella = true;
            let controller = true;
            let tentativi = 3;
                
            do {
                
                tentativi--;
                
                let tentativoAccessoAccountPassword = await input.ask("Inserisci la Password correttamente\n");
                
                if(tentativoAccessoAccountPassword === user.accountPassword){
                    sentinella = false;
                    tentativi = 3;
                }
                
                if(tentativi < 1){
                    user.tentativoErrato();
                    controller = false;
                }
                
            }while (tentativi > 0 && sentinella);

            this.users.forEach(element =>{
                if(element.isBlocked === true){
                    console.log(`Quale Customer vuoi sbloccare:${element.accountName}`);
                }
            })
            
            let controlloSbloccaCustomer = await input.ask("Vuoi sloccare un account? \n");
            
            this.users.forEach(element =>{
                if(element.accountName == controlloSbloccaCustomer){
                    if(isCustomer(element)){
                        element.ripristinoCustomer();
                    }
                    else if (isSpecialCustomer(element)){
                        element.ripristinoCustomer();
                    }
                };
            })
            
        }
        
        console.log(this.users);
        
        input.close();

        return user;

    }

}


        