import request from '../Utils/request';

// API lấy tất cả tinh trang

export function getAllTinhTrang() {
    return request({
        url : '/baotri/get-all-tinhtrang',
        method: 'GET'
    })
}

// API Laasy thong tin thiet bi

export function getThongTInTHietBi(id) {
    return request({
        url : '/baotri/lay-tt-thiet-bi/' + id,
        method: 'GET'
    })
}

export function lapDanhSachThietBiBaoTri(data) {
    return request({
        url : '/baotri/lap-danh-sach-baotri',
        method: 'POST',
        data: data
    })
}


export function getAllPhieuBaoTri() {
    return request({
        url : '/baotri/get-all-phieu-baotri',
        method: 'GET'
    })
}

export function getChiTietPhieu(key) {
    return request({
        url : '/baotri/get-ct-phieu-baotri/' + key,
        method: 'GET'
    })
}

export function batDauBaoTri(key) {
    return request({
        url : '/baotri/batdau-baotri/' + key,
        method: 'PUT'
    })
}



export function hoanThanhBaoTri(key, data) {
    return request({
        url : '/baotri/hoanthanh-baotri/' + key,
        method: 'PUT', 
        data: data
    })
}


export function getAllNhanVien() {
    return request({
        url : '/baotri/get-all-nhanvien',
        method: 'GET'
    })
}

// 
