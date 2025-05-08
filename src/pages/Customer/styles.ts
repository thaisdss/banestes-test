import { styled } from "styled-components"
import { colors } from "../../styles/colors"
import { Button } from "@mui/material"
import TabPanel from "@mui/lab/TabPanel"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    min-height: 100vh;

    > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: ${colors.white};
        padding: 32px;
        box-shadow: 4px 4px 12px ${colors.gray.medium};

        > img {
            width: 200px;
        }
    }

    > main {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 32px;
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

export const TabPanelStyled = styled(TabPanel)`
    &.MuiTabPanel-root {
        padding: 0 32px;
    }
`

export const AccountsContainer = styled.div`
    background-color: ${colors.white};
    border-radius: 8px;
    box-shadow: 4px 4px 12px ${colors.gray.medium};
    padding: 32px;

    > div {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;

        > span {
            font-size: 18px;
        }

        > svg {
            font-size: 20px;
            color: ${colors.blue.dark}
        }
    }

    > p {
        font-size: 16px;

        &:not(:last-of-type) {
            margin-bottom: 4px;
        }

        &:nth-of-type(2) {
            color: ${colors.blue.dark}
        }

        &:last-of-type {
            color: ${colors.green.dark};
        }
    }
`

export const AgencyContainer = styled.div`
    background-color: ${colors.white};
    border-radius: 8px;
    box-shadow: 0 4px 12px ${colors.gray.medium};
    padding: 32px;

    > div {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;

        > svg {
            font-size: 20px;
            color: ${colors.blue.dark}
        }
    }

    :first-child {
        margin-bottom: 4px;
    }
`

export const AgencyNotFound = styled.div`
    background-color: ${colors.white};
    border-radius: 8px;
    box-shadow: 0 4px 12px ${colors.gray.medium};
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
        font-size: 16px;
    }
`