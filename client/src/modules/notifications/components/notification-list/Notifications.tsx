import { NOTIFICATIONS_COUNT_DESCREASE } from '@config/const'
import { Notification } from '@modules/notifications/models/notification'
import { Pagination } from '@mui/material'
import { PageTitle, Spinner } from '@shared/components'
import EventsEmitter from '@utils/events'
import { toastError } from '@utils/toast'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import NotificationsService from '../../services/notification.service'
import NotificationItem from '../notification-item/NotificationItem'

const Notifications = () => {
    const { t } = useTranslation()
    const [list, setList] = useState<Notification[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const getNotifs = async () => {
        setLoading(true)
        const { response, error, success } = await NotificationsService.list({
            page
        })
        if (success && response) {
            console.log(response)
            setList(response.docs)
            setTotalPages(response.pages)
        } else {
            toastError(error?.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getNotifs()
    }, [page])

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
            EventsEmitter.emit(NOTIFICATIONS_COUNT_DESCREASE, { id: notif._id })
            await NotificationsService.read(notif._id!)
        }
    }

    return (
        <div className='main-div'>
            <PageTitle> {t('notifications')} </PageTitle>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className='mt-8 flex flex-col gap-4'>
                            {
                                list.map(notif => <div onClick={() => viewNotif(notif)}>
                                    <NotificationItem data-testid={notif._id} notif={notif} page />
                                </div>)
                            }
                        </div>

                        {
                            totalPages > 1 ? (
                                <div className='flex items-center justify-end mt-8 mb-16 px-2'>
                                    <Pagination variant="outlined" shape="rounded"
                                        siblingCount={0} boundaryCount={1}
                                        count={totalPages} page={page} defaultPage={page}
                                        onChange={(e, page) => setPage(page)} />
                                </div>
                            ) : null
                        }
                    </>
                )
            }

        </div>
    )
}

export default Notifications