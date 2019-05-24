import * as Types from './../constants/actionTypes';

export const actFetchPhongBans = (phongbans) => {
    return {
        type : Types.FETCH_PHONGBAN, 
        phongbans
    }
}

export const actFetchThietBi = (thietbis) => {
    return {
        type : Types.FETCH_THIETBI, 
        thietbis
    }
}