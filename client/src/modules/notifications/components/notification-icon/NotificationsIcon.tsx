import React, { useContext, useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { SocketContext } from 'src/contexts/socket/SocketContext'
import { EventsEmitter, showNotif } from 'src/utils'
import { NotificationItem } from 'src/modules/notifications'
import { Dropdown } from '@shared/components'
import { useModal } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import { Notification } from '@modules/notifications/models/notification'
import NotificationsService from '@modules/notifications/services/notification.service'
import { NOTIFICATIONS_COUNT_DESCREASE, NOTIFICATIONS_QUEUE } from '@config/const'
import { Link } from 'react-router-dom'

const NotificationsIcon = () => {
    const { socket } = useContext(SocketContext)
    const [list, setList] = useState<Notification[]>([])
    const [notifCount, setNotifCount] = useState<number>(0)
    const [currentNotif, setCurrentNotif] = useState<Notification | null>(null)
    const { t } = useTranslation()

    const getTopNotifs = async () => {
        const { response, error, success } = await NotificationsService.findTop()
        if (success && response) {
            console.log(response)
            setList(response.docs)
        } else {
            console.error(error?.message)
        }
    }

    const countNotifs = async () => {
        const { response, error, success } = await NotificationsService.count()
        if (success && response !== null) {
            setNotifCount(response)
        } else {
            console.error(error?.message)
        }
    }

    const readNotif = (id: string) => {
        setList(prev => prev.map(elem => {
            if (elem._id ==id) {
                return {
                    ...elem,
                    read: true
                }
            }
            return elem
        }))
        setNotifCount(prev => prev - 1)
    }

    const viewNotif = async (notif: Notification) => {
        if (!notif.read) {
            setCurrentNotif({...notif, read: true})
            readNotif(notif._id!)
            viewModal.openModal()
            await NotificationsService.read(notif._id!)
        } else {
            setCurrentNotif(notif)
            viewModal.openModal()
        }
    }

    useEffect(() => {
        Promise.allSettled([
            countNotifs(),
            getTopNotifs()
        ])
    }, [])

    useEffect(() => {
        socket?.on(NOTIFICATIONS_QUEUE, data => {
            setNotifCount(prev => prev + 1)
            showNotif(<NotificationItem notif={data} popup />)
            setList(prev => {
                prev.pop()
                return [data, ...prev]
            })
            EventsEmitter.emit(NOTIFICATIONS_QUEUE)
        })

        EventsEmitter.on(NOTIFICATIONS_COUNT_DESCREASE, (id: string) => readNotif(id))

        return () => {
            socket?.off(NOTIFICATIONS_QUEUE)
            EventsEmitter.off(NOTIFICATIONS_COUNT_DESCREASE)
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

    const displayComponent = (notif: any) => (
        <NotificationItem notif={notif}/>
    )

    const footer = (
        <Link to="/notifications" 
        className="block w-full py-3 px-4 text-center text-primary-500 hover:underline">
            {t('seeAll')}
            </Link>
    )
    return (
        <>
            <Dropdown trigger={trigger} list={list}
                keyField='_id' onAction={viewNotif} 
                displayComponent={displayComponent} footer={footer} />
            {viewModal.modal}
        </>
    )
}

export default NotificationsIcon