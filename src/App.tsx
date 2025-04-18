import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { Table } from "./components/Table"
import { SearchField } from "./components/SearchField"

import { GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid"
import VisibilityIcon from '@mui/icons-material/Visibility'

import { ICustomer } from "./types/ICustomer"

import { parseCsv } from "./utils/parseCsv"
import { normalize } from "./utils/normalize"
import { maskCpfCnpj } from "./utils/maskCpfCnpj"
import { formatCurrency } from "./utils/formatCurrency"
import { clearFormatCurrency } from "./utils/clearFormatCurrency"

import { Container, TableContainer } from "./styles/App.styles"
import logo from "./assets/logo.png"

export const App = () => {
  const navigate = useNavigate()

  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<ICustomer[]>([])
  const [loading, setLoading] = useState(true)

  const getClients = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_CUSTOMERS_API_URL)
      const csvText = await response.text()

      const parsedClients: ICustomer[] = parseCsv(csvText).map((customer) => {
        return {
          id: customer["id"],
          cpfCnpj: customer["cpfCnpj"].replace(/\D/g, ''),
          rg: customer["rg"],
          birthDate: new Date(customer["dataNascimento"]),
          name: customer["nome"],
          nickname: customer["nomeSocial"],
          email: customer["email"],
          address: customer["endereco"],
          annualIncome: Number(clearFormatCurrency(customer["rendaAnual"])),
          patrimony: Number(clearFormatCurrency(customer["patrimonio"])),
          maritalStatus: customer["estadoCivil"] as ICustomer["maritalStatus"],
          agencyCode: Number(customer["codigoAgencia"]),
        }
      })

      setCustomers(parsedClients)
      setFilteredCustomers(parsedClients)
      setLoading(false)
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleViewCustomer = (id: string) => {
     navigate('/customer', {
      state: customers.find(customer => customer.id === id)
     })
  }

  const filterCostumers = (search: string) => {
    const filteredList = customers.filter(customer => {
      return normalize(customer.name).includes(normalize(search)) || customer.cpfCnpj.includes(search)
    })

    setFilteredCustomers(filteredList)
  }

  useEffect(() => {
    getClients()
  }, [])

  const columns: GridColDef<ICustomer>[] = [
    {field: "name", headerName: "Nome", flex: 1},
    {field: 'cpfCnpj', headerName: 'CPF/CNPJ', flex: 1, renderCell: (params) => maskCpfCnpj(params.value)},
    {field: 'email', headerName: 'E-mail', flex: 1},
    {field: 'annualIncome', headerName: 'Renda Anual', flex: 1, renderCell: (params) => formatCurrency(params.value)},
    {field:"actions", 
      type: "actions", 
      headerName: "Ações",
      flex: 0.5, 
      getActions: (params: GridRowParams) => [
      <GridActionsCellItem 
      icon={<VisibilityIcon />}
      label="Visualizar"
      onClick={() => handleViewCustomer(params.row.id)}
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
          <SearchField
          label="Nome ou CPF/CNPJ"
          handleSearch={filterCostumers}
          />	
          <Table 
          columns={columns} 
          rows={filteredCustomers} 
          />
        </TableContainer>
      )}
    </Container>
  )
}
