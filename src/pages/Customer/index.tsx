import { useEffect, useState } from "react"
import { parseCsv } from "../../utils/parseCsv"
import { ICustomer } from "../../types/ICustomer"
import { IAccount } from "../../types/IAccount"
import { IAgency } from "../../types/IAgency"
import { useLocation } from "react-router"
import { formatCurrency } from "../../utils/formatCurrency"

export const Customer = () => {
  const location = useLocation();
  const customer = location.state as ICustomer;

  const [bankAccounts, setBankAccounts] = useState<IAccount[]>([])
  const [bankAgencies, setBankAgencies] = useState<IAgency[]>([])
  const [loading, setLoading] = useState(true)

  const getBankAccounts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_ACCOUNTS_API_URL)
        const csvText = await response.text()
  
        const parsedBankAccounts: IAccount[] = parseCsv(csvText).map((bankAccount) => {
          return {
            id: bankAccount["id"],
            customersCpfCnpj: bankAccount["cpfCnpjCliente"],
            type: bankAccount["tipo"] as IAccount["type"],
            balance: Number(bankAccount["saldo"]),
            creditLimit: Number(bankAccount["limiteCredito"]),
            creditAvailable: Number(bankAccount["creditoDisponivel"]),
          }
        })
  
        setBankAccounts(parsedBankAccounts)
      }
      catch (error) {
        console.error(error)
      }
  }
  
  const getBankAgencies = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_AGENCIES_API_URL)
        const csvText = await response.text()
  
        const parsedBankAgencies: IAgency[] = parseCsv(csvText).map((bankAgency) => {
          return {
            id: bankAgency["id"],
            code: Number(bankAgency["codigo"]),
            name: bankAgency["nome"],
            address: bankAgency["endereco"],
          }
        })
  
        setBankAgencies(parsedBankAgencies)
      }
      catch (error) {
        console.error(error)
      }
  }

  useEffect(() => {
      Promise.all([ getBankAccounts(), getBankAgencies() ])
        .then(() => setLoading(false))
  }, [])

  return (
      <div>
      <h1>Home</h1>
      {loading && (
        <p>Carregando...</p>
      )}
      {!loading && (
        <div>
          <p>{bankAccounts.map(row => row.id)}</p>
          <p>{bankAgencies.map(row => row.id)}</p>
          <p>{formatCurrency(customer.patrimony)}</p>
        </div>
      )}
    </div>
  )
}