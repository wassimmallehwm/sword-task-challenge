import { GridValueGetterParams } from "@mui/x-data-grid"
import { isManager } from "@utils/roles"
import { Button } from "@shared/components";
import { Account } from "@modules/users/models/Account";
import { FaEdit, FaTrash } from "react-icons/fa";

type ColumnsProps = {
    user: Account,
    handleEdit: any,
    handleDelete: any
}

const Columns = ({
    user,
    handleEdit,
    handleDelete
}: ColumnsProps) => {
    let cols = []
    if (isManager(user.role!)) {
        cols.push({
            field: 'createdBy.displayName', headerName: 'Owner', minWidth: 150, flex: true,
            renderCell: (cellValues: GridValueGetterParams) => cellValues.row.createdBy.displayName
        })
    }

    return [
        { field: 'title', headerName: 'Title', minWidth: 150, flex: true },
        { field: 'summary', headerName: 'Summary', minWidth: 150, flex: true },
        ...cols,
        {
            field: 'isPerformed', headerName: 'Performed', minWidth: 100, flex: true, type: 'boolean',
            renderCell: (cellValues: GridValueGetterParams) => cellValues.row.isPerformed ?
                "Yes" : "No"
        },
        {
            field: "action", headerName: 'Actions', Width: 100, type: 'action',
            renderCell: (cellValues: GridValueGetterParams) => {
                return (
                    <div className="action-icon">
                        {
                            user.id === cellValues.row.createdBy.id ? (
                                <Button color='primary' title='edit' rounded outline
                                    onClick={() => handleEdit(cellValues.row.id)}>
                                    <FaEdit />
                                </Button>
                            ) : null
                        }
                        {
                            isManager(user.role!) ? (
                                <Button color='secondary' title='delete' rounded outline
                                    onClick={() => handleDelete(cellValues.row.id)}>
                                    <FaTrash />
                                </Button>
                            ) : null
                        }
                    </div>
                )
            }
        },
    ]
}

export default Columns;