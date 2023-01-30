import authRoutes from "@modules/auth/routes";
import notificationsRoutes from "@modules/notifications/routes";
import tasksRoutes from "@modules/tasks/routes";
import accountsRoutes from "@modules/users/routes";
import { Route } from "@shared/types";


const appRoutes: Route[] = [
    ...authRoutes,
    ...accountsRoutes,
    ...tasksRoutes,
    ...notificationsRoutes
];

export default appRoutes;