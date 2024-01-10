import React, { FC, useState } from "react";
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Router from "../Router";
import { getIsMobile } from "@/utils/adjust";

const Layout: FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    return (
        <>
            <Header />
            <Router />
            <Tabbar />
        </>
    )
}

export default Layout;