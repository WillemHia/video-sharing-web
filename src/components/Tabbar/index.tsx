import React, { FC } from "react";
import { NavLink } from "react-router-dom";

const Tabbar: FC = () => {
    return (
        <>
            <NavLink to="/myself">
                <div>Myself</div>
            </NavLink>
            <NavLink to="/home">
                <div>Home</div>
            </NavLink>
        </>
    );
}

export default Tabbar;