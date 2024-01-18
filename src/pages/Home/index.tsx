import React, { FC } from "react";
import "./index.scoped.scss";

const Home: FC = () => {

    return (
        <div className="container-pc">
            <div className="video-list">
                <div className="video-item"></div>
                <div className="video-item"></div>
                <div className="video-item"></div>
                <div className="video-item"></div>
            </div>
            <div className="video-choose"></div>
        </div>
    );
};

export default Home;