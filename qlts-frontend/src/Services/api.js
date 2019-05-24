import request from "../Utils/request";


// API đăng nhập hệ thống
export function loginByUsername(username, password) {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return request({
        url: '/login',
        method: 'POST',
        data: formData,
        pgtype: 'login'
    })
}

//API Lấy thông tin user đang đăng nhập
export function getInfoUser() {
    return request({
        url: '/account/get-info-user',
        method: 'GET'
    })
}

//API Lấy thông tin user theo id
export function getInfoUserByID(id) {
    return request({
        url: '/account/get-info-user-by-id/' + id,
        method: 'GET'
    })
}



// API lấy danh sách chức năng trên menu
export function getFunctionMenu() {
    return request({
        url: '/permission/get-function-active/',
        method: 'GET',
    })
}

// API lấy tất cả user
export function getAllUser() {
    return request({
        url: '/account/get-all-user',
        method: 'GET'
    })
}

//API thêm mới user
export function addNewUser(data) {
    return request({
        url: '/account/add-new-user',
        method: 'POST',
        data: data
    })
}

//API cập nhật user
export function updateUser(data) {
    return request({
        url: '/account/update-user',
        method: 'PUT',
        data: data
    })
}

//API xóa user
export function deleteUser(id) {
    return request({
        url: '/account/delete-user/' + id,
        method: 'DELETE',
    })
}

//API xóa theo list
export function deleteByList(lst) {
    return request({
        url: '/account/delete-by-list',
        method: 'DELETE',
        data: lst
    })
}

/////////////////////////////////////////////////
// Crud bảng module
// API lấy tất cả module
export function getAllModule() {
    return request({
        url: '/permission/get-all-module',
        method: 'GET'
    })
}

//API thêm mới module
export function addNewModule(data) {
    return request({
        url: '/permission/add-module',
        method: 'POST',
        data: data
    })
}

//API cập nhật module
export function updateModule(data) {
    return request({
        url: '/permission/update-module',
        method: 'PUT',
        data: data
    })
}

//API xóa module
export function deleteModule(id) {
    return request({
        url: '/permission/delete-module/' + id,
        method: 'DELETE'
    })
}

//API xóa module theo list
export function deleteModuleByList(lst) {
    return request({
        url: '/account/delete-by-list',
        method: 'DELETE',
        data: lst
    })
}

/////////////////////////////////////////////////////
//Crud bảng function
//Get all function by module ID
export function getFunctionByModuleID(id) {
    return request({
        url: '/permission/get-function-by-moduleid/' + id,
        method: 'GET',
    })
}

// Thêm một function
export function addNewFunction(data) {
    return request({
        url: '/permission/add-function',
        method: 'POST',
        data: data
    })
}

//Cập nhật mọt function
export function updateFunction(data) {
    return request({
        url: '/permission/update-function',
        method: 'PUT',
        data: data
    })
}

// Xóa một function theo id
export function deleteFunctionByID(id) {
    return request({
        url: '/permission/delete-function/' + id,
        method: 'DELETE'
    })
}

// delete-function-by-list
export function deleteFunctionByList(lstID) {
    return request({
        url: '/permission/delete-function-by-list',
        method: 'DELETE',
        data: lstID
    })
}

/////////////////////////////////////////////////////
//Crud bảng group
// Lấy tất cả group
export function getAllGroupAndCheck(id) {
    return request({
        url: '/permission/get-all-group-and-check/' + id,
        method: 'GET'
    })
}

export function getAllGroup() {
    return request({
        url: '/permission/get-all-group',
        method: 'GET'
    })
}

// Thêm một group
export function addNewGroup(data) {
    return request({
        url: '/permission/add-group',
        method: 'POST',
        data: data
    })
}

// Cập nhật một group
export function updateGroup(data) {
    return request({
        url: '/permission/update-group',
        method: 'PUT',
        data: data
    })
}

// Xóa một group
export function deleteGroup(id) {
    return request({
        url: '/permission/delete-group/' + id,
        method: 'DELETE'
    })
}

// Lấy tất cả function theo group
export function getAllFunctionByGroupID(id) {
    return request({
        url: '/permission/get-all-function-by-groupid/' + id,
        method: 'GET'
    })
}

// Lấy tất cả function nhóm theo module
export function getAllFunctionGroupByModule() {
    return request({
        url: '/permission/get-function-groupby-moduleid',
        method: 'GET'
    })
}

// Lấy tất cả function nhóm theo module
export function getAllFunctionSelectedByGroup(id) {
    return request({
        url: '/permission/getall-function-by-groupid/' + id,
        method: 'GET'
    })
}

//Update function của group theo group ID
export function updateFunctionByGroupID(data) {
    return request({
        url: '/permission/update-groupfunction-by-list2',
        method: 'POST',
        data: data
    })
}

//Get all function group by group của user
export function getFunctionGroupByGroup(id) {
    return request({
        url: '/permission/get-function-groupby-group/' + id,
        method: 'GET'
    })
}

// update - permission
//Get all function group by group của user
export function updatePermission(data) {
    return request({
        url: '/permission/update-permission/',
        method: 'PUT',
        data: data
    })
}

// update-enable-permission/{userID}
//Cập nhật enable cho permission
export function updateEnablePermission(data, id) {
    return request({
        url: '/permission/update-enable-permission/' + id,
        method: 'PUT',
        data: data
    })
}


// Chức năng nhập kho 
// API lấy danh sách nhà cung cấp
export function getAllNhaCungCap() {
    return request({
        url: '/nhap-kho/get-all-ncc',
        method: 'GET'
    })
}

// API lấy tất cả đơn vị tính get-all-dvt
export function getAllDonViTinh() {
    return request({
        url: '/nhap-kho/get-all-dvt',
        method: 'GET'
    })
}

// API lấy tất cả các tên thiết bị có trong cơ sở dữ liệu
export function getAllTenThietBiExits() {
    return request({
        url: '/nhap-kho/get-loaitb-sub',
        method: 'GET'
    })
}

// API lấy tất cả các tên thiết bị có trong cơ sở dữ liệu theo nhà cung cấp
export function getAllTenThietBiExitsByNCC(maNCC) {
    return request({
        url: '/nhap-kho/get-loaitb-by-ncc/' + maNCC,
        method: 'GET'
    })
}

// API laasy tất cả thiết bị theo loai cha

export function getLoaiConByLoaiCha(maLoaiCha) {
    return request({
        url: "/nhap-kho/get-loaitb-by-loaicha/" + maLoaiCha,
        method: 'GET'
    })
}

// API lấy tất cả các tên thiết bị có trong cơ sở dữ liệu theo nhà cung cấp
export function getLoaiChaByNhaCungCap(maNCC) {
    return request({
        url: '/nhap-kho/get-loaitb-by-ncc/' + maNCC,
        method: 'GET'
    })
}


// API lấy tất cả loai thiết bị cha
export function getAllLoaiThietBi() {
    return request({
        url: '/nhap-kho/get-loaitb-cha',
        method: 'GET'
    })
}

// API lấy max thiet bi lon nhar
export function getMaxIDThietBi() {
    return request({
        url: '/nhap-kho/get-max-id-thiet-bi',
        method: 'GET'
    })
}

//API nhập kho hàng loạt
export function nhapKhoHangLoat(data) {
    return request({
        url: '/nhap-kho/nhap-kho-hang-loat',
        method: 'POST',
        data: data
    })
}


// API get all biên nhận thiết bị
// 
export function getALlBienNhan() {
    return request({
        url: '/bien-nhan/get-all-biennhan-tb',
        method: 'GET'
    })
}

// API get all biên nhận thiết bị
// 
export function getChiTietByBienNhan(key) {
    return request({
        url: '/bien-nhan/get-chitiet-of-biennhan/' + key,
        method: 'GET'
    })
}

//API get theo doix thiet bi
export function theoDoiThietBi(key) {
    return request({
        url: '/thietbi/theo-doi-thietbi/' + key,
        method: 'GET'
    })
}

//API get thong tin chi tiet thiet bi -chuwsc năng theo dõi thiết bị
export function thongTinChiTietThietBi(key) {
    return request({
        url: '/thietbi/get-info-thietbi-td/' + key,
        method: 'GET'
    })
}
// API lấy tất cả loại thiết bị theo mã nhà cung cấp có mã loại cha null
export function getLoaiTBByNhaCungCap(key) {
    return request({
        url: '/loaitb/list-loaitb-bynhacungcap/' + key,
        method: 'GET'
    })
}

// API lấy tất cả phieu ban giao thiet bi
export function getAllPhieuLuanChuyenThietBi() {
    return request({
        url: '/thietbi/get-all-phieu-bangiao',
        method: 'GET'
    })
}

// API lấy tất thiet bi chi tiet tu phieu ban giao
export function getAllThietBiByPhieuBanGiao(keybanGiao) {
    return request({
        url: '/thietbi/get-chitiet-bangiao/' + keybanGiao,
        method: 'GET'
    })
}

// API lất tất cat thông báo
export function getNotificationAll() {
    return request({
        url: '/home/get-all-thongbao',
        method: 'GET'
    })
}


// API lất tổng thiết bị trong kho
export function getTongThietBi() {
    return request({
        url: '/home/get-tong-thietbi',
        method: 'GET'
    })
}
// API lất tổng nhà cung cấp
export function getTongNhaCungCap() {
    return request({
        url: '/home/get-tong-nhacungcap',
        method: 'GET'
    })
}
// API lất tổng nhân viên
export function getTongNhanVien() {
    return request({
        url: '/home/get-tong-nhanvien',
        method: 'GET'
    })
}

// API lất tổng phòng ban
export function getTongPhongBan() {
    return request({
        url: '/home/get-tong-phongban',
        method: 'GET'
    })
}

//API nhập kho hàng loạt
// data : ds mã String
export function thuHoiThietBi(data) {
    return request({
        url: '/thietbi/thu-hoi-thietbi',
        method: 'POST',
        data: data
    })
}

