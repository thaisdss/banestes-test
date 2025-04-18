import { useEffect, useState } from "react"
import { useLocation } from "react-router"

import { parseCsv } from "../../utils/parseCsv"
import { ICustomer } from "../../types/ICustomer"
import { IAccount } from "../../types/IAccount"
import { IAgency } from "../../types/IAgency"

import { formatCurrency } from "../../utils/formatCurrency"
import { clearFormatCurrency } from "../../utils/clearFormatCurrency"

export const Customer = () => {
  const location = useLocation();
  const customer = location.state as ICustomer;

  const [Accounts, setAccounts] = useState<IAccount[]>([])
  const [Agencies, setAgencies] = useState<IAgency[]>([])
  const [loading, setLoading] = useState(true)

  const getAccounts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_ACCOUNTS_API_URL)
        const csvText = await response.text()
  
        const parsedAccounts: IAccount[] = parseCsv(csvText).map((account) => {
          return {
            id: account["id"],
            customersCpfCnpj: account["cpfCnpjCliente"].replace(/\D/g, ''),
            type: account["tipo"] as IAccount["type"],
            balance: Number(clearFormatCurrency(account["saldo"])),
            creditLimit: Number(clearFormatCurrency(account["limiteCredito"])),
            creditAvailable: Number(clearFormatCurrency(account["creditoDisponivel"])),
          }
        })
  
        setAccounts(parsedAccounts)
      }
      catch (error) {
        console.error(error)
      }
  }
  
  const getAgencies = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_AGENCIES_API_URL)
        const csvText = await response.text()
  
        const parsedAgencies: IAgency[] = parseCsv(csvText).map((agency) => {
          return {
            id: agency["id"],
            code: Number(agency["codigo"]),
            name: agency["nome"],
            address: agency["endereco"],
          }
        })
  
        setAgencies(parsedAgencies)
      }
      catch (error) {
        console.error(error)
      }
  }

  useEffect(() => {
      Promise.all([ getAccounts(), getAgencies() ])
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
          <p>{Accounts.map(row => row.id)}</p>
          <p>{Agencies.map(row => row.id)}</p>
          <p>{formatCurrency(customer.patrimony)}</p>
        </div>
      )}
    </div>
  )
}