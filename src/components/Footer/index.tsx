import { Container } from "./styles"
import whiteLogo from "../../assets/white-logo.png"

export const Footer = () => {
    return (
        <Container>
            <img src={whiteLogo} alt="Banestes" />
            <span>© Banestes 2017. Todos os direitos reservados.</span>
        </Container>
    )
}