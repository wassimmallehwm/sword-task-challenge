export interface Route {
    path: string;
    component: any;
    status: string;
    roles?: string[];
}