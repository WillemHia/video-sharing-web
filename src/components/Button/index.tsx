import React, { FC, ReactNode } from "react";
import "./index.scoped.scss";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
    isMobile?: boolean;
}

const Button: FC<Props> = ({ children, onClick, style, isMobile }) => {
    return (
        <>
            <button
                className={`${isMobile && "mobile"}`}
                onClick={onClick}
                style={style}
            >
                {children}
            </button>
        </>
    )
}

export default Button;
