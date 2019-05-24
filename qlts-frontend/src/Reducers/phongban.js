import * as Types from './../Reducers/constants/actionTypes'; 

var initialStatePhongBan = [
];

const phongban = (state = initialStatePhongBan , action) => {
    switch(action.type){
        case Types.FETCH_PHONGBAN : 
            state = action.phongbans;
            return [...state];
        default : return [...state];
    }
}

export default phongban;