import React, { FC } from "react";
import PCHome from "./components/PCHome";
import MobileHome from "./components/MobileHome";
import { useAppSelector } from "@/stores/hooks";
import { selectIsMobile } from "@/stores/slices/deviceAdjustSlice";
import "./index.scoped.scss";

const Home: FC = () => {

    const isMobile = useAppSelector(selectIsMobile);

    return (
        <>
            {isMobile ? <MobileHome /> : <PCHome />}
        </>

    );
};

export default Home;