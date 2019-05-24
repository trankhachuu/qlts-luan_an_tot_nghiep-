import React, { Component } from 'react';
import "./biennhan.css";
import { Row, Col } from 'antd';
import { getAllThietBiByPhieuBanGiao, getAllPhieuLuanChuyenThietBi } from '../../../Services/api';
import moment from 'moment';
import ReactToPrint from 'react-to-print';


class HoaDonBanGiao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            thongTinHoaDon: {},
            danhSachThietBi: [],
            key: null,
        }
    }

    componentDidMount = async () => {
        let phieus = await getAllPhieuLuanChuyenThietBi();
        let key = this.props.match.params.id;
        this.setState({
            key: key
        })
        let data = await getAllThietBiByPhieuBanGiao(key);
        this.setState({
            danhSachThietBi: data
        });
        if (phieus) {
            var phieuSelect = phieus.find(element => {
                return key === element.maBanGiao
            });
            if (typeof phieuSelect === 'object') {
                this.setState({
                    thongTinHoaDon: phieuSelect
                })
            }
        }

    }

    render() {
        let { thongTinHoaDon, danhSachThietBi } = this.state;
        return (
            <div>
                <div className="header">
                    <Row>
                        <Col span={10} style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '20px' }}>Công ty ....</span><br />
                            <span>Địa chỉ....</span>
                        </Col>
                        <Col span={14}>
                            <h2 style={{ textAlign: 'center' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </h2>
                            <h3 style={{ textAlign: 'center' }}>Độc lập - Tự do - Hạnh Phúc</h3>
                            <span style={{ float: "right", marginRight: '50px' }}>Hôm nay ngày {moment(thongTinHoaDon.ngayBanGiao).format('DD')} tháng {moment(thongTinHoaDon.ngayBanGiao).format('MM')} năm {moment(thongTinHoaDon.ngayBanGiao).format('YYYY')}</span>
                        </Col>
                    </Row>
                </div>
                <h3 style={{ textAlign: 'center', marginTop: '20px' }}>BIÊN BẢN BÀN GIAO</h3>
                <div className="container">
                    <p><b style={{ fontSize: '14px' }}>Bàn giao bởi :</b> {thongTinHoaDon.tenNguoiBanGiao}</p>
                    <p><b>Ngày biên nhận :</b> {moment(thongTinHoaDon.ngayBanGiao).format('DD/MM/YYYY')}</p>
                    <p><b>Nội dung bàn giao: </b> {thongTinHoaDon.noiDungBanGiao}</p>
                    <p>Danh sách thiết bị chi tiết bao gồm: </p>

                    <div className="table_tb">
                        <table key={1}>
                            <tr>
                                <th>Mã thiết bị</th>
                                <th>Tên thiết bị</th>
                                <th>Khấu hao</th>
                                <th>Bảo hành</th>
                                <th>Ngày nhập</th>
                                <th>Trạng thái</th>
                                <th>Giá trị</th>

                            </tr>
                            {danhSachThietBi.map(element => {
                                return (<tr>
                                    <td>{element.maTB}</td>
                                    <td>{element.tenThietBi}</td>
                                    <td>{element.khauHao}</td>
                                    <td>{element.baoHanh}</td>
                                    <td>{moment(element.ngayNhap).format('DD/MM/YYYY')}</td>
                                    <td>{element.trangThai}</td>
                                    <td>{element.giaTri}</td>
                                </tr>)
                            })}
                        </table>
                    </div>
                    <p style={{ marginTop: '20px' }}>người bàn giao xác nhận chữ ký để xác thực đã bàn giao thiết bị</p>
                    <Row style={{ marginTop: '40px' }}>
                        <Col span={12} style={{ textAlign: 'center' }}>
                            <h4>NGƯỜI BÀN GIAO</h4>
                            <p>(Ký nghi rõ họ tên)</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

// class ComponentToPrint extends React.Component {
//     render() {
//         return (
//             <div>
//                 <ReactToPrint
//                     trigger={() => <a href="#">Print this out!</a>}
//                     content={() => this.componentRef}
//                 />
//                 <HoaDonBanGiao ref={el => (this.componentRef = el)} />
//             </div>
//         );
//     }
// }

export default HoaDonBanGiao;