import request from "../Utils/request";

//lay tat ca phong ban
export function getAllPhongBan() {
    return request({
        url: '/phongban/getall-phongban',
        method: 'GET'
    })
}

// them moi phong ban
export function addNewPhongBan(data){
    return request({
        url: '/phongban/add-phongban',
        method: 'POST',
        data: data
    })
}

// cap nhap phong ban
export function updatePhongBan(data){
    return request({
        url: '/phongban/update-phongban',
        method: 'PUT',
        data: data
    })
}

//API xóa phong ban
export function deletePhongBan(id){
    return request({
        url: '/phongban/delete-phongban/' + id,
        method: 'DELETE',
    })
}

//API xóa theo list
export function deleteByListPhongBan(lst){
    return request({
        url: '/phongban/delete-by-list',
        method: 'DELETE',
        data: lst
    })
}