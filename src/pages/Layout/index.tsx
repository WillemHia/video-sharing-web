import React, { FC, useState } from "react";
import { useAppSelector } from "@/stores/hooks";
import { selectIsVideoFullScreen } from "@/stores/slices/deviceAdjustSlice";
import Header from "./components/Header";
import Tabbar from "./components/Tabbar";
import Navigate from "./components/Navigate";
import PCHeader from "./components/PCHeader";
import Router from "../Router";
import "./index.scoped.scss";
import { NAV_LONG_LENGTH, NAV_SHORT_LENGTH } from "@/constants";

const Layout: FC = () => {
    const [shortNavVisible, setShortNavVisible] = useState(false);
    const isVideoFullScreen = useAppSelector(selectIsVideoFullScreen);

    return (
        <div className="container">
            <header className="header">
                <Header />
            </header>
            <header className="pc-header">
                <PCHeader changeNavLen={setShortNavVisible} shortNavVisible={shortNavVisible} />
            </header>
            <div className="navigate"
                style={{
                    width: `${shortNavVisible ? NAV_SHORT_LENGTH : NAV_LONG_LENGTH}`,
                    transition: `${shortNavVisible ? 'all 0.3s ease-in-out' : 'all 0.3s 0.2s ease-in-out'}`
                }}>
                <Navigate shortNavVisible={shortNavVisible} />
            </div>
            <div className={`layout ${isVideoFullScreen && 'layout-full'}`}>
                <Router />
            </div>
            <div className="tabbar">
                <Tabbar />
            </div>
        </div>
    )
}

export default Layout;