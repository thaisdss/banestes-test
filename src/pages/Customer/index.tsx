import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

import { CustomerSkeleton } from "./components/CustomerSkeleton"
import { PersonalData } from "./components/PersonalData"
import { Tabs } from "../../components/Tabs"
import { Footer } from "../../components/Footer"

import UndoIcon from '@mui/icons-material/Undo'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import LocationOnIcon from '@mui/icons-material/LocationOn'


import { ICustomer } from "../../types/ICustomer"
import { IAccount } from "../../types/IAccount"
import { IAgency } from "../../types/IAgency"

import { parseCsv } from "../../utils/parseCsv"
import { clearFormatCurrency } from "../../utils/clearFormatCurrency"
import { formatCurrency } from "../../utils/formatCurrency"

import { 
  ButtonStyled, 
  Container, 
  AccountsContainer, 
  TabPanelStyled, 
  AgencyContainer, 
  AgencyNotFound 
} from "./styles"
import logo from "../../assets/logo.png"

const ACCOUNTS_API_URL = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas"
const AGENCIES_API_URL = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias"
export const Customer = () => {
  const location = useLocation()
  const customer = location.state as ICustomer
  const navigate = useNavigate()

  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [agency, setAgency] = useState<IAgency | null>(null)
  const [loading, setLoading] = useState(true)

  const filterAccounts = (accounts: IAccount[]) => {
    const filtered = accounts.filter(account => {
      if (account.customerCpfCnpj.length === 12) {
        return account.customerCpfCnpj.slice(0, -1) === customer.cpfCnpj
      }

      return account.customerCpfCnpj === customer.cpfCnpj
    })

    setAccounts(filtered)
  }

  const getAccounts = async () => {
      try {
        const response = await fetch(ACCOUNTS_API_URL)
        const csvText = await response.text()

        console.log(csvText)
  
        const parsedAccounts: IAccount[] = parseCsv(csvText).map((account) => {
          return {
            id: account["id"],
            customerCpfCnpj: account["cpfCnpjCliente"].replace(/\D/g, ''),
            type: account["tipo"] as IAccount["type"],
            balance: Number(clearFormatCurrency(account["saldo"])),
            creditLimit: Number(clearFormatCurrency(account["limiteCredito"])),
            creditAvailable: Number(clearFormatCurrency(account["creditoDisponivel"])),
          }
        })

        filterAccounts(parsedAccounts)
      }
      catch (error) {
        console.error(error)
      }
  }

  const findAgency = (agencies: IAgency[]) => {
    const customerAgency = agencies.find(agency => agency.code === customer.agencyCode)

    setAgency(customerAgency || null)
  }
  
  const getAgencies = async () => {
      try {
        const response = await fetch(AGENCIES_API_URL)
        const csvText = await response.text()
  
        const parsedAgencies: IAgency[] = parseCsv(csvText).map((agency) => {
          return {
            id: agency["id"],
            code: Number(agency["codigo"]),
            name: agency["nome"],
            address: agency["endereco"],
          }
        })

        findAgency(parsedAgencies)
      }
      catch (error) {
        console.error(error)
      }
  }

  const handleBack = () => {
    navigate("/")
  }

  useEffect(() => {
      Promise.all([ getAccounts(), getAgencies() ])
        .then(() => setLoading(false))
  }, [])

  return (
    <Container>
      <header>
        <img src={logo} alt="Banestes" />
        <ButtonStyled 
        startIcon={<UndoIcon />}
        onClick={handleBack}
        >
          VOLTAR
        </ButtonStyled>
      </header>
      {loading && (
        <CustomerSkeleton />
      )}
      {!loading && (
        <main>
          <PersonalData customer={customer} />
          <Tabs 
          labels={["Contas", "Agência"]}
          >
            {accounts.map(account => (
              <TabPanelStyled value={1} key={account.id}>
                <AccountsContainer>
                  <div>
                    <AccountBalanceIcon />
                    {account.type === "poupanca" && <span>Conta Poupança</span>}
                    {account.type === "corrente" && <span>Conta Corrente</span>}
                  </div>
                  <p>Saldo: {formatCurrency(account.balance)}</p>
                  <p>Limite de Crédito: {formatCurrency(account.creditLimit)}</p>
                  <p>Crédito Disponível: {formatCurrency(account.creditAvailable)}</p>
                </AccountsContainer>
              </TabPanelStyled>
            ))}
            {agency && (
              <TabPanelStyled value={2}>
                <AgencyContainer>
                  <div>
                    <AccountBalanceIcon />
                    <span>{agency.code} - {agency.name}</span>
                  </div>
                  <div>
                    <LocationOnIcon />
                    <span>{agency.address}</span>
                  </div>
                </AgencyContainer>
              </TabPanelStyled>
            )}
            {!agency && (
              <TabPanelStyled value={2}>
                <AgencyNotFound>Agência não encontrada</AgencyNotFound>
              </TabPanelStyled>
            )}
          </Tabs>
        </main>
      )}
      <Footer />
    </Container>
  )
}