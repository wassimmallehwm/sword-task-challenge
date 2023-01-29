import { AuthContext } from '@contexts/index'
import { useConfirmation, useDataGrid, useModal } from '@hooks/index'
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
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { formatDateTimeToInput } from '@utils/dateFormat'
import TasksView from '../tasks-view/TasksView'

const Tasks = () => {
    const { user } = useContext(AuthContext)
    const { t } = useTranslation()

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task>(InitTask);
    const [deleteTask, setDeleteTask] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required(t('validation.required', { field: t('title') })),
        summary: Yup.string()
            .required(t('validation.required', { field: t('summary') })),
        isPerformed: Yup.boolean(),
        performedAt: Yup.string()
            .when("isPerformed", {
                is: true,
                then: Yup.string().required(t('validation.required', { field: t('performedAt') }))
            })

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
        register,
        unregister,
        handleSubmit,
        reset,
        formState: { errors },
        watch
    } = useForm<Task>({
        ...formOptions,
        shouldUnregister: true
    });
    const watchIsPerformed = watch("isPerformed");

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

    const save = async (val: Task) => {
        showLoading()
        try {
            await TasksService.save(task._id, val)
            toastSuccess(t('succes.save', { res: t('task') }))
            getTasks()
            formModal.closeModal()
        } catch (error: any) {
            toastError(httpErrorHandler(error).message)
        }
    }

    const handleEdit = (id: string) => {
        const currentTask = tasks.find(elem => elem._id === id)
        if (currentTask !== undefined) {
            setTask({
                ...currentTask,
                performedAt: formatDateTimeToInput(currentTask.performedAt)
            })
            formModal.openModal()
        }
    }

    const handleDelete = (id: string) => {
        setDeleteTask(id)
        deleteModal.openModal()
    }

    const onCancelDelete = () => {
        setDeleteTask(null)
        deleteModal.closeModal()
    }

    const onDelete = async () => {
        showLoading()
        try {
            await TasksService.delete(deleteTask!)
            toastSuccess(t('success.delete', { res: t('task') }))
            getTasks()
            onCancelDelete()
        } catch (error: any) {
            toastError(httpErrorHandler(error).message)
        }
    }

    const handleView = (id: string) => {
        const currentTask = tasks.find(elem => elem._id === id)
        if (currentTask !== undefined) {
            setTask({
                ...currentTask,
                performedAt: formatDateTimeToInput(currentTask.performedAt)
            })
            viewModal.openModal()
        }
    }

    const dataGrid = useDataGrid({
        columns: Columns({
            user: user!,
            handleEdit,
            handleDelete,
            handleView
        }),
        loading: loading,
        rows: tasks
    })

    const formModal = useModal({
        title: task?._id ? t('editRes', { res: t('task') }) : t('createRes', { res: t('task') }),
        content: <TasksForm register={register} errors={errors} watchIsPerformed={watchIsPerformed!} />,
        save: handleSubmit(save),
        modalBtns: !task?.isPerformed,
        onCancel: () => setTask(InitTask)
    })

    const viewModal = useModal({
        title: task?.title!,
        content: <TasksView task={task}/>,
        onCancel: () => setTask(InitTask)
    })

    const deleteModal = useConfirmation({
        onConfirm: onDelete,
        onCancel: onCancelDelete
    })

    useEffect(() => {
        getTasks();
    }, [...dataGrid.effectParams]);

    useEffect(() => {
        reset(task);
    }, [task]);

    useEffect(() => {
        if (watchIsPerformed) {
            register("performedAt");
        } else {
            unregister("performedAt");
        }
    }, [register, unregister, watchIsPerformed]);

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
            {deleteModal.modal}
            {viewModal.modal}
        </div>
    )
}

export default Tasks