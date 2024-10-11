import createTree from "../../utils/createTree";


export default {
    loadComment: id => {
        return async (dispatch, getState, services) => {
            let resp = await fetch(`/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`)
            let data = await resp.json()
            const res = createTree(data.result.items, id)
            console.log(res);

            dispatch({ type: 'comment/loadComment', value: res });
        };
    },
    addComment: (token, value, id, type, index, username) => {
        return async (dispatch, getState, services) => {
            let resp = await fetch("/api/v1/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Token": token
                },
                body: JSON.stringify({
                    "text": value,
                    "parent": { "_id": `${id}`, "_type": type }
                })
            })
            let data = await resp.json()

            data.result.name = username

            dispatch({ type: 'comment/addComment', value: { item: data.result, index: index } });
        };
    }
};