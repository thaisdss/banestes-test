import styled from "styled-components"
import { colors } from "./colors"
import { Skeleton } from "@mui/material"

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    gap: 32px;

    > img {
        width: 200px;
        margin: 32px 0 0 32px;
    }

    > footer {
        min-width: 800px;
    }
`

export const CustomersContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-width: 1200px;
    width: 100%;
    padding: 0 32px;
`

export const SkeletonSearchField = styled(Skeleton)`
    &.MuiSkeleton-root {
        background-color: ${colors.blue.light};
        padding: 32px;
        margin: 0 32px;
        border-radius: 0;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }
`

export const SkeletonTable = styled(Skeleton)`
    &.MuiSkeleton-root {
        background-color: ${colors.blue.light};
        border-radius: 8px;
        flex: 1;
        margin: 0 32px;
    }
`