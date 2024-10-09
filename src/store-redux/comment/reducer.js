// Начальное состояние
export const initialState = {
    list: []
};

// Обработчик действий
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'comment/addComment':
            return { ...state, list: [...state.list, action.value] };
        case 'comment/loadComment':
            return { ...state, list: action.value };
        default:
            return state;
    }
}

export default reducer;