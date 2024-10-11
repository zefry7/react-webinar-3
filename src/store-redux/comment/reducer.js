import createTree from "../../utils/createTree";

// Начальное состояние
export const initialState = {
    list: []
};

// Обработчик действий
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'comment/addComment':
            let list = createTree([...state.list, action.value.item])
            return { ...state, list: list };
        case 'comment/loadComment':
            return { ...state, list: action.value };
        default:
            return state;
    }
}

export default reducer;