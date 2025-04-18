import { DataGrid } from "@mui/x-data-grid"
import { styled } from "styled-components"
import { colors } from "../../styles/colors"

export const DataGridStyled = styled(DataGrid)`
    .MuiDataGrid-main {
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }

    .MuiDataGrid-overlay {
        color: ${colors.gray.dark};
        font-size: 16px;
        font-weight: 700;
    }

    .MuiDataGrid-row {
        background-color: ${colors.white};

        .MuiDataGrid-cell {
            color: ${colors.gray.dark};
            font-size: 16px;
            padding-left: 20px;

            .MuiButtonBase-root .MuiSvgIcon-root {
                color: ${colors.gray.dark};
            }
        }
    }

    &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, 
    &.MuiDataGrid-root .MuiDataGrid-cell:focus {
        outline: none;
        outline-offset: 0;
    }

    .MuiDataGrid-columnHeader {
        background-color: ${colors.blue.dark};

        .MuiDataGrid-columnHeaderTitleContainer:not(:last-child) {
            padding-left: 20px;
        }

        .MuiDataGrid-columnHeaderTitle {
            font-size: 16px;
            font-weight: 700;
            color: ${colors.white};
        }

        .MuiDataGrid-columnSeparator {
            display: none;
        }
    }

    .MuiDataGrid-iconButtonContainer .MuiButtonBase-root .MuiSvgIcon-root,
    .MuiDataGrid-menuIcon .MuiButtonBase-root .MuiSvgIcon-root {
        color: ${colors.gray.light};
    }

    .MuiTablePagination-root {
        background-color: ${colors.blue.dark};
        border: none;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    .MuiTablePagination-displayedRows, 
    .MuiTablePagination-root {
        color: ${colors.white};
        font-size: 16px;
        font-weight: 700;
    }

`