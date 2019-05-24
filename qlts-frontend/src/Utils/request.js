import axios from 'axios'
import { getToken, removeToken } from '../Utils/token'
import history from './history'
import { message } from 'antd';

// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:8080/', // api base_url
    timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    let token = getToken()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token // Json web token-- ['X-Token']
    }
    return config;
}, error => {
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (response.status !== 200) {
            message.error(res.msg);
            return Promise.reject(res.msg);
        } else {
            if (response.config.pgtype === 'login') {
                let authorization = response.headers.authorization
                let jwt = authorization.substring(7);
                message.success("Đăng nhập thành công");
                return jwt;
            } else {
                if (response.config.method === 'post') {
                    message.success("Thêm thành công.");
                }
                else if (response.config.method === 'put')
                    message.success("Cập nhật thành công.");
                else if (response.config.method === 'delete')
                    message.success("Xòa thành công.");
                return response.data;
            }
        }
    },
    error => {
        // loading.hide(error.config)
        if (error.response && error.response.status === 400) {
            switch (error.response.data.message) {
                case 'OBJECT_EXISTS':
                    message.error('Bảng ghi có mã đã tồn tại!');
                    break;
                case 'ID_NOT_EXISTS':
                    message.error('Mã không tồn tại!');
                    break;
                case 'NOT_CHANGE_TT':
                    message.error('Trùng tình trạng thiết bị!');
                    break;
                case 'NON_ITEM_IN_LIST':
                    message.error('Không có thiết bị trong danh sách!');
                    break;
                case 'LUAN_CHUYEN_CONFLICT_DENNGAY':
                    message.error('Lổi update thiết bị cũ!');
                    break;
                    case 'NHAN_VIEN_DA_SO_HUU_THIETBI':
                    message.error('Thiết bị đã được sở hữu!');
                    break;
                default:
                    message.error('Lổi không sác định');
                    break;
            }

        } else if (error.response && error.response.status === 401) {
            removeToken();
            if (error.config.url.indexOf("logout") === -1) {
                message.error('Hết phiên làm việc, đăng nhập lại!');
            }
            setTimeout(() => {
                history.push('/login')
            }, 1000)

        } else if (error.response && error.response.status === 500) {
            switch (error.response.data.message) {
                case 'ID_NOT_EXISTS':
                    message.error('User không tồn tại');
                    history.push('/app/error404')
                    break;
                default:
                    message.error('Lổi hệ thống!');
                    break;
            }

        } else if (error.message && error.message.indexOf("timeout") > -1) {
            message.error('Máy chủ không phản hồi!');
        }
        else if (error.response && error.response.status === 403) {
            message.error('Phiên làm việc hết hạn!');
            removeToken();
            history.push('/login');
        }
        else if (error === "404") {
            message.error('Yêu cầu không được cho phép!');

        }
        else {
            message.error('Không có kết nối!');
            history.push('/error-connect')
        }
        return Promise.reject(error)
    })

export default service
