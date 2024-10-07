import StoreModule from "../module";

class CategoryState extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            categoryList: [{ value: "all", title: "Все" }],
        };
    }

    async fetchCategory() {
        const respone = await fetch("/api/v1/categories?fields=_id,title,parent(_id)&limit=*")
        const json = await respone.json()

        let res = []
        let arr = []
        let map = new Map()

        for (const x of json.result.items) {
            map.set(x._id, { title: x.title, parent: x.parent?._id || null })
        }

        for (const x of json.result.items) {
            if (map.get(x._id).parent != null) {
                arr.push([{ title: map.get(map.get(x._id).parent).title, id: map.get(x._id).parent }, { title: x.title, id: x._id }])
            } else {
                arr.push([null, { title: x.title, id: x._id }])
            }
        }

        function ttt(value, line) {
            res.push({ title: line + "" + value.title, value: value.id })
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i][0]?.title == value.title) {
                    ttt(arr[i][1], line + "- ")
                }
            }
        }

        for (let i = 0; i < arr.length; ++i) {
            if (arr[i][0] == null) {
                ttt(arr[i][1], "")
            }
        }

        this.setState({ ...this.getState(), categoryList: [{ value: "all", title: "Все" }, ...res] })
    }

}

export default CategoryState;