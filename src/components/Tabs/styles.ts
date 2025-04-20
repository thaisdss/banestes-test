import styled from "styled-components"
import { colors } from "../../styles/colors"
import TabList from "@mui/lab/TabList"

export const TabsContainer = styled.div`
    border-bottom: 1px solid ${colors.gray.dark};
    margin: 0 32px;
`

export const TabListStyled = styled(TabList)`

    .MuiTabs-indicator {
        background-color: ${colors.blue.dark};
    }

    .MuiTab-root.Mui-selected {
        color: ${colors.blue.dark};
    }
`