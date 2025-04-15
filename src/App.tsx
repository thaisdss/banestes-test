import { useEffect, useState } from "react"
import { Cliente } from "./types/Cliente"
import { parseCsv } from "./utils/parseCsv"

export const App = () => {
  const [clients, setClients] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)

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

      setClients(parsedClients)
      setLoading(false)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getClients()
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
        </div>
      )}
    </div>
  )
}
