import React, { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import "./style.css"
import { changeLangText } from "../../utils";

function NavLine({ lang }) {
    const cn = bem('NavLine');

    return <div className={cn()}>
        <Link to="/" className={cn("link")}>{changeLangText(lang, "nav")}</Link>
    </div>
}

export default memo(NavLine)