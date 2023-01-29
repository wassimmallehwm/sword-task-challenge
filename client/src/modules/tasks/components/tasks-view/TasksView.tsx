import { Task } from '@modules/tasks/models/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheck, FaTimes } from 'react-icons/fa'

type TasksViewProps = {
    task: Task
}

const TasksView = ({
    task
}: TasksViewProps) => {
    const { t } = useTranslation()
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <span className='font-bold text-gray-800'> {t('title')}: </span>
                {task.title}
            </div>
            <div className='flex items-center gap-4'>
                <span className='font-bold text-gray-800'> {t('technician')}: </span>
                {task.createdBy?.displayName}
            </div>
            <div className='flex items-center gap-4'>
                <span className='font-bold text-gray-800'> {t('isPerformed')}: </span>
                {
                    task.isPerformed ?
                        <FaCheck className='text-primary-600' /> :
                        <FaTimes className='text-secondary-600' />
                }
            </div>
            {
                task.isPerformed ? (
                    <div className='flex items-center gap-4'>
                        <span className='font-bold text-gray-800'> {t('performedAt')}: </span>
                        {task.performedAt}
                    </div>
                ) : null
            }

            <div className='flex flex-col'>
                <span className='font-bold text-gray-800'> {t('summary')}: </span>
                <p>
                    {task.summary}
                </p>
            </div>




        </div>
    )
}

export default TasksView