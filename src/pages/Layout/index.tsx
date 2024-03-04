import React, { FC, useState } from "react";
import { matchRoutes, useLocation } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { selectIsVideoFullScreen, selectIsLayoutRouteTop } from "@/stores/slices/deviceAdjustSlice";
import Header from "./components/Header";
import Tabbar from "./components/Tabbar";
import Navigate from "./components/Navigate";
import PCHeader from "./components/PCHeader";
import Router from "../Router";
import "./index.scoped.scss";
import { NAV_LONG_LENGTH, NAV_SHORT_LENGTH } from "@/constants";
import routes from "../Router/router";

const Layout: FC = () => {
    const [shortNavVisible, setShortNavVisible] = useState(false);
    const isVideoFullScreen = useAppSelector(selectIsVideoFullScreen);
    const isLayoutRouteTop = useAppSelector(selectIsLayoutRouteTop);
    const location = useLocation();
    const meta = matchRoutes(routes, location)![0].route.meta;


    return (
        <div className="container">
            {!meta?.mobileHeaderHidden && (
                <header className="header">
                    <Header />
                </header>
            )}
            {!meta?.navigateHidden && (
                <div className="navigate"
                    style={{
                        width: `${shortNavVisible ? NAV_SHORT_LENGTH : NAV_LONG_LENGTH}`,
                        transition: `${shortNavVisible ? 'all 0.3s ease-in-out' : 'all 0.3s 0.2s ease-in-out'}`
                    }}>
                    <Navigate shortNavVisible={shortNavVisible} />
                </div>
            )}
            <div className={`layout ${isVideoFullScreen && 'layout-full'}`} style={{ zIndex: `${isLayoutRouteTop ? '3' : '0'}` }}>
                <Router />
            </div>
            {!meta?.headerHidden && (
                <header className="pc-header">
                    <PCHeader changeNavLen={setShortNavVisible} shortNavVisible={shortNavVisible} />
                </header>
            )}
            {!meta?.tabbarHidden && (
                <div className="tabbar">
                    <Tabbar />
                </div>
            )}
        </div>
    )
}

export default Layout;