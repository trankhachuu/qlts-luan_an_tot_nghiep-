// validate data
import moment from 'moment';
import { type } from 'os';

export function handleCheckKhauHao(rule, value, callback) {
    if (value >= 1) {
        callback("Không được lớn hơn 1");
    }
    callback()
}

export function handleCheckSoLuong(rule, value, callback) {
    if (value > 200) {
        callback("Giới hạn 200 thiết bị");
    }
    callback()
}

export function handleCheckDonGia(rule, value, callback) {
    if (value < 0) {
        callback("Đơn giá không âm");
    }
    callback()
}

export function handleCheckBaoHanh(rule, value, callback) {
    if (value > 240) {
        callback("Giới hạn 20 năm (240 tháng)!!");
    }
    callback()
}

export function handleCHeckInputCode(rule, value, callback) {
    if (Number.isInteger(parseInt(value)) === false) {
        callback("Yều cầu số !");
    }
    callback()
}

export function checkKyTuDacBiet(rule, value, callback) {
    var format = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    var checkForSpecialChar = function (value) {
        for (var i = 0; i < format.length; i++) {
            if (value.indexOf(format[i]) > -1) {
                return true;
            }
        }
        return false;
    }
    if (checkForSpecialChar(value)) {
        callback("Chuối không chứa kỹ tự đặc biệt");
    }else{
        callback();
    }
}

export function checkDaiQua10KyTu(rule, value, callback) {
    if (value.length > 10) {
        callback("Yêu cầu nhập nhỏ hơn 10 ký tự");
    }
    else{
        callback();
    }
}
export function checkDaiQua5KyTu(rule, value, callback) {
    if (value.length > 5) {
        callback("Yêu cầu nhập nhỏ hơn 5 ký tự");
    }
    else{
        callback();
    }
}

export function checkDaiQua3KyTu(rule, value, callback) {
    if (value.length > 3) {
        callback("Yêu cầu nhập nhỏ hơn 3 ký tự");
    }
    else{
        callback();
    }
}

export function checkDaiQua2KyTu(rule, value, callback) {
    if (value.length > 2) {
        callback("Yêu cầu nhập nhỏ hơn 2 ký tự");
    }
    else{
        callback();
    }
}

export function checkDaiQua50KyTu(rule, value, callback) {
    if (value.length > 50) {
        callback("Yêu cầu nhập nhỏ hơn 50 ký tự");
    }
    else{
        callback();
    }
}

export function checkDaiQua100KyTu(rule, value, callback) {
    if (value.length > 100) {
        callback("Yêu cầu nhập nhỏ hơn 100 ký tự");
    }
    else{
        callback();
    }
}

export function checkDaiQua128KyTu(rule, value, callback) {
    if (value.length > 128) {
        callback("Yêu cầu nhập nhỏ hơn 128 ký tự");
    }
    else{
        callback();
    }
}

export function checkDaiQua255KyTu(rule, value, callback) {
    if (value.length > 255) {
        callback("Yêu cầu nhập nhỏ hơn 255 ký tự");
    }
    else{
        callback();
    }
}
export function checkNgaySinh(rule, value, callback) {
    var date = new Date();
    if (value == date || date < value ) {
        callback("Ngày sinh không hợp lệ");
    }
    else{
        callback();
    }
}

export function checknotNegative(rule, value, callback) {
    if (value < 1) {
        callback("Yêu cầu nhập lại");
    }
    else{
        callback();
    }
}

export function checknotAm(rule, value, callback) {
    if (value < 0) {
        callback("không nhập số âm");
    }
    else{
        callback();
    }
}


export function checknotString(rule, value, callback) {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        callback();
    }
    else{
        callback("Không nhập kiểu chữ");
    }
}
