import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "./router";

interface Props {
    children: ReactElement;
}

const RouterAuth: FC<Props> = ({ children }: Props) => {
    const route = children.props.match.route as Routes
    // const location = useLocation()
    // const matchs = matchRoutes(routes, location)
    // const route = matchs ? matchs[0].route : {}

    if (route.meta?.auth) {
        const token = localStorage.getItem('token')
        if (token) {
            return <>{children}</>
        }
        return <Navigate to={`${window.innerWidth > 768 ? '/login' : '/mobile-login'}`} replace />
    }

    if (route.redirect) {
        return <Navigate to={route.redirect} replace />
    }

    return <>{children}</>
}

export default RouterAuth