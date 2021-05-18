import readline from "readline";

export class InputService {

    private  constructor(private _readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })) {

    }

    static get singleton(){

        return new InputService();

    }

    public ask(question:string):Promise<string>{
        return new Promise((resolve, reject) => {
            this._readline.question(question, (input) => resolve(input) );
        });
    }

    public async richiestaPrelievo(denaroRichiestoPerPrelievo:number, totDisponibiliàDenaro:number):Promise<number>{
        
        let tentativoDiPrelievo;

        tentativoDiPrelievo = await this.ask("Quanto vuoi prelevare?  \n");

        while(denaroRichiestoPerPrelievo > totDisponibiliàDenaro){
            tentativoDiPrelievo = await this.ask(`Attenzione, il tuo conto è inferiore alla richiesta di prelievo. \nDisponibilità: ${totDisponibiliàDenaro}\n`);
        }

        const prelievoEseguito = denaroRichiestoPerPrelievo - totDisponibiliàDenaro
        return prelievoEseguito;
    }

    public async richiestaDeposito(denaroDepositare:number, totDisponibiliàDenaro:number):Promise<number>{
        
        let operazioneDeposito;

        operazioneDeposito = await this.ask("Quanto vuoi depositare?  \n");

        const prelievoEseguito = denaroDepositare + totDisponibiliàDenaro;

        return prelievoEseguito;
    }

    public close(){
        this._readline.close()
    }

}