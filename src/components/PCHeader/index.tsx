import React, { FC } from "react";



interface Props {
    shortNavVisible: boolean;
    changeNvaLen: (visible: boolean) => void;
}

const PCHeader: FC<Props> = ({ changeNvaLen, shortNavVisible }) => {
    return (
        <div>
            <span onClick={() => changeNvaLen(!shortNavVisible)}>缩小</span>
        </div>
    )
}

export default PCHeader;