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

    setCategoryList(list) {
        this.setState({ ...this.getState(), categoryList: [{ value: "all", title: "Все" }, ...list] })
    }

}

export default CategoryState;