import React, { FC, useState } from "react";
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Navigate from "@/components/Navigate";
import PCHeader from "@/components/PCHeader";
import Router from "../Router";
import "./index.scoped.scss";
import { NAV_LONG_LENGTH, NAV_SHORT_LENGTH } from "@/constants";

const Layout: FC = () => {
    const [shortNavVisible, setShortNavVisible] = useState(false);

    return (
        <div className="container">
            <header className="header">
                <Header />
            </header>
            <header className="pc-header">
                <PCHeader changeNavLen={setShortNavVisible} shortNavVisible={shortNavVisible}/>
            </header>
            <div className="navigate" style={{ width: `${shortNavVisible ? NAV_SHORT_LENGTH : NAV_LONG_LENGTH}` }}>
                <Navigate shortNavVisible={shortNavVisible} />
            </div>
            <div className="layout">
                <Router />
            </div>
            <div className="tabbar">
                <Tabbar />
            </div>
        </div>
    )
}

export default Layout;