import { useEffect, useState } from "react"
import { parseCsv } from "../../utils/parseCsv"
import { IBankAccount } from "../../types/IBankAccount"
import { IBankAgency } from "../../types/IBankAgency"
import { ICustomer } from "../../types/ICustomer"
import { useLocation } from "react-router"

export const Customer = () => {
  const location = useLocation();
  const customer = location.state as ICustomer;

  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([])
  const [bankAgencies, setBankAgencies] = useState<IBankAgency[]>([])
  const [loading, setLoading] = useState(true)

  const getBankAccounts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BANK_ACCOUNTS_API_URL)
        const csvText = await response.text()
  
        const parsedBankAccounts: IBankAccount[] = parseCsv(csvText).map((bankAccount) => {
          return {
            id: bankAccount["id"],
            customersCpfCnpj: bankAccount["cpfCnpjCliente"],
            type: bankAccount["tipo"] as IBankAccount["type"],
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
        const response = await fetch(import.meta.env.VITE_BANK_AGENCIES_API_URL)
        const csvText = await response.text()
  
        const parsedBankAgencies: IBankAgency[] = parseCsv(csvText).map((bankAgency) => {
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
          <p>{customer.name}</p>
        </div>
      )}
    </div>
  )
}