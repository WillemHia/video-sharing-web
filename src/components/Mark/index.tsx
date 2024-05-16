import React, { FC } from "react";
import './index.scoped.scss'

interface Props {
    onClose?: () => void;
    children: React.ReactNode;
}

const Mark: FC<Props> = ({ onClose, children }) => {
    return (
        <div className="container" onClick={onClose}>
            {children}
        </div>
    );
}

export default Mark;