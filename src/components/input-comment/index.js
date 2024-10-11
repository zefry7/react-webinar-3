import React, { forwardRef, useRef } from "react";
import "./style.css"

const InputComment = forwardRef(function InputComment({ submit, replyСomment = false, setActiveComment, id, index }, ref) {
    const refTextarea = useRef(null)


    const onSubmit = (e) => {
        e.preventDefault()
        if (e.target[0].value.match(/^\s*$/) == null) {
            if(replyСomment == true) {
                setActiveComment(-1)
            }
            submit(e.target[0].value, id, index)
        }
        refTextarea.current.value = ""
    }

    return <div className={"input-comment" + (replyСomment == true ? " input-comment_left-padding" : "")}>
        <div className="input-comment__content">
            <h4 className="input-comment__title">{replyСomment == true ? "Новый ответ" : "Новый комментарий" }</h4>
            <form action="" className="input-comment__form" onSubmit={(e) => onSubmit(e)}>
                <textarea name="" id="" className="input-comment__textarea" ref={refTextarea} ></textarea>
                <div className={"input-comment__row-buttons"}>
                    <button className="input-comment__button">Отправить</button>
                    {replyСomment == true && <button className="input-comment__button" onClick={() => setActiveComment(-1)}>Отмена</button>}
                </div>
            </form>
        </div>
    </div>
})

export default InputComment;