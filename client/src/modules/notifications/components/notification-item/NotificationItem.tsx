import { Notification } from '@modules/notifications/models/notification'
import { formatDateTime } from '@utils/dateFormat'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

type NotificationItemProps = {
    notif: Notification | null
    popup?: boolean
    page?: boolean
}

const NotificationItem = ({
    notif,
    popup = false,
    page = false
}: NotificationItemProps) => {
    const { t } = useTranslation()
    return (
        <div
            className={
                `shadow-lg rounded cursor-pointer pointer-events-auto flex w-auto
                ${page ? 'w-[80vw] m-auto' : 'max-w-md'}
                ${!notif?.read && !popup ? 'bg-gray-200' : 'bg-white'}`
            }
        >
            <div className="w-full p-4">
                <div className="mx-2">
                    <p className="text-sm font-medium text-gray-700">
                        <Trans i18nKey="text.notification"
                            values={{
                                user: notif?.user,
                                task: notif?.task,
                                date: formatDateTime(notif?.date)
                            }}
                            components={{ strong: <strong /> }}
                        />
                    </p>
                    <p className="flex justify-end mt-1 text-xs font-thin text-gray-500 truncate">
                        {formatDateTime(notif?.createdAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotificationItem