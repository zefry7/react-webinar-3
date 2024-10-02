import React, { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import "./style.css"
import { useNavigate } from "react-router-dom";

function Register({ onRegister, error }) {
    const cn = bem('Register');

    const onSubmit = (e) => {
        e.preventDefault()
        onRegister(e.target.login.value, e.target.password.value)
    }

    return <div className={cn()}>
        <h2 className={cn("title")}>Вход</h2>
        <form className={cn("form")} onSubmit={(e) => onSubmit(e)}>
            <label className={cn("label")}>
                Логин
                <input type="text" name="login"/>
            </label>
            <label className={cn("label")}>
                Пароль
                <input type="password" name="password"/>
            </label>
            {error != "" &&
                <p className={cn("error")}>{error}</p>
            }
            <button type="submit" className={cn("sing-button")}>Вход</button>
        </form>
    </div>
}

export default memo(Register)