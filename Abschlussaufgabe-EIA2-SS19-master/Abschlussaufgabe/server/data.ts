namespace WBKreloadedServer {
    export interface Categories {
        [key: number]: Category ; 
    }
    export interface Category {
        title: string;
        amount_type: string;
        amount: Amount;
        form_type: string;
        items: Item[];
    }
    export interface Item {
        name: string;
        price: number;
    }
    export interface Amount {
        steps: number[];
        display: string[];
    }

}