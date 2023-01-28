import { Task } from '@modules/tasks/models/task'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Input, Toggle } from '@shared/components/form'
import { formatDateTimeToInput } from '@utils/dateFormat'
import React from 'react'
import { useTranslation } from 'react-i18next'

type TasksFormProps = {
    task: Task
    onChange: any
}

const TasksForm = ({
    task,
    onChange
}: TasksFormProps) => {
    const { title, summary, isPerformed, performedAt } = task
    const { t } = useTranslation()

    const onDataChange = (e: any) => {
        const { name, value } = e.target
        onChange(name, value)
    }

    return (
        <form action="" className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    {t('title')}
                </label>
                <Input type="text" name="title" value={title} onChange={onDataChange} />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    {t('summary')}
                </label>
                <Input textarea={true} type="text" name="summary" value={summary} onChange={onDataChange} />
            </div>
            <div className='flex items-center gap-4'>

                <div className='w-full'>
                    <Toggle enabled={isPerformed!} label={t('isPerformed')}
                        onChange={(val: boolean) => onChange('isPerformed', val)} />
                </div>

                {
                    isPerformed ? (
                        <div className='w-full'>
                            <label className="text-sm font-bold text-gray-600 block">
                                {t('performedAt')}
                            </label>
                            <Input type="datetime-local" name="performedAt"
                                value={formatDateTimeToInput(performedAt)} onChange={onDataChange} />
                        </div>
                    ) : null
                }

            </div>
        </form>
    )
}

export default TasksForm