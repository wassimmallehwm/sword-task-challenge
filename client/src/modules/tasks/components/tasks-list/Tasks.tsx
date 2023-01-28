import { AuthContext } from '@contexts/index'
import { useDataGrid } from '@hooks/index'
import { Task } from '@modules/tasks/models/task'
import TasksService from '@modules/tasks/services/tasks.service'
import { Button, IconBtn, PageTitle } from '@shared/components'
import httpErrorHandler from '@utils/error-handler'
import { toastError } from '@utils/toast'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Columns from './Columns'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FaPlus } from 'react-icons/fa'

const Tasks = () => {
    const { user } = useContext(AuthContext)
    const { t } = useTranslation()

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getTasks = async () => {
        setLoading(true)
        try {
            const { data } = await TasksService.list({});
            setTasks(data.docs)
            dataGrid.setRowCount(data.total)
        } catch (error: any) {
            toastError(httpErrorHandler(error).message)
        } finally {
            setLoading(false)
        }
    }

    const dataGrid = useDataGrid({
        columns: Columns({
            user: user!,
            handleEdit: console.log,
            handleDelete: console.log
        }),
        loading: loading,
        rows: tasks
    })

    useEffect(() => {
        getTasks();
    }, [...dataGrid.effectParams]);

    return (
        <div className="main-div">
            <div className='flex items-center justify-between'>
                <PageTitle color="primary">{t('titles.tasks')}</PageTitle>
                <Button color='primary' title='create' rounded outline
                    onClick={() => console.log("Create")}>
                    <FaPlus />
                </Button>

            </div>
            {dataGrid.grid}
        </div>
    )
}

export default Tasks