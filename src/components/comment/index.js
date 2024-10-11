import React, { useEffect, useRef, useState } from "react";
import "./style.css"
import InputComment from "../input-comment";
import { Link, useLocation, useNavigate } from "react-router-dom";

const listMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентебря", "октября", "ноября", "декабря"]

function Comment({ data, submit, replyСomment, index, activeComment, setActiveComment, token, username }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [date, useDate] = useState(new Date(data?.dateCreate))
    const inputCommnet = useRef(null)

    const handleClickButton = () => {
        setActiveComment(index)
    }

    const handleLogin = () => {
        navigate('/login', { state: { back: location.pathname } });
    }

    useEffect(() => {
        if(activeComment == index) {
            inputCommnet.current.scrollIntoView(false)
        }
    }, [activeComment])

    return <div className="comment" style={{ "--data-tab": `${(data?.tab || 0) * 30}px` }}>
        <div className="comment__top-row">
            <p className={"comment__name-user" + ((username == data?.author?.profile?.name || username == data?.name) ? " comment__name-user_author" : "")}>{data?.author?.profile?.name || data?.name}</p>
            <p className="comment__date">{date.getDate() + " " + listMonths[date.getMonth()] + " " + date.getFullYear() + " в " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())}</p>
        </div>
        <div className="comment__text">{data?.text}</div>
        <div className="comment__button" onClick={() => handleClickButton()}>Ответить</div>
        <div ref={inputCommnet}>
            {token != null
                ? index == activeComment && <InputComment index={index} submit={submit} replyСomment={replyСomment} setActiveComment={setActiveComment} id={data._id} />
                : index == activeComment && <div className="comment__no-login"><a onClick={() => handleLogin()}>Войдите</a>, чтобы иметь возможность комментировать. <span className="comment__button-cancle" onClick={() => setActiveComment(-1)}>Отмена</span></div>
            }
        </div>
    </div>
}

export default Comment;