import React, { Component } from 'react';
import { List, Avatar, Row, Col, Table, Empty, Select, Spin } from 'antd';

import { getAllPhieuLuanChuyenThietBi, getAllThietBiByPhieuBanGiao } from '../../../Services/api';

import moment from 'moment';
import 'moment/locale/vi';
var dateFormat = require('dateformat');

const { Option } = Select;

class DanhSachLuanChuyen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phieuSelected: null,
            phieus: [],
            phieuChiTiets: [],
            nhanViens: [],
            isLoadding: false,
            maPhieu: '',
            keySelected: '',
            visible: false,   // điều khiển form thêm mới có cho nó hiển thị hay không 
            columns: [{
                title: 'Mã thiết bị',
                dataIndex: 'maTB',
                key: 'maTB',
            }, , {
                title: 'Tên thiết bị',
                dataIndex: 'tenThietBi',
                key: 'tenThietBi',
            }, {
                title: 'Khấu háo',
                dataIndex: 'khauHao',
                key: 'khauHao',
            }, {
                title: 'Ngày nhập',
                key: 'ngayNhap',
                render: (text, record) => {
                    return <div>
                        {dateFormat(new Date(record.ngayNhap), "dd/mm/yyyy")}
                    </div>
                }
            }, {
                title: 'Tình trạng',
                dataIndex: 'trangThai',
                key: 'trangThai',
            }, {
                title: 'Giá trị/1TB',
                key: 'giaTri',
                render: (text, record) => {
                    return <div>
                        {record.giaTri + " VND"}
                    </div>
                }
            }
            ],
            thietBinew: null
        }
    }

    getAllPhieu = async () => {
        let phieus = await getAllPhieuLuanChuyenThietBi();
        this.setState({ phieus: phieus });
    }


    componentDidMoutFace = async () => {
        await this.getAllPhieu();
        await this.setState({
            thietBinew: this.props.match.params.id
        });

        if (this.props.match.params.id) {
            this.handleClickItem(this.props.match.params.id)
        }
    }

    componentDidMount() {

        this.componentDidMoutFace();
    }

    handleClickItem = async (key) => {
        let data = await getAllThietBiByPhieuBanGiao(key);

        var phieuSelect = this.state.phieus.find(element => {
            return key === element.maBanGiao
        });

        if (typeof phieuSelect === 'object') {
            this.setState({
                phieuSelected: phieuSelect
            })
        }

        this.setState({ phieuChiTiets: [], isLoadding: true, maPhieu: key, keySelected: key + "__" })

        var globle = this;
        setTimeout(function () {
            globle.setState({
                phieuChiTiets: data,
                isLoadding: false
            })
        }, 200)
    }

    //  chuyển đổi ngày---
    convertDay(day) {
        var currentDate;
        if (this.state.isUpdate === true) {
            currentDate = new Date(day);
        } else {
            currentDate = new Date();
        }
        return currentDate;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8} style={{ overflowY: 'scroll', height: 'calc(100vh - 120px)' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.phieus}
                            renderItem={item => (
                                // 
                                <List.Item style={item.maBanGiao === this.state.thietBinew ? { background: 'linear-gradient(141deg, #ecdec3c4 0%, #e6d4b2c9 51%, #f3eca8 75%)' } : { background: 'none' }} key={item.maBanGiao} className={item.maBanGiao + "__" === this.state.keySelected ? "item_list_custom_active" : "item_list_custom"} onClick={() => this.handleClickItem(item.maBanGiao)} >
                                    <List.Item.Meta
                                        avatar={<Avatar src="http://localhost:3000/biennhan.png" />}
                                        title={`[PBT${item.maBanGiao}] - ${dateFormat(new Date(item.ngayBanGiao), "dd/mm/yyyy")}`}
                                        description={"Chuyển bởi " + item.tenNguoiBanGiao}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={16} style={{ height: '100%', paddingLeft: '10px', fontSize: '17px' }}>
                        {
                            this.state.isLoadding === true ? <div style={{ textAlign: 'center', marginTop: '45px' }}><Spin size="large" /></div>
                                :
                                this.state.phieuSelected !== null ?
                                    <div style={{ padding: '5px' }}>
                                        <div style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase' }}>PHIếu bàn giao</div>
                                        <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>({"PBG" + this.state.phieuSelected.maBanGiao})</div>
                                        <p><b>Bàn giao bởi :</b> {this.state.phieuSelected.tenNguoiBanGiao}</p>
                                        <p><b>Ngày biên nhận :</b> {dateFormat(new Date(this.state.phieuSelected.ngayBanGiao), "dd/mm/yyyy")}</p>
                                        <p><b>Nội dung bàn giao:</b> {this.state.phieuSelected.noiDungBanGiao}</p>
                                        <p>Danh sách thiết bị chi tiết bao gồm: </p>
                                        <Table dataSource={this.state.phieuChiTiets} columns={this.state.columns} />
                                    </div>
                                    : <div style={{ marginTop: '45px' }}><Empty /></div>
                        }

                    </Col>
                </Row>
            </div>
        );
    }
}
// get-all-phieu-bangiao
export default DanhSachLuanChuyen;