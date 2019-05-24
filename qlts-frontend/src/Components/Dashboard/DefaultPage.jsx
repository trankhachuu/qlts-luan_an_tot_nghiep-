import React, { Component } from 'react';
import {
    PieChart, Pie, Tooltip,
} from 'recharts';
import { Col, Row, List, Avatar } from 'antd';
import { getNotificationAll, getTongThietBi, getTongNhaCungCap, getTongNhanVien, getTongPhongBan } from '../../Services/api';
import { Link } from 'react-router-dom';

var dateFormat = require('dateformat');

class DefaultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: null,
            tongThietBi: null, 
            tongNhaCungCap : null, 
            tongNhanVien : null,
            tongPhongBan : null,
        }
    }

    componentDidMountFace = async () => {
        let data = await getNotificationAll();
        let tongThietBi = await getTongThietBi();
        let tongNhaCungCap = await getTongNhaCungCap();
        let tongNhanVien = await getTongNhanVien();
        let tongPhongBan = await getTongPhongBan();
        this.setState({ notifications: data,
                tongThietBi: tongThietBi,
                tongNhaCungCap : tongNhaCungCap, 
                tongNhanVien : tongNhanVien, 
                tongPhongBan : tongPhongBan
             });
    }

    componentDidMount() {
        this.componentDidMountFace();
    }

    bieuBoTron = () => {
        const data01 = [
            { name: 'Thiết bị mới', value: 400 },
            { name: 'Thiết bị đang sửa chữa', value: 300 },
            { name: 'Thiết bị đã thanh lý', value: 300 }
        ];

        return (
            <PieChart width={350} height={350}>
                <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={120} fill="#8884d8" label />
                <Tooltip />
            </PieChart>
        )
    }

    getRedirect = (item) => {
        if (item.notificationType === "NOTIFI_NHAPKHO")
            return <Link to={`/app/dsphieubiennhan/${item.code}`}>{`${dateFormat(new Date(item.createDate), "dd/mm/yyyy")} - ${item.createTime}`}</Link>

        if (item.notificationType === "NOTIFI_LUANCHUYEN")
            return <Link to={`/app/phieubangiao/${item.code}`}>{`${dateFormat(new Date(item.createDate), "dd/mm/yyyy")} - ${item.createTime}`}</Link>

        if (item.notificationType === "NOTIFI_BAOTRI")
            return <Link to={`/app/dsphieubaotri/${item.code}`}>{`${dateFormat(new Date(item.createDate), "dd/mm/yyyy")} - ${item.createTime}`}</Link>

        if (item.notificationType === "NOTIFI_BANGIAO")
            return <Link to={`/app/phieubangiao/${item.code}`}>{`${dateFormat(new Date(item.createDate), "dd/mm/yyyy")} - ${item.createTime}`}</Link>
    }

    getAvatar = (item) => {
        if (item.notificationType === "NOTIFI_NHAPKHO")
            return <Avatar src="https://wwin.vn/wp-content/uploads/2019/01/wms-icon-manage-ex.png" />

        if (item.notificationType === "NOTIFI_LUANCHUYEN")
            return <Avatar src="https://banner2.kisspng.com/20180421/hse/kisspng-computer-icons-circle-rotation-line-5adb96c7e3f159.2688315815243404239337.jpg" />

        if (item.notificationType === "NOTIFI_BAOTRI")
            return <Avatar src="http://minhphatphoto.vn/wp-content/uploads/2017/04/maintenance.png" />

        if (item.notificationType === "NOTIFI_BANGIAO")
            return <Avatar src="http://vinamachines.com/wp-content/uploads/2017/04/arrow-right-3-512.png" />
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div style={{ background: 'linear-gradient(141deg, #a5fa9a 0%, #68ec73 51%, #35e78e 75%)' }} className="tile-stats tile-white stat-tile">
                        <h3 style={{fontSize: '35px'}}>{this.state.tongThietBi !== null ? `${this.state.tongThietBi}` : 'Load...'}</h3>
                        <p style={{ fontSize: '15px' }}>Tổng số thiết bị hiện có</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div style={{ background: 'linear-gradient(141deg, #aaeff5 0%, #a5eee9 51%, #79d5f1 75%)' }} className="tile-stats tile-white stat-tile">
                    <h3 style={{fontSize: '35px'}}>{this.state.tongNhaCungCap !== null ? `${this.state.tongNhaCungCap}` : 'Load...'}</h3>
                        <p style={{ fontSize: '15px' }}>Tổng nhà cung cấp hiện có</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div style={{ background: 'linear-gradient(141deg, #ecdec3c4 0%, #e6d4b2c9 51%, #f3eca8 75%)' }} className="tile-stats tile-white stat-tile">
                    <h3 style={{fontSize: '35px'}}>{this.state.tongNhanVien !== null ? `${this.state.tongNhanVien}` : 'Load...'}</h3>
                        <p style={{ fontSize: '15px' }}>Tổng số nhân viên đang làm việc</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div style={{ background: 'linear-gradient(141deg, #e48271 0%, #ee6f58 51%, #ec3f28 75%)' }} className="tile-stats tile-white stat-tile">
                    <h3 style={{fontSize: '35px'}}>{this.state.tongPhongBan !== null ? `${this.state.tongPhongBan}` : 'Load...'}</h3>
                        <p style={{ fontSize: '15px' }}>Tổng số phòng ban đang có</p>
                    </div>
                </div>
                <Row>
                    <Col span={15} style={{ padding: '16px' }}>
                        <div className="thongbao_home" style={{ overflowY: 'scroll', height: 'calc(100vh - 320px)' }}>
                            <div style={{borderBottom: 'solid 2px #8df1d8', textTransform: 'uppercase'}}><h3>Thông báo</h3></div>
                            {
                                this.state.notifications !== null
                                    ?
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={this.state.notifications}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={this.getAvatar(item)}
                                                    title={this.getRedirect(item)}
                                                    description={`${item.createUser} đã ${item.contents}`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    :
                                    'Chưa có thông báo nào'
                            }
                        </div>
                    </Col>
                    <Col span={9} style={{ height: '100%', paddingLeft: '10px' }}>
                        {this.bieuBoTron()}
                    </Col>
                </Row>

            </div>
        );
    }
}

export default DefaultPage;

//NOTIFI_NHAPKHO
//NOTIFI_BAOTRI
//NOTIFI_LUANCHUYEN
//NOTIFI_BANGIAO