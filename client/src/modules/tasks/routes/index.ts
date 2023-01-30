import { PROTECTED } from '@config/const';
import { Route } from '@shared/types';
import { lazy } from 'react';
const Tasks = lazy(() => import('../components/tasks-list/Tasks'));

const tasksRoutes: Route[] = [
    {
        path: "/tasks",
        component: Tasks,
        status: PROTECTED,
        roles: ['ALL']
    }
]

export default tasksRoutes;