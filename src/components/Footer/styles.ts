import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, ${colors.blue.dark} 20%, ${colors.blue.medium} 100%);
    color: ${colors.gray.light};
    padding: 32px;
    width: 100%;

    > span {
        font-size: 12px;
    }
`