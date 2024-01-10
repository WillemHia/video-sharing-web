import { lazy } from "react";
import { NonIndexRouteObject } from "react-router-dom";

export interface Routes extends NonIndexRouteObject {
    meta?: {
        auth?: boolean;
    },
    children?: Routes[],
    redirect?: string;
}

const routes: Routes[] = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/myself",
        Component: lazy(() => import('@/pages/Myself')),
        meta: {
            auth: true,
        },
    },
    {
        path: "/home",
        Component: lazy(() => import('@/pages/Home')),
    },
    {
        path: "*",
        Component: lazy(() => import('@/pages/NotFound')),
    }
];

export default routes;