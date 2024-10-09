export default {
    loadComment: id => {
        return async (dispatch, getState, services) => {
            let resp = await fetch(`/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`)
            let data = await resp.json()
            const res = data.result.items

            let arr = []
            const map = new Map()
            const check = new Set()

            map.set(id, [])

            function ttt(mass, tab) {
                for (let i = 0; i < mass?.length; ++i) {
                    if (!check.has(mass[i]._id)) {
                        arr.push({...mass[i], tab: tab})
                        check.add(mass[i]._id)
                    }
                    if (map.has(mass[i]._id))
                        ttt(map.get(mass[i]._id), tab + 1)
                }
            }

            for (let i = 0; i < res.length; ++i) {
                if (map.has(res[i].parent._id)) {
                    map.set(res[i].parent._id, [...map.get(res[i].parent._id), res[i]])
                } else {
                    map.set(res[i].parent._id, [res[i]])
                }
            }


            for (let x of map.keys()) {
                ttt(map.get(x), 0)
            }

            dispatch({ type: 'comment/loadComment', value: arr });
        };
    },
    addComment: (token, value, id, type) => {
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
        };
    }
};