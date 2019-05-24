import request from "../Utils/request";


// API lấy tất cả chúc vụ
export function getAllChucvu() {
    return request({
        url: '/chucvu/listchucvu ',
        method: 'GET'
    })
}

export function addNewChucvu(data) {
    return request({
        url: '/chucvu/add-chucvu',
        method: 'POST',
        data: data
    })
}

export function updateChucvu(data) {
    return request({
        url: '/chucvu/update-chucvu',
        method: 'PUT',
        data: data
    })
}
export function deleteChucVu(id) {
    return request({
        url: '/chucvu/delete-Chucvu/' + id,
        method: 'DELETE'
    })
}

export function deleteByListcv(lst) {
    return request({
        url: '/chucvu/deletebylist',
        method: 'DELETE',
        data: lst
    })
}

// API Lấy tất cả ĐVT
export function getALLDonvitinh() {
    return request({
        url: '/donvitinh/listdvt',
        method: 'GET'
    })
}

export function addNewDonvitinh(data) {
    return request({
        url: '/donvitinh/add-dvt',
        method: 'POST',
        data: data
    })
}
export function updateDonvitinh(data) {
    return request({
        url: '/donvitinh/updatedvt',
        method: 'PUT',
        data: data
    })
}

export function deleteDonvitinh(id) {
    return request(
        {
            url: '/donvitinh/xoa-dvt/' + id,
            method: 'DELETE'
        }
    )
}

export function deleteByListdvt(lstdvt) {
    return request({
        url: '/donvitinh/xoadvtbylist',
        method: 'DELETE',
        data: lstdvt
    })
}

export function getAllloaiTBbyid(id) {
    return request({
        url: '/nhacungcap/listloaitb/' + id,
        method: 'GET',

    })
}

export function getAllloaitb() {
    return request({
        url: '/loaitb/listtb',
        method: 'GET'
    })
}

export function getbyIdNCC(idNcc, idLoai) {
    return request({
        url: '/thietbi/get-tb-by-ncc/' + idNcc + "/" + idLoai,
        method: 'GET'
    })
}

export function gettenloai(mancc, maloai) {
    return request({
        url: '/nhacungcap/listalltb/' + mancc + '/' + maloai,
        method: 'GET'
    })
}

export function gettenloaitbcha() {
    return request({
        url: '/loaitb/listtbcha',
        method: 'GET'
    })
}

export function addloaitb(data) {
    return request({
        url: '/loaitb/addloaitb',
        method: 'POST',
        data: data
    })
}

export function updateloaitb(data) {
    return request({
        url: '/loaitb/updateloaitb',
        method: 'PUT',
        data: data
    })
}

export function gettenloaibymaloai(id) {
    return request({
        url: '/loaitb/gettentbbyloaitb/' + id,
        method: 'GET'
    })
}

export function deletetliaotbbyID(id)
{
    return request({
        url:'/loaitb/xoabyID/' + id,
        method:'DELETE'
    })
}

export function deletebylistloaitb(lsttb)
{
    return request({
        url:'/loaitb/xoatheolist',
        method:'DELETE',
        data: lsttb
    })
}

export function banGiaoThietBi(data) {
    return request({
        url: '/thietbi/ban-giao-thiet-bi',
        method: 'POST',
        data: data
    })
}