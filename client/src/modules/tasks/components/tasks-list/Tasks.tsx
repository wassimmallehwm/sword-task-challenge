import { AuthContext } from '@contexts/index'
import { useDataGrid, useModal } from '@hooks/index'
import { InitTask, Task } from '@modules/tasks/models/task'
import TasksService from '@modules/tasks/services/tasks.service'
import { Button, PageTitle } from '@shared/components'
import httpErrorHandler from '@utils/error-handler'
import { showLoading, toastError, toastSuccess } from '@utils/toast'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Columns from './Columns'
import { FaPlus } from 'react-icons/fa'
import TasksForm from '../tasks-form/TasksForm'
import { isManager } from '@utils/roles'

const Tasks = () => {
    const { user } = useContext(AuthContext)
    const { t } = useTranslation()

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task>(InitTask);
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

    const save = async () => {
        showLoading()
        try {
            const { data } = await TasksService.save(task._id, task)
            toastSuccess(t('succes.save', { res: t('task') }))
            getTasks()
            formModal.closeModal()
        } catch (error: any) {
            toastError(httpErrorHandler(error).message)
        }
    }

    const onChange = (name: string, value: any) => {
        setTask({ ...task, [name]: value })
    }

    const handleEdit = (id: string) => {
        const currentTask = tasks.find(elem => elem._id === id)
        if (currentTask !== undefined) {
            setTask(currentTask)
            formModal.openModal()
        }
    }

    const dataGrid = useDataGrid({
        columns: Columns({
            user: user!,
            handleEdit,
            handleDelete: console.log
        }),
        loading: loading,
        rows: tasks
    })

    const formModal = useModal({
        title: task?._id ? t('editRes', { res: t('task') }) : t('createRes', { res: t('task') }),
        content: <TasksForm task={task} onChange={onChange} />,
        save: save,
        modalBtns: !task?.isPerformed,
        onCancel: () => setTask(InitTask)
    })

    useEffect(() => {
        getTasks();
    }, [...dataGrid.effectParams]);

    return (
        <div className="main-div">
            <div className='flex items-center justify-between'>
                <PageTitle color="primary">{t('titles.tasks')}</PageTitle>
                {
                    !isManager(user?.role) ? (
                        <Button color='primary' title='create' rounded outline
                            onClick={() => formModal.openModal()}>
                            <FaPlus />
                        </Button>
                    ) : null
                }

            </div>
            {dataGrid.grid}
            {formModal.modal}
        </div>
    )
}

export default Tasks