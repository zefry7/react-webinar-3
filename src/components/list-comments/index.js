import React, { useEffect, useState } from "react";
import "./style.css"
import InputComment from "../input-comment";
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import shallowequal from "shallowequal";
import commentActions from '../../store-redux/comment/actions';
import Comment from "../comment";
import { Link } from "react-router-dom";

function ListComments({ articleID }) {
    const [activeComment, setActiveComment] = useState(-1)
    const dispatch = useDispatch()
    const selectorRedux = useReduxSelector(state => ({
        list: state.comment.list,
    }),
        shallowequal
    )

    const selector = useSelector((state) => ({
        token: state.session.token,
    }))

    const callbacks = {
        onSubmit: async (value, id) => {
            if(id != articleID) {
                await dispatch(commentActions.addComment(selector.token, value, id, "comment"));
            } else {
                await dispatch(commentActions.addComment(selector.token, value, articleID, "article"));
            }
            dispatch(commentActions.loadComment(articleID));
        }
    }

    useEffect(() => {
        dispatch(commentActions.loadComment(articleID));
        console.log(selectorRedux.list);
    }, [])


    return <div className="list-comment">
        <div className="list-comment__content">
            <div className="list-comment__title">Комментарии ({selectorRedux.list.length})</div>
            <div className="list-comment__list">
                {selectorRedux.list?.map((v, i) => (
                    <Comment data={v} key={i} index={i} submit={callbacks.onSubmit} replyСomment={true} activeComment={activeComment} setActiveComment={setActiveComment} token={selector.token} />
                ))}
            </div>
            {selector.token != null
                ? activeComment == -1 && <InputComment submit={callbacks.onSubmit} id={articleID}/>
                : activeComment == -1 && <p className="list-comment__no-login"><Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать</p>
            }
        </div>
    </div>
}

export default ListComments;