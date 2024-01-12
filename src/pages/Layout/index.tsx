import React, { FC, useState } from "react";
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Navigate from "@/components/Navigate";
import PCHeader from "@/components/PCHeader";
import Router from "../Router";
import "./index.scoped.scss";

const Layout: FC = () => {
    const [shortNavVisible, setShortNavVisible] = useState(false);

    return (
        <div className="container">
            <header className="header">
                <Header />
            </header>
            <header className="pc-header">
                <PCHeader changeNvaLen={setShortNavVisible} shortNavVisible={shortNavVisible}/>
            </header>
            <div className="navigate" style={{ width: `${shortNavVisible ? '60px' : '170px'}` }}>
                <Navigate />
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