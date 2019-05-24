var initialState = [
    {
        name: "Dashboad",
        icon: "none"
    }
];

const path = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PATH':
            return action.item;
        default: return [...state];
    }
}

export default path;