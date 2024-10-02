import React, { memo, useCallback } from "react";
import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Sign() {
    const navigate = useNavigate();
    let store = useStore()

    const select = useSelector(state => ({
        token: state.login.token,
        user: state.login.user
    }));

    const callbacks = {
        exitAccount: useCallback(() => { 
            navigate("/")
            store.actions.login.exitAccount() 
        }, [store]),
    };


    return <div className="Sign">
        {select.token != ""
            ? <>
                <Link to={"/profile"}>
                    {select.user.username}
                </Link>
                <button onClick={() => callbacks.exitAccount()}>Выход</button>
            </>
            : <Link to={"/login"}>
                <button>Вход</button>
            </Link>
        }
    </div>
}

export default memo(Sign)