import React from 'react'

const NotificationViewer = ({
    notif
}: any) => {
    return (
        <div>
            <p className="mt-1 text-sm text-gray-500 truncate">
                {notif?.body}
            </p>
        </div>
    )
}

export default NotificationViewer