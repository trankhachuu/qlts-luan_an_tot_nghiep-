import request from "../Utils/request";

// Quản lý nhà cung cấp

export function getAllNhacungcap() {
    return request({
        url: 'nhacungcap/getall',
        method: 'GET'
    })
}
export function addNewNhacungcap(data) {
    return request({
        url: 'nhacungcap/add-nhacungcap',
        method: 'POST',
        data: data
    })
}
export function updateNhacungcap(data) {
    return request({
        url: 'nhacungcap/update-nhacungcap',
        method: 'PUT',
        data: data
    })
}
export function deleteNhacungcap(id) {
    return request({
        url: 'nhacungcap/delete/' + id,
        method: 'DELETE'
    })
}
export function deletebylistncc(ltsdvt) {
    return request({
        url: 'nhacungcap/delete-by-list',
        method: 'DELETE',
        data: ltsdvt
    })
}

export function getallphongban() {
    return request({
        url: 'phongban/getall-phongban',
        method: 'GET'
    })
}

export function getallnhanvien() {
    return request({
        url: 'infor/listAllNhanVien',
        method: 'GET'
    })
}

export function getallnhanvienByPhongBan(idPhongBan) {
    return request({
        url: 'infor/listAllNhanVienByPhongBan/' + idPhongBan,
        method: 'GET'
    })
}



export function getttthietbi(id) {
    return request({
        url: 'nhacungcap/gettenthietbi/' + id,
        method: 'GET'
    })
}
