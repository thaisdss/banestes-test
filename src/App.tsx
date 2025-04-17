import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { ICustomer } from "./types/ICustomer"
import { parseCsv } from "./utils/parseCsv"
import { maskCpfCnpj } from "./utils/maskCpfCnpj"
import logo from "./assets/logo.png"
import { GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid"
import { Table } from "./components/Table"
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Container } from "./styles/App.styles"
import { TableContainer } from "./styles/App.styles"

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
          cpfCnpj: maskCpfCnpj(customer["cpfCnpj"]),
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

  const columns: GridColDef<ICustomer>[] = [
    {field: "name", headerName: "Nome", flex: 1},
    {field: 'cpfCnpj', headerName: 'CPF/CNPJ', flex: 1},
    {field: 'email', headerName: 'E-mail', flex: 1},
    {field:"actions", 
      type: "actions", 
      headerName: "Ações",
      flex: 0.5, 
      getActions: (params: GridRowParams) => [
      <GridActionsCellItem 
      icon={<VisibilityIcon />}
      label="Visualizar"
      onClick={() => viewCustomer(params.row.id)}
      showInMenu={false}
      />
  ]}
  ]

  return (
    <Container>
      <img src={logo} alt="Banestes" />
      {loading && (
        <p>Carregando...</p>
      )}
      {!loading && (
        <TableContainer>
          <Table columns={columns} rows={customers} />
        </TableContainer>
      )}
    </Container>
  )
}
