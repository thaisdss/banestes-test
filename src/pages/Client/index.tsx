import { useEffect, useState } from "react"
import { parseCsv } from "../../utils/parseCsv"
import { Conta } from "../../types/Conta"
import { Agencia } from "../../types/Agencia"

export const Client = () => {
    const [bankAccounts, setBankAccounts] = useState<Conta[]>([])
    const [bankAgencies, setBankAgencies] = useState<Agencia[]>([])
    const [loading, setLoading] = useState(true)

    const getBankAccounts = async () => {
        try {
          const response = await fetch(import.meta.env.VITE_BANK_ACCOUNTS_API_URL)
          const csvText = await response.text()
    
          const parsedBankAccounts = parseCsv(csvText).map((bankAccount) => {
            return {
              id: bankAccount["id"],
              cpfCnpjCliente: bankAccount["cpfCnpjCliente"],
              tipo: bankAccount["tipo"] as Conta["tipo"],
              saldo: Number(bankAccount["saldo"]),
              limiteCredito: Number(bankAccount["limiteCredito"]),
              creditoDisponivel: Number(bankAccount["creditoDisponivel"]),
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
    
          const parsedBankAgencies = parseCsv(csvText).map((bankAgency) => {
            return {
              id: bankAgency["id"],
              codigo: Number(bankAgency["codigo"]),
              nome: bankAgency["nome"],
              endereco: bankAgency["endereco"],
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
          </div>
        )}
      </div>
    )
}