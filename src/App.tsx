import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { ICustomer } from "./types/ICustomer"
import { parseCsv } from "./utils/parseCsv"

import { Container } from "./styles/App.styles"
import logo from "./assets/logo.png"

export const App = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const getClients = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_CUSTOMERS_API_URL)
      const csvText = await response.text()

      const parsedClients: ICustomer[] = parseCsv(csvText).map((customer) => {
        return {
          id: customer["id"],
          cpfCnpj: customer["cpfCnpj"],
          rg: customer["rg"],
          birthDate: new Date(customer["dataNascimento"]),
          name: customer["nome"],
          nickname: customer["nomeSocial"],
          email: customer["email"],
          address: customer["endereco"],
          annualIncome: Number(customer["rendaAnual"]),
          patrimony: Number(customer["patrimonio"]),
          maritalStatus: customer["estadoCivil"] as ICustomer["maritalStatus"],
          agencyCode: Number(customer["codigoAgencia"]),
        }
      })

      setCustomers(parsedClients)
      setLoading(false)
    }
    catch (error) {
      console.error(error)
    }
  }

  const viewCustomer = (id: string) => {
     navigate('/customer', {
      state: customers.find(customer => customer.id === id)
     })
  }

  useEffect(() => {
    getClients()
  }, [])

  return (
    <Container>
      <img src={logo} alt="Banestes" />
      {loading && (
        <p>Carregando...</p>
      )}
      {!loading && (
        <div>
          {customers.map((customer) => (
            <p key={customer.id} onClick={() => viewCustomer(customer.id)}>{customer.name}</p>
          ))}
        </div>
      )}
    </Container>
  )
}
