export interface IBankAccount {
    id: string;
    customersCpfCnpj: string;
    type: "corrente" | "poupanca"
    balance: number;
    creditLimit: number;
    creditAvailable: number;
}