import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

import { InfosCustomer } from "./components/InfosCostumer"
import { Footer } from "../../components/Footer"

import UndoIcon from '@mui/icons-material/Undo'

import { ICustomer } from "../../types/ICustomer"
import { IAccount } from "../../types/IAccount"
import { IAgency } from "../../types/IAgency"

import { parseCsv } from "../../utils/parseCsv"
import { clearFormatCurrency } from "../../utils/clearFormatCurrency"

import { ButtonStyled, Container, Header } from "./styles"
import logo from "../../assets/logo.png"

export const Customer = () => {
  const location = useLocation()
  const customer = location.state as ICustomer
  const navigate = useNavigate()

  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [agencies, setAgencies] = useState<IAgency[]>([])
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
        console.log(agencies, accounts)
      }
      catch (error) {
        console.error(error)
      }
  }

  useEffect(() => {
      Promise.all([ getAccounts(), getAgencies() ])
        .then(() => setLoading(false))
  }, [])

  const handleBack = () => {
    navigate("/")
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="Banestes" />
        <ButtonStyled 
        startIcon={<UndoIcon />}
        onClick={handleBack}
        >
          VOLTAR
        </ButtonStyled>
      </Header>
      {loading && (
        <p>Carregando...</p>
      )}
      {!loading && (
          <InfosCustomer customer={customer} />
      )}
      <Footer />
    </Container>
  )
}