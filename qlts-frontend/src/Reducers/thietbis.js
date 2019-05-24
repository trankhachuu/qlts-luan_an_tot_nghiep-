import * as Types from './../Reducers/constants/actionTypes'; 

var initialStateThietBi = [
];

const thietbi = (state = initialStateThietBi , action) => {
    switch(action.type){
        case Types.FETCH_THIETBI : 
            state = action.thietbis;
            return [...state];
        default : return state;
    }
}

export default thietbi;
