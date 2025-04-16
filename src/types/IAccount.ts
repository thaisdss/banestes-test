export interface IAccount {
    id: string;
    customersCpfCnpj: string;
    type: "corrente" | "poupanca"
    balance: number;
    creditLimit: number;
    creditAvailable: number;
}