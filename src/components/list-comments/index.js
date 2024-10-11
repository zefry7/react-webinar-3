import React, { useEffect, useState } from "react";
import "./style.css"
import InputComment from "../input-comment";
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import shallowequal from "shallowequal";
import commentActions from '../../store-redux/comment/actions';
import Comment from "../comment";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ListComments({ articleID }) {
    const [activeComment, setActiveComment] = useState(-1)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const selectorRedux = useReduxSelector(state => ({
        list: state.comment.list,
    }),
        shallowequal
    )

    const selector = useSelector((state) => ({
        token: state.session.token,
        user: state.session.user
    }))

    const callbacks = {
        onSubmit: (value, id, index) => {
            if (id != articleID) {
                dispatch(commentActions.addComment(selector.token, value, id, "comment", index, selector.user?.profile?.name));
            } else {
                dispatch(commentActions.addComment(selector.token, value, articleID, "article", index, selector.user?.profile?.name));
            }
        }
    }

    const handleLogin = () => {
        navigate('/login', { state: { back: location.pathname } });
    }

    useEffect(() => {
        dispatch(commentActions.loadComment(articleID));
    }, [])


    return <div className="list-comment">
        <div className="list-comment__content">
            <div className="list-comment__title">Комментарии ({selectorRedux.list?.length})</div>
            <div className="list-comment__list">
                {selectorRedux.list?.map((v, i) => (
                    <Comment data={v} key={i} index={i} submit={callbacks.onSubmit} replyСomment={true} activeComment={activeComment} setActiveComment={setActiveComment} token={selector.token} username={selector.user?.profile?.name} />
                ))}
            </div>
            {selector.token != null
                ? activeComment == -1 && <InputComment submit={callbacks.onSubmit} id={articleID} index={selectorRedux.list.length} />
                : activeComment == -1 && <p className="list-comment__no-login"><a onClick={() => handleLogin()}>Войдите</a>, чтобы иметь возможность комментировать</p>
            }
        </div>
    </div>
}

export default ListComments;