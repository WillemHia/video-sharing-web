import { lazy } from "react";
import { NonIndexRouteObject } from "react-router-dom";

export interface Routes extends NonIndexRouteObject {
    meta?: {
        auth?: boolean;
        headerHidden?: boolean;
        tabbarHidden?: boolean;
        navigateHidden?: boolean;
        mobileHeaderHidden?: boolean;
    },
    children?: Routes[],
    redirect?: string;
}

const routes: Routes[] = [
    {
        path: "/",
        Component: lazy(() => import('@/pages/Home')),
    },
    {
        path: "/user-info",
        Component: lazy(() => import('@/pages/UserInfo')),
        meta: {
            // auth: true,
            mobileHeaderHidden: true,
        },
    },
    {
        path: "*",
        Component: lazy(() => import('@/pages/NotFound')),
        meta: {
            headerHidden: true,
            tabbarHidden: true,
            navigateHidden: true,
        },
    }
];

export default routes;