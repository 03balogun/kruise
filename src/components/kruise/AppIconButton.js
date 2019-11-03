import React from 'react';
import Tooltip from "@material-ui/core/Tooltip/index";
import IconButton from "@material-ui/core/IconButton/index";

export default ({children, onClick, title, btnClass, tipClassName}) => {
    return (
        <Tooltip title={title} className={tipClassName} placement="top">
            <IconButton onClick={onClick} className={btnClass}>
                {children}
            </IconButton>
        </Tooltip>
    );
};
