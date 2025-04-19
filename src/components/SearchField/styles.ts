import { FormControl } from "@mui/material"
import { colors } from "../../styles/colors"
import { styled } from "styled-components"

export const FormControlStyled = styled(FormControl)`
    background-color: ${colors.blue.light};
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;

    .MuiFormLabel-root {
        margin-left: 28px;
        color: ${colors.blue.dark};
        font-family: 'Inter', sans-serif;

        &.Mui-focused {
            color: ${colors.blue.dark};
        }
    }

    .MuiInputBase-root {
        width: 100%;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        color: ${colors.blue.dark};
        font-family: 'Inter', sans-serif;

        &::after {
            border-bottom: 3px solid ${colors.blue.dark};
        }
    
        &::before {
            border-bottom: 2px solid ${colors.blue.dark};

        }

        &:hover:not(.Mui-disabled, .Mui-error)::before {
            border-bottom: 2px solid ${colors.blue.dark};
        }

        .MuiInputAdornment-root .MuiButtonBase-root .MuiSvgIcon-root {
            color: ${colors.blue.dark};
        }

        .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel) {
            margin: 0 0 4px 0;
        }
    }
`