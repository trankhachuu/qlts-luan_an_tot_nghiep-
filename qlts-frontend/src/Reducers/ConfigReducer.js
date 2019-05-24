var initialState = [

]

const config = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INFO_USER':
            return action.item;
        default: return state;
    }
}

export default config;