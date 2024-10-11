export default function createTree(res, id) {
    let arr = []
    const map = new Map()
    const check = new Set()

    map.set(id, [])

    function ttt(mass, tab) {
        for (let i = 0; i < mass?.length; ++i) {
            if (!check.has(mass[i]._id)) {
                arr.push({ ...mass[i], tab: tab })
                check.add(mass[i]._id)
            }
            if (map.has(mass[i]._id))
                ttt(map.get(mass[i]._id), tab + 1 < 10 ? tab + 1 : tab)
        }
    }

    for (let i = 0; i < res?.length; ++i) {
        if (map.has(res[i].parent._id)) {
            map.set(res[i].parent._id, [...map.get(res[i].parent._id), res[i]])
        } else {
            map.set(res[i].parent._id, [res[i]])
        }
    }


    for (let x of map.keys()) {
        ttt(map.get(x), 0)
    }

    return arr
}