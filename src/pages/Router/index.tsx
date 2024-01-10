import React, { FC, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import RouterAuth from "./RouterAuth";

const Router: FC = () => {
    const Element = useRoutes(routes);

    return (
        <Suspense fallback={<div>加载中...</div>}>
            <RouterAuth>
                {Element!}
            </RouterAuth>
        </Suspense>
    )
}

export default Router
