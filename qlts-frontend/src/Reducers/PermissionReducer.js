var initialState = [
    
]

const PermissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PERMISSION':
            return action.item;
        default: return state;
    }
}

export default PermissionReducer;