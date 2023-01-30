import { NOTIFICATIONS_COUNT_DESCREASE } from '@config/const'
import { Notification } from '@modules/notifications/models/notification'
import { PageTitle } from '@shared/components'
import EventsEmitter from '@utils/events'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import NotificationsService from '../../services/notification.service'
import NotificationItem from '../notification-item/NotificationItem'

const Notifications = () => {
    const {t} = useTranslation()
    const [list, setList] = useState<Notification[]>([])

    const getNotifs = async () => {
        const { response, error, success } = await NotificationsService.list()
        if (success && response) {
            console.log(response)
            setList(response.docs.map(elem => {
                return { ...elem, active: !elem.read }
            }))
        } else {
            console.error(error?.message)
        }
    }

    useEffect(() => {
        getNotifs()
    }, [])

    const viewNotif = async (notif: Notification) => {
        if (!notif.read) {
            setList(prev => prev.map(elem => {
                if (elem._id == notif._id) {
                    return {
                        ...elem,
                        read: true
                    }
                }
                return elem
            }))
            EventsEmitter.emit(NOTIFICATIONS_COUNT_DESCREASE, {id: notif._id})
            await NotificationsService.read(notif._id!)
        }
    }

    return (
        <div className='main-div'>
            <PageTitle> {t('notifications')} </PageTitle>
            <div className='mt-8 flex flex-col gap-4'>
                {
                    list.map(notif => <div onClick={() => viewNotif(notif)}>
                        <NotificationItem notif={notif} page />
                    </div>)
                }
            </div>
        </div>
    )
}

export default Notifications