import authRoutes from "@modules/auth/routes";
import tasksRoutes from "@modules/tasks/routes";
import accountsRoutes from "@modules/users/routes";
import { Route } from "@shared/types";


const appRoutes: Route[] = [
    ...authRoutes,
    ...accountsRoutes,
    ...tasksRoutes
];

export default appRoutes;