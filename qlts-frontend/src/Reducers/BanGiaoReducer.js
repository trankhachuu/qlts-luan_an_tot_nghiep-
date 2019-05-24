var initialState = {
    lst2: []
}

const lstBanGiao = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_THIETBI_BANGIAO':
            return action.item;
        default: return state;
    }
}

export default lstBanGiao;