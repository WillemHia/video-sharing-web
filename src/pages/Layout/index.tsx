import React, { FC } from "react";
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Router from "../Router";

const Layout: FC = () => {
    return (
        <>
            <Header />
            <Router />
            <Tabbar />
        </>
    )
}

export default Layout;