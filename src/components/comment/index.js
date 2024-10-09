import React, { useState } from "react";
import "./style.css"
import InputComment from "../input-comment";
import { Link } from "react-router-dom";

const listMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентебря", "октября", "ноября", "декабря"]

function Comment({ data, submit, replyСomment, index, activeComment, setActiveComment, token }) {
    const [date, useDate] = useState(new Date(data?.dateCreate))

    return <div className="comment" style={{"--data-tab": `${(data?.tab || 0) * 30}px`}}> 
        <div className="comment__top-row">
            <p className="comment__name-user">{data?.author?.profile?.name}</p>
            <p className="comment__date">{date.getDate() + " " + listMonths[date.getMonth()] + " " + date.getFullYear() + " в " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())}</p>
        </div>
        <div className="comment__text">{data?.text}</div>
        <div className="comment__button" onClick={() => setActiveComment(index)}>Ответить</div>
        {token != null 
            ? index == activeComment && <InputComment submit={submit} replyСomment={replyСomment} setActiveComment={setActiveComment} id={data._id}/>
            : index == activeComment && <div className="comment__no-login"><Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать. <span className="comment__button-cancle" onClick={() => setActiveComment(-1)}>Отмена</span></div>
        }
    </div>
}

export default Comment;