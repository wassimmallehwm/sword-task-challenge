import { GUEST } from '@config/const';
import { Route } from '@shared/types';
import { lazy } from 'react';
const Login = lazy(() => import('../components/login/Login'));

const authRoutes: Route[] = [
    {
        path: "/login",
        component: Login,
        status: GUEST
    }
    
]

export default authRoutes;