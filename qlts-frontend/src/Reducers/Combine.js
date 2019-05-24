import { combineReducers } from 'redux';
import config from './ConfigReducer';
import path from './PathReducer';
import PermissionReducer from './PermissionReducer';
import lstBanGiao from './BanGiaoReducer';
import phongban from './phongban';
import thietbis from './thietbis';
import nhapkho from './NhapKhoResucer';

const reduces = combineReducers({
    config,
    path,
    PermissionReducer,
    lstBanGiao,
    phongban,
    thietbis,
    nhapkho
});

export default reduces;