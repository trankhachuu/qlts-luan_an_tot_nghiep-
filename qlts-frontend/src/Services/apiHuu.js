import request from "../Utils/request";

// API lấy tất cả tinh trang
export function getAllTinhTrang() {
    return request({
        url: '/infor/list-tinhtrang',
        method: 'GET'
    })
}

//API thêm mới tinh trang
export function addNewTinhTrang(data){
    return request({
        url: '/infor/add-tinhtrang',
        method: 'POST',
        data: data
    })
}

//API cập nhật user
export function updateTinhTrang(data){
    return request({
        url: '/infor/update-tinhtrang',
        method: 'PUT',
        data: data
    })
}

//API xóa user
export function deleteTinhTrang(id){
    return request({
        url: '/infor/delete-tinhtrang/' + id,
        method: 'DELETE',
    })
}

//API xóa theo list
export function deleteByListTinhTrang(lst){
    return request({
        url: '/infor/delete-by-list',
        method: 'DELETE',
        data: lst
    })
}
// API lấy tất cả các nhân viên
export function getAllNhanVien() {
    return request({
        url: '/infor/list-employeeUpdate',
        method: 'GET'
    })
}

//API thêm mới nhan vien
export function addNewNhanVien(data){
    return request({
        url: '/infor/add-employee',
        method: 'POST',
        data: data
    })
}

//API cập nhật nhan vien
export function updateNhanVien(data){
    return request({
        url: '/infor/update-employee',
        method: 'PUT',
        data: data
    })
}

//API xóa nhan vien
export function deleteNhanVien(id){
    return request({
        url: '/infor/delete-employee/' + id,
        method: 'DELETE',
    })
}

///////////////////////
// crud barng chuc vu
export function getAllChucVu(){
    return request({
        url: '/infor/listAllChucVu',
        method: 'GET',
    })
}
////////////////////
// crud list All phong ban
export function getAllPhongBan(){
    return request({
        url: '/infor/listAllPhongBan',
        method: 'GET',
    })
}

//API xóa theo list
export function deleteByListNhanVien(lst){
    return request({
        url: '/infor/delete-by-listNhanVien',
        method: 'DELETE',
        data: lst
    })
}

// crud list All phong ban
export function getAllDonViTinh(){
    return request({
        url: '/infor/listAllDonViTinh',
        method: 'GET',
    })
}

export function addNewDonViTinh(data)
{
    return request({
        url : '/infor/add-newdonvitinh',
        method : 'POST', 
        data : data
    })
}

export function updateDonViTinh(data){
    return request({
        url : '/infor/update-donviinh',
        method : 'PUT', 
        data : data
    });
}

export function deleteDonViTinh(id){
    return request({
        url : '/infor/delete-donvitinh/'+ id, 
        method : 'DELETE'
    });
}

export function deleteByListDonViTinh(list){
    return request({
        url : '/infor/delete-list-donvitinh',
        method : 'DELETE', 
        data : list
    });
}////////////////////////////////////////////////////////
// crud list All chi tiet yeu cau
export function getAllChiTietYeuCau(){
    return request({
        url: '/infor/listAllctyc',
        method: 'GET',
    })
}

export function addNewPhieuYeuCau(data){
    return request({
        url : '/infor/add-phieuyeucau',
        method : 'POST', 
        data : data
    });
}
// get phiếu yêu cầu theo id
export function getByIdPhieuYeuCau(id){
    return request({
        url : '/infor/getByIdPhieuYeucau/' + id,
        method : 'GET', 
    });
}
// lấy tất cả phiếu yêu cầu
export function getAllPhieuYeucau(){
    return request({
        url : '/infor/getAllPhieuYeuCau', 
        method : 'GET'
    });
}
// lay chi tiet theo BYid
export function getAllByIdPhieuYeucau(id){
    return request({
        url : '/infor/getAllByIdPhieu/' + id, 
        method : 'GET'
    });
}

export function getAllLoaiThietBi(){
    return request({
        url : '/infor/listAllloaiTb', 
        method : 'GET'
    });
}

export function getAllLoaiTbPhongBan(id){
    return request({
        url : '/infor/getThietBiIdPhongBan/' + id, 
        method : 'GET'
    });
}

export function getThietBiTheoLoai(IDPhongBan, IDLoai){
    return request({
        url : '/infor/listThietBiIdPhongBanIdLoai/' + IDPhongBan + '/' + IDLoai, 
        method : 'GET'
    });
}

export function getDanhSachThietBi(){
    return request({
        url : '/infor/listallDanhSachTB', 
        method : 'GET'
    });
}

export function getNhanVienThietBi(){
    return request({
        url : 'infor/listAllNhanVienThietBi', 
        method : 'GET'
    });
}
// update nhan vien theo thiet bi
export function updateNhanVienRefThietBi(data){
    return request({
        url : '/infor/update-nhanvien-ref-thietbi',
        method : 'PUT', 
        data : data
    });
}
// nhan vien thoe phong ban
export function getNhanVienRefPhongBan(id){
    return request({
        url : 'infor/listNhanVienRefPhongBan/' + id, 
        method : 'GET'
    });
}


// get list thiet bi cua nhan vien
export function getThietBiOfNhanVien(id){
    return request({
        url : 'infor/get-lst-thietbi-of-nhanvien/' + id, 
        method : 'GET'
    });
}

// get all thiết bi
export function getAllThietBi(){
    return request({
        url : 'infor/listAllThietBi', 
        method : 'GET'
    });
}
// get thiết bị đã thanh lý
export function getAllThietBiByPhieuThanhLy(){
    return request({
        url : 'infor/listallThietBiByPhieuThanhLy', 
        method : 'GET'
    });
}
// get thiết bị trong kho
export function getAllThietBiByTinhTrang(){
    return request({
        url : 'infor/listallThietBiByTinhTrang', 
        method : 'GET'
    });
}

// lấy danh sách thiết bị theo mã nhân viên 
export function getThietBiRefNhanVien(id){
    return request({
        url : 'infor/list-thietbi-by-nhanvien/' + id, 
        method : 'GET'
    });
}