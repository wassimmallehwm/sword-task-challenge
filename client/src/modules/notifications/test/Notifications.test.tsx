import { render, fireEvent, waitFor } from '@testing-library/react'
import Notifications from '../components/notification-list/Notifications'
import NotificationsService from '../services/notification.service'
import { NOTIFICATIONS_COUNT_DESCREASE } from '@config/const'
import { mockNotification, mockResponse } from './notifications.mocks'
import EventsEmitter from '@utils/events'

jest.mock('../services/notification.service')

describe('Notifications component', () => {
  it('Should fetch notifications list and read notification on click', async () => {
    const mockNotificationsService = NotificationsService as jest.Mocked<typeof NotificationsService>
    mockNotificationsService.list.mockResolvedValue({
      response: mockResponse,
      error: null,
      success: true
    })
    mockNotificationsService.read.mockResolvedValue({
      response: null,
      error: null,
      success: true
    })
    
    const { getByText, getByTestId } = render(<Notifications />)

    await waitFor(() => expect(mockNotificationsService.list).toHaveBeenCalledTimes(1))
    expect(getByText('notifications')).toBeInTheDocument()
    expect(getByText(mockNotification.task)).toBeInTheDocument()

    fireEvent.click(getByTestId(`${mockNotification._id}`))
    await waitFor(() => expect(mockNotificationsService.read).toHaveBeenCalledWith(mockNotification._id))
    expect(EventsEmitter.emit).toHaveBeenCalledWith(NOTIFICATIONS_COUNT_DESCREASE, { id: mockNotification._id })
  })
})
