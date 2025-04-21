import { styled } from "styled-components"
import { colors } from "../../../../styles/colors"

export const PersonalDataContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    width: 100%;
    padding: 0 32px;

    .MuiSkeleton-root {
        background-color: ${colors.blue.light};
    }

    > .MuiSkeleton-root{
        width: 200px;
        height: 200px;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;

        .MuiSkeleton-root {
            height: 24px;
            border-radius: 8px;
        }
    }

    @media (max-width: 1000px) {
        flex-direction: column;
        margin-bottom: 16px;

        > div {
            width: 100%;
        }
    }
`

export const TabsSkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 0 32px;

    .MuiSkeleton-root {
        background-color: ${colors.blue.light};
        border-radius: 8px;

        &:nth-of-type(1) {
            padding: 24px;
        }

        &:nth-of-type(2) {
            height: 120px;
        }
    }
`