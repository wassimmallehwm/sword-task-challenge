import { GridValueGetterParams } from "@mui/x-data-grid"
import { isManager } from "@utils/roles"
import { Button } from "@shared/components";
import { Account } from "@modules/users/models/Account";
import { FaCheck, FaEdit, FaEye, FaTimes, FaTrash } from "react-icons/fa";
import { formateDateTime } from "@utils/dateFormat";
import { useTranslation } from "react-i18next";

type ColumnsProps = {
    user: Account,
    handleEdit: any,
    handleDelete: any,
    handleView: any
}

const Columns = ({
    user,
    handleEdit,
    handleDelete,
    handleView
}: ColumnsProps) => {
    const { t } = useTranslation()
    let cols = []
    if (isManager(user.role!)) {
        cols.push({
            field: 'createdBy.displayName', headerName: t('technician'), minWidth: 150, flex: true,
            renderCell: (cellValues: GridValueGetterParams) => cellValues.row.createdBy.displayName
        })
    }

    return [
        { field: 'title', headerName: t('title'), minWidth: 150, flex: true },
        { field: 'summary', headerName: t('summary'), minWidth: 150, flex: true },
        ...cols,
        {
            field: 'isPerformed', headerName: t('isPerformed'), minWidth: 100, flex: true, type: 'boolean',
            renderCell: (cellValues: GridValueGetterParams) => cellValues.row.isPerformed ?
                <FaCheck className='text-primary-600' /> :
                <FaTimes className='text-secondary-600' />
        },
        {
            field: 'performedAt', headerName: t('performedAt'), minWidth: 100, flex: true, type: 'boolean',
            renderCell: (cellValues: GridValueGetterParams) => formateDateTime(cellValues.row.performedAt)
        },
        {
            field: "action", headerName: t('actions'), Width: 100, type: 'actions',
            renderCell: (cellValues: GridValueGetterParams) => {
                return (
                    <div className="action-icon">
                        <Button color='primary' title='view' rounded outline
                            onClick={() => handleView(cellValues.row.id)}>
                            <FaEye />
                        </Button>
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