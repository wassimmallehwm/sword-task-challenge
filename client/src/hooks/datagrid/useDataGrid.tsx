import React, { useState } from 'react'
import {
    DataGrid,
    GridToolbar,
    getGridStringOperators,
    getGridDateOperators,
    getGridNumericOperators,
    getGridBooleanOperators,
    GridFilterModel,
    GridSortModel,
    GridFilterItem,
    GridValidRowModel,
    GridFilterOperator,
    GridSlotsComponentsProps
} from '@mui/x-data-grid';

type DatagridProps = {
    rows: any[]
    columns: any[]
    loading: boolean
}

function useDataGrid({
    rows,
    columns,
    loading
}: DatagridProps) {
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [rowCount, editRowCount] = useState<number>(0);
    const [filterModel, editFilterModel] = useState<GridFilterItem[]>();
    const [sortModel, setSortModel] = useState<GridSortModel>();

    const setRowCount = (data: number) => editRowCount(data)
    const setFilterModel = (model: GridFilterModel) => {
        const data = model.items.filter(elem => elem.value && elem.value.trim() != '')
        console.log(model.items)
        editFilterModel(data)
    }

    const _filterOperators = (operators: GridFilterOperator<any, any | null, any>[]) => {
        return operators.filter(
            (operator) => operator.value !== 'isEmpty' &&
                operator.value !== 'isNotEmpty' &&
                operator.value !== 'isAnyOf'
        )
    }

    const gridColumns = React.useMemo(
        () =>
            columns.map((col) => {
                if(col.type == 'action'){
                    return {
                        ...col,
                        filterable: false,
                        sortable: false
                    };
                }
                
                if(col.type == 'boolean'){
                    return {
                        ...col,
                        filterOperators: _filterOperators(getGridBooleanOperators()),
                    };
                }
                if(col.type == 'dateTime'){
                    return {
                        ...col,
                        filterOperators: _filterOperators(getGridDateOperators(true)),
                    };
                }
                if(col.type == 'date'){
                    return {
                        ...col,
                        filterOperators:  _filterOperators(getGridDateOperators()),
                    };
                }
                if(col.type == 'number'){
                    return {
                        ...col,
                        filterOperators:  _filterOperators(getGridNumericOperators()),
                    };
                }
                return {
                    ...col,
                    filterOperators:  _filterOperators(getGridStringOperators()),
                };
            }),
        [columns],
    );

    const componentsProps: GridSlotsComponentsProps = {
        filterPanel: {
            filterFormProps: {
                // Customize inputs by passing props
                linkOperatorInputProps: {
                    variant: 'outlined',
                    size: 'small',
                },
                columnInputProps: {
                    variant: 'outlined',
                    size: 'small',
                    sx: { mt: 'auto' },
                },
                operatorInputProps: {
                    variant: 'outlined',
                    size: 'small',
                    sx: { mt: 'auto' },
                },
                valueInputProps: {
                    InputComponentProps: {
                        variant: 'outlined',
                        size: 'small',
                    },
                },
                deleteIconProps: {
                    sx: {
                        '& .MuiSvgIcon-root': { color: '#d32f2f' },
                    },
                },
            },
            sx: {
                // Customize inputs using css selectors
                '& .MuiDataGrid-filterForm': { p: 2 },
                '& .MuiDataGrid-filterForm:nth-child(even)': {
                    backgroundColor: (theme: any) =>
                        theme.palette.mode === 'dark' ? '#444' : '#f5f5f5',
                },
                '& .MuiDataGrid-filterFormLinkOperatorInput': { mr: 2 },
                '& .MuiDataGrid-filterFormColumnInput': { mr: 2, width: 150 },
                '& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
                '& .MuiDataGrid-filterFormValueInput': { width: 200 },
            },
        },
    }

    const grid: any = (
        <div className='h-[70vh]'>
            <DataGrid
                rows={rows}
                columns={gridColumns}
                //checkboxSelection
                disableSelectionOnClick
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 15, 25]}
                pagination
                paginationMode='server'
                filterMode='server'
                sortingMode='server'
                loading={loading}
                onPageChange={(page) => setPageNumber(page)}
                components={{ Toolbar: GridToolbar }}
                onFilterModelChange={setFilterModel}
                onSortModelChange={(model, details) => setSortModel(model)}
                rowCount={rowCount}
                componentsProps={componentsProps}
            />
        </div>
    )

    return {
        pageSize,
        pageNumber,
        rowCount,
        filterModel,
        sortModel,
        setRowCount,
        grid,
        params: { pageSize, pageNumber, filterModel, sortModel },
        effectParams: [ pageSize, pageNumber, filterModel, sortModel ]
    }
}

export default useDataGrid