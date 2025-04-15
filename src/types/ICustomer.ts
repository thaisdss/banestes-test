export interface ICustomer {
    id: string;
    cpfCnpj: string;
    rg?: string;
    birthDate: Date;
    name: string;
    nickname?: string;
    email: string;
    address: string;
    annualIncome: number;
    patrimony: number;
    maritalStatus: "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
    agencyCode: number;
}