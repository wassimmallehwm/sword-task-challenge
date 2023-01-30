import { MANAGER, PROTECTED } from '@config/const';
import { Route } from '@shared/types';
import { lazy } from 'react';
const Notifications = lazy(() => import('../components/notification-list/Notifications'));

const notificationsRoutes: Route[] = [
    {
        path: "/notifications",
        component: Notifications,
        status: PROTECTED,
        roles: [MANAGER]
    }
]

export default notificationsRoutes;