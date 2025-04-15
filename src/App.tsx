import { useEffect, useState } from "react"
import { Cliente } from "./types/Cliente";
import { Conta } from "./types/Conta";
import { Agencia } from "./types/Agencia";

export const App = () => {
  const [clients, setClients] = useState<Cliente[]>([])
  const [bankAccounts, setBankAccounts] = useState<Conta[]>([])
  const [bankAgencies, setBankAgencies] = useState<Agencia[]>([])
  const [loading, setLoading] = useState(true)

  const parseCsv = (csvText: string): Record<string, string>[] => {
    const lines = csvText.trim().split("\n")
    const headers = lines[0].replace(/"/g, "").split(",")
  
    return lines.slice(1).map((line) => {
      const values = line.split(/["']/).filter(value => {
        const cleanValue = value.replace(/"/g, "").trim()

        return  !/^,+$/.test(cleanValue);
      }).slice(1, -1)

      const client: Record<string, string> = {}
  
      headers.map((header, index) => {
        client[header] = values[index]
      });

      return client
    });
  };

  const getClients = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_CLIENT_API_URL)
      const csvText = await response.text()

      const parsedClients = parseCsv(csvText).map((client) => {
        return {
          id: client["id"],
          cpfCnpj: client["cpfCnpj"],
          rg: client["rg"],
          dataNascimento: new Date(client["dataNascimento"]),
          nome: client["nome"],
          nomeSocial: client["nomeSocial"],
          email: client["email"],
          endereco: client["endereco"],
          rendaAnual: Number(client["rendaAnual"]),
          patrimonio: Number(client["patrimonio"]),
          estadoCivil: client["estadoCivil"] as Cliente["estadoCivil"],
          codigoAgencia: Number(client["codigoAgencia"]),
        }
      })

      setClients(parsedClients);
    }
    catch (error) {
      console.error(error)
    }
  }

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

      setBankAccounts(parsedBankAccounts);
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

      setBankAgencies(parsedBankAgencies);
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    Promise.all([ getClients(), getBankAccounts(), getBankAgencies() ])
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
          <p>{clients.map(row => row.id)}</p>
          <p>{bankAccounts.map(row => row.id)}</p>
          <p>{bankAgencies.map(row => row.id)}</p>
        </div>
      )}
    </div>
  )
}
