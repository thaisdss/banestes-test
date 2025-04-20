export interface IAccount {
    id: string;
    customerCpfCnpj: string;
    type: "corrente" | "poupanca"
    balance: number;
    creditLimit: number;
    creditAvailable: number;
}