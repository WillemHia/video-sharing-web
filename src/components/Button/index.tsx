import React, { FC, ReactNode } from "react";
import "./index.scoped.scss";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

const Button: FC<Props> = ({ children, onClick }) => {
    return (
        <>
            <button
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}

export default Button;
