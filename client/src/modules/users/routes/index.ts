import { MANAGER } from '@config/const';
import { Route } from '@shared/types';
import { lazy } from 'react';
const Users = lazy(() => import('../components/users-list/Users'));

const accountsRoutes: Route[] = [
    {
        path: "/technicians",
        component: Users,
        status: 'PROTECTED',
        roles: [MANAGER]
    }
]

export default accountsRoutes;