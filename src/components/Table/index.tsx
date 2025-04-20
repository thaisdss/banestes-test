import { GridColDef, GridValidRowModel } from '@mui/x-data-grid'
import { ptBR } from '@mui/x-data-grid/locales'
import { DataGridStyled } from './styles';

type TableProps<T extends GridValidRowModel> = {
  columns: GridColDef[]
  rows: T[]
};

export const Table = <T extends GridValidRowModel>({ columns, rows }: TableProps<T>) => {
    return (
        <DataGridStyled
        columns={columns} 
        rows={rows}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        pageSizeOptions={[10]}
        disableColumnResize
        disableColumnFilter
        disableRowSelectionOnClick
        localeText={{
          ...ptBR.components.MuiDataGrid.defaultProps.localeText,
          noRowsLabel: "Nenhum cliente encontrado.",
        }}
        />
    )
}