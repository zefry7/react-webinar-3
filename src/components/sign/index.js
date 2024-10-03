import React, { memo } from "react";
import "./style.css"
import { Link } from "react-router-dom";

function Sign({token, username, exitAccount}) {

    return <div className="Sign">
        {token != ""
            ? <>
                <Link to={"/profile"}>
                    {username}
                </Link>
                <button onClick={() => exitAccount()}>Выход</button>
            </>
            : <Link to={"/login"}>
                <button>Вход</button>
            </Link>
        }
    </div>
}

export default memo(Sign)