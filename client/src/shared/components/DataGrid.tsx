import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown'
import { PaginatorTemplate } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';

interface DatatableProps {
    list: any[]
    columns: any[]
    paginated?: boolean
    sortField?: string | null
    sortOrder?: any
    onSort?: any
    loading?: boolean
    onFilter?: any
    first?: any
    limit?: any
    onPage?: any
    totalRecords?: number
    [x:string]: any;
}

const DataGrid = ({
    list,
    columns,
    paginated,
    sortField,
    sortOrder,
    onSort,
    loading,
    onFilter,
    first,
    limit,
    onPage,
    totalRecords,
    ...props
}: DatatableProps) => {
    const { t } = useTranslation();

    const dynamicColumns = columns.map((col, i) => {
        col.style = {...col.style, "textOverflow": "ellipsis", "maxWidth": "120px" }
        if(col.header == "Action"){
            col.style = {...col.style, "textAlign": 'center' }
            col.headerStyle = {...col.headerStyle, "textAlign": 'center' }
        }
        return <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body ? col.body : null}
            headerStyle={col.headerStyle ? col.headerStyle : null}
            style={col.style ? col.style : null}
            sortable={col.sortable ? col.sortable : false}
            // filter={col.filter ? col.filter : false}
            // filterField={col.filterField ? col.filterField : null}
        />;
    });

    const paginatorTemplate: PaginatorTemplate = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options: any) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ];

            return (
                <React.Fragment>
                    <span className="p-mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>{t('datagrid.itemsPerPage')}: </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </React.Fragment>
            );
        },
        'CurrentPageReport': (options: any) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        },
        FirstPageLink: null,
        PrevPageLink: null,
        PageLinks: null,
        NextPageLink: null,
        LastPageLink: null,
        JumpToPageInput: null
    };
    return (
        <DataTable
                value={list}
                size='small'
                showGridlines
                stripedRows
                resizableColumns
                columnResizeMode="fit"
                responsiveLayout="scroll"
                lazy
                removableSort
                sortField={sortField? sortField : undefined}
                sortOrder={sortOrder || null}
                onSort={onSort || null}
                loading={loading || false}
                // filters={{
                //     'username': { constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]},
                //     'roles': { constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]}
                // }}
                onFilter={onFilter || null}
                filterDisplay="menu"
                paginator={paginated}
                paginatorTemplate={paginatorTemplate}
                first={first || null}
                rows={limit || null}
                onPage={onPage || null}
                totalRecords={totalRecords}
                paginatorClassName="p-jc-end"
                className="p-mt-6 h-[60vh] overflow-y-auto"
            >
                {dynamicColumns}
            </DataTable>
    )
}

export default DataGrid
