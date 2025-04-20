import { styled } from "styled-components"
import { colors } from "../../../../styles/colors"

export const Container = styled.section`
    display: flex;
    align-items: center;
    gap: 32px;
    width: 100%;
    padding: 32px;

    > img {
        border-radius: 100%;
        width: 200px;
        height: 200px;
        border: 4px solid ${colors.green.medium};
    }
`

export const InfosContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    flex: 1;

    > div {
        display: flex;
        flex-direction: column;
        gap: 8px;

        > h4 {
            color: ${colors.blue.dark};
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
        }

        > p {
            color: ${colors.black};
            font-size: 16px;
            font-weight: 400;
        }
    }
`