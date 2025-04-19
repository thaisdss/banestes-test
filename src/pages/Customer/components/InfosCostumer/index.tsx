import { ICustomer } from "../../../../types/ICustomer"

import { maskCpfCnpj } from "../../../../utils/maskCpfCnpj"
import { maskRg } from "../../../../utils/maskRg"
import { formatCurrency } from "../../../../utils/formatCurrency"

import { Container, InfosContainer } from "./styles"
import defaultUser from "../../../../assets/default-user.png"

type InfosCustomerProps = {
    customer: ICustomer
}

export const InfosCustomer = ({ customer }: InfosCustomerProps) => {
    return (
        <Container>
            <img src={defaultUser} alt="Foto do cliente" />
            <InfosContainer>
              <div>
                <h3>Nome</h3>
                <span>{customer.name}</span>
              </div>
              {customer.nickname && (
                <div>
                  <h3>Nome Social</h3>
                  <span>{customer.nickname}</span>
                </div>
              )}
              <div>
                <h3>CPF/CNPJ</h3>
                <span>{maskCpfCnpj(customer.cpfCnpj)}</span>
              </div>
              {customer.rg && (
                <div>
                  <h3>RG</h3>
                  <span>{maskRg(customer.rg)}</span>
                </div>
              )}
              <div>
                <h3>Data de Nascimento</h3>
                <span>{customer.birthDate.toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                <h3>E-mail</h3>
                <span>{customer.email}</span>
              </div>
              <div>
                <h3>Endereço</h3>
                <span>{customer.address}</span>
              </div>
              <div>
                <h3>Renda Anual</h3>
                <span>{formatCurrency(customer.annualIncome)}</span>
              </div>
              <div>
                <h3>Renda Anual</h3>
                <span>{formatCurrency(customer.patrimony)}</span>
              </div>
              <div>
                <h3>Estado Civil</h3>
                <span>{customer.maritalStatus}</span>
              </div>
            </InfosContainer>
        </Container>
    )
}