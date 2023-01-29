import { formateDateTime } from '@utils/dateFormat'
import React from 'react'

type NotificationItemProps = {
    notif: any
    active?: boolean
}

const NotificationItem = ({
    notif,
    active
}: NotificationItemProps) => {
    return (
        <div
            className={
                `max-w-md  shadow-lg rounded-lg cursor-pointer pointer-events-auto flex
                ${active ? 'bg-primary-50' : 'bg-white'}`
                
            }
        >
            <div className="w-full p-4">
                    <div className="mx-2">
                        <p className="text-sm font-medium text-gray-700">
                            {notif?.title}
                        </p>
                        <p className="flex justify-end mt-1 text-xs font-thin text-gray-500 truncate">
                            {formateDateTime(notif?.createdAt)}
                        </p>
                    </div>
            </div>
        </div>
    )
}

export default NotificationItem