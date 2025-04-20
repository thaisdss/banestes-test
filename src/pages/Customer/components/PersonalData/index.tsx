import { ICustomer } from "../../../../types/ICustomer"

import { maskCpfCnpj } from "../../../../utils/maskCpfCnpj"
import { maskRg } from "../../../../utils/maskRg"
import { formatCurrency } from "../../../../utils/formatCurrency"

import { Container, InfosContainer } from "./styles"
import defaultUser from "../../../../assets/default-user.png"

type PersonalDataProps = {
    customer: ICustomer
}

export const PersonalData = ({ customer }: PersonalDataProps) => {
  const personalDataContent = [
    {
      title: "Nome",
      content: customer.name
    },
    {
      title: "Nome Social",
      content: customer.nickname
    },
    {
      title: "CPF/CNPJ",
      content: maskCpfCnpj(customer.cpfCnpj)
    },
    {
      title: "RG",
      content: customer.rg && maskRg(customer.rg)
    },
    {
      title: "Data de Nascimento",
      content: customer.birthDate.toLocaleDateString('pt-BR')
    },
    {
      title: "E-mail",
      content: customer.email
    },
    {
      title: "Endereço",
      content: customer.address
    },
    {
      title: "Renda Anual",
      content: formatCurrency(customer.annualIncome)
    },
    {
      title: "Patrimônio",
      content: formatCurrency(customer.patrimony)
    },
    {
      title: "Estado Civil",
      content: customer.maritalStatus
    },
    {
      title: "Agência",
      content: customer.agencyCode
    }
  ]

  return (
    <Container>
      <img src={defaultUser} alt="Foto do cliente" />
      <InfosContainer>
        {personalDataContent.map(({ title, content }) => (
          content && (
            <div key={title}>
              <h4>{title}</h4>
              <p>{content}</p>
            </div>
          )
        ))}
      </InfosContainer>
    </Container>
  )
}