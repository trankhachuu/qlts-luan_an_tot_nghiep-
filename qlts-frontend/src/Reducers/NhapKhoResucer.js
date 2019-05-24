var initialState = []

const nhapkho = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NHAPKHO_DATA':
            return action.item;
        case 'ADD_ITEM_TO_LST_NHAP':
            return [...state, action.item];
        case 'UPDATE_ITEM_TO_LST_NHAP':
            console.log(action.item)
            var key = action.item.maNhomThietBi;
            var lstMoi = state.filter(element => {
                return element.maNhomThietBi !== key
            });
            let lstMoi2 = [...lstMoi, action.item]
            return lstMoi2;
        default: return state;
    }
}

export default nhapkho;