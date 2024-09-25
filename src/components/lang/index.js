import React, { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import "./style.css"

function Lang({changeLang, lang}) {
    const cn = bem('Lang');

    return <div className={cn()}>
        <div className={cn('wrapper')}>
            <span className={lang == "ru" ? cn("item Lang-item_active") : cn("item")} onClick={() => (changeLang("ru"))}>ru</span> 
            <hr/>
            <span className={lang == "en" ? cn("item Lang-item_active") : cn("item")}onClick={() => (changeLang("en"))}>en</span>
        </div>
    </div>
}

export default memo(Lang)