import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import { Button } from "@mui/material";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
`

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${colors.white};
    padding: 32px;
    box-shadow: 0 4px 12px ${colors.gray.medium};

    > img {
        width: 200px;
    }
`

export const ButtonStyled = styled(Button)`
    &.MuiButtonBase-root {
        color: ${colors.blue.dark};
        background-color: transparent;
        padding: 8px;
        border-radius: 8px;
        font-size: 16px;

        &.MuiButton-icon {
            font-size: 16px;
        }

        &:hover {
            background-color: ${colors.blue.light};
        }
    }
`