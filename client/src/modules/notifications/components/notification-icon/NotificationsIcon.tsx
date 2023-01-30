import React, { useContext, useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { SocketContext } from 'src/contexts/socket/SocketContext'
import { showNotif } from 'src/utils'
import { NotificationItem } from 'src/modules/notifications'
import { Dropdown } from '@shared/components'
import { useModal } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import { Notification } from '@modules/notifications/models/notification'
import { elementAcceptingRef } from '@mui/utils'
import NotificationsService from '@modules/notifications/services/notification.service'

const NotificationsIcon = () => {
    const { socket } = useContext(SocketContext)
    const [list, setList] = useState<Notification[]>([])
    const [notifCount, setNotifCount] = useState<number>(0)
    const [currentNotif, setCurrentNotif] = useState<Notification | null>(null)
    const { t } = useTranslation()

    const getTopNotifs = async () => {
        const { response, error, success } = await NotificationsService.findTop()
        if (success && response) {
            setList(response.docs.map(elem => {
                return { ...elem, active: !elem.read }
            }))
        } else {
            console.error(error?.message)
        }
    }

    const countNotifs = async () => {
        const { response, error, success } = await NotificationsService.count()
        if (success && response) {
            setNotifCount(response)
        } else {
            console.error(error?.message)
        }
    }

    const viewNotif = async (notif: Notification) => {
        setCurrentNotif(notif)
        viewModal.openModal()
        if (!notif.read) {
            const { error, success } = await NotificationsService.read(notif._id!)
            if (success) {
                setList(prev => prev.map(elem => {
                    if (elem._id == notif._id) {
                        return {
                            ...elem,
                            read: true,
                            active: false
                        }
                    }
                    return elem
                }))
                setNotifCount(prev => prev - 1)
            } else {
                console.error(error?.message)
            }
        }
    }

    useEffect(() => {
        Promise.allSettled([
            countNotifs(),
            getTopNotifs()
        ])
    }, [])

    useEffect(() => {
        socket?.on('Notifications', data => {
            console.log(data)
            setNotifCount(prev => prev + 1)
            showNotif(<NotificationItem notif={data} />)
            setList(prev => [data, ...prev])
        })

        return () => {
            socket?.off('Notifications')
        }
    }, [socket])

    const viewModal = useModal({
        title: t('notification'),
        content: <NotificationItem notif={currentNotif} />,
        onCancel: () => setCurrentNotif(null)
    })

    const trigger = (
        <>
            <span className="sr-only">Notifications</span>
            <FaBell size="18" className='text-gray-700' />
            {
                notifCount > 0 && (
                    <span className="absolute -top-1/2 left-[60%] p-1 leading-none text-center text-xs whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">
                        {notifCount}
                    </span>
                )
            }
        </>
    )

    return (
        <>
            <Dropdown trigger={trigger} list={list}
                displayField='title' keyField='_id'
                onAction={viewNotif} />
            {viewModal.modal}
        </>
    )
}

export default NotificationsIcon