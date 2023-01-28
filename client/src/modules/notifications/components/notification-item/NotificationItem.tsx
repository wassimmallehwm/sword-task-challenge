import React from 'react'

const NotificationItem = ({
    notif,
    active
}: any) => {
    return (
        <div
            className={
                `max-w-md  shadow-lg rounded-lg cursor-pointer pointer-events-auto flex
                ${active ? 'bg-primary-50' : 'bg-white'}`
                
            }
        >
            <div className="w-full p-4">
                    {/* <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                        />
                    </div> */}
                    <div className="mx-2">
                        <p className="text-sm font-medium text-gray-900">
                            {notif.subject}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 truncate">
                            {notif.body}
                        </p>
                    </div>
            </div>
        </div>
    )
}

export default NotificationItem