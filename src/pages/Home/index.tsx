import React, { FC} from "react";
import PCHome from "./PCHome";
import MobileHome from "./MobileHome";
import { useAppSelector } from "@/stores/hooks";
import { selectIsMobile } from "@/stores/deviceAdjustSlice";
import "./index.scoped.scss";

const Home: FC = () => {

    const isMobile = useAppSelector(selectIsMobile);

    return (
        <>
            <div className="container-pc">
                {!isMobile && <PCHome />}
            </div>
            <div className="container-mobile">
                {isMobile && <MobileHome />}
            </div>
        </>

    );
};

export default Home;