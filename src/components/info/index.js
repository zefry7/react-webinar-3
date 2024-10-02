import React, { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import "./style.css"

function Info({user}) {
    const cn = bem('Info');

    return <div className={cn()}>
        <h2 className={cn("title")}>Профиль</h2>
        <p className={cn("data")}>Имя: <span>{user.name}</span></p>
        <p className={cn("data")}>Телефон: <span>{user.phone}</span></p>
        <p className={cn("data")}>Email: <span>{user.email}</span></p>
    </div>
}

export default memo(Info)