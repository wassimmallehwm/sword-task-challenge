export const columns = () => {
    return [
        { field: 'displayName', headerName: 'Name', minWidth: 150, flex: true },
        { field: 'username', headerName: 'Username', minWidth: 150, flex: true },
        { field: 'email', headerName: 'Email', minWidth: 150, flex: true }
        // {
        //     field: "action", headerName: 'Action', Width: 100, type: 'action',
        //     renderCell: (cellValues) => {
        //         return hasRole ? (
        //             <div className="action-icon">
        //                 <IconBtn Icon={EditIcon} title="Edit" className='edit-icon' onClick={() => handleEdit(cellValues.row.id)} />
        //                 <IconBtn Icon={DeleteIcon} title="Delete" className='delete-icon' onClick={() => handleDelete(cellValues.row.id)} />
        //             </div>
        //         ) : null ;
        //     }
        // },
    ]
}