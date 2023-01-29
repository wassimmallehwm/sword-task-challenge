import { Task } from '@modules/tasks/models/task'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Input, Toggle } from '@shared/components/form'
import { formatDateTimeToInput } from '@utils/dateFormat'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { FieldErrorsImpl } from 'react-hook-form/dist/types/errors'
import { useTranslation } from 'react-i18next'

type TasksFormProps = {
    register: UseFormRegister<FieldValues>
    errors: Partial<FieldErrorsImpl<{
        [x: string]: any;
    }>>
    watchIsPerformed: boolean
}

const TasksForm = React.forwardRef(({
    register,
    errors,
    watchIsPerformed
}: TasksFormProps, ref) => {
    const { t } = useTranslation()

    return (
        <form action="" className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    {t('title')}
                </label>
                <input type="text" {...register('title')}
                    className={`w-full h-9 rounded mt-1 outline-hidden focus:border-primary-300 
                    focus:outline-none focus:ring-1 bg-white py-1 px-2 border 
                    ${errors.title ? 'border-red-700' : 'border-gray-300'}`} />
                {
                    errors.title ?
                        <div className="text-red-700">
                            {errors.title?.message?.toString()}
                        </div>
                        : null
                }
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    {t('summary')}
                </label>
                <textarea {...register('summary')}
                    className={`w-full h-9 rounded mt-1 outline-hidden focus:border-primary-300 
                    focus:outline-none focus:ring-1 bg-white py-1 px-2 border 
                    ${errors.summary ? 'border-red-700' : 'border-gray-300'}`} rows={3}>

                </textarea>

                {
                    errors.summary ?
                        <div className="text-red-700">
                            {errors.summary?.message?.toString()}
                        </div>
                        : null
                }
            </div>
            <div className='flex items-center gap-4'>

                <div className='w-full'>
                    <label className='flex items-center w-min cursor-pointer'>
                        <input className='w-6 h-6 mx-2 cursor-pointer accent-primary-500'
                            type='checkbox' {...register('isPerformed')} />
                        {t('isPerformed')}
                    </label>
                </div>

                {
                    watchIsPerformed ? (
                        <div className='w-full'>
                            <label className="text-sm font-bold text-gray-600 block">
                                {t('performedAt')}
                            </label>
                            <input type="datetime-local" {...register('performedAt')}
                                className={`w-full h-9 rounded mt-1 outline-hidden focus:border-primary-300 
                                focus:outline-none focus:ring-1 bg-white py-1 px-2 border 
                                ${errors.performedAt ? 'border-red-700' : 'border-gray-300'}`} />

                            {
                                errors.performedAt ?
                                    <div className="text-red-700">
                                        {errors.performedAt?.message?.toString()}
                                    </div>
                                    : null
                            }
                        </div>
                    ) : null
                }

            </div>
        </form>
    )
})

export default TasksForm