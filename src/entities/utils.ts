import { Admin } from "./admin";
import { Customer } from "./customer";
import { SpecialCustomer } from "./specialCustomer";
import { User } from "./user";


export function isCustomer(user:User): user is Customer {
    return (<Customer>user).recuperaContoTot !== undefined; 
}

export function isSpecialCustomer(user:User): user is SpecialCustomer {
    return (<SpecialCustomer>user).contoCustomerSpeciale !== undefined; 
}

export function isAdmin(user:User): user is Admin {
    return (<Admin>user).gestionePermessi !== undefined; 
}