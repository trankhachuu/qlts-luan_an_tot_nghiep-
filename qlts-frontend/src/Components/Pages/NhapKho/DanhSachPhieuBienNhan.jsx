import React, { Component } from 'react';
import { List, Avatar, Row, Col, Table, Icon, Button, Empty, Form, Select, Spin } from 'antd';
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";

import { getALlBienNhan, getChiTietByBienNhan } from '../../../Services/api.js';

import 'moment/locale/vi';
var dateFormat = require('dateformat');

class DanhSachPhieuBienNhan extends Component {
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
                title: 'ID',
                render: (text, record) => {
                    return <div>
                        {"CT" + record.maCT}
                    </div>
                },
                key: 'maCT',
            }, {
                title: 'Tên thiết bị',
                dataIndex: 'tenThietBi',
                key: 'tenThietBi',
            }, {
                title: 'Số lượng',
                dataIndex: 'soLuong',
                key: 'soLuong',
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

    // dateFormat(new Date(item.ngayBaoTri), "dd/mm/yyyy, h:MM:ss TT")

    getAllPhieu = async () => {
        let phieus = await getALlBienNhan();
        this.setState({ phieus: phieus });
        console.log(phieus)
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

        let data = await getChiTietByBienNhan(key);
        var phieuSelect = this.state.phieus.find(element => {
            return key === element.maBienNhan
        })

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
                                // style = { item.tinhTrangPhieu === "cho_sua_chua" ? { background: 'linear-gradient(141deg, #ecdec3c4 0%, #e6d4b2c9 51%, #f3eca8 75%)' } : item.tinhTrangPhieu === 'sua_chua' ? { background: '#f1f1f1' } : { background: 'none' } }
                                <List.Item key={item.maBienNhan} className={item.maBienNhan + "__" === this.state.keySelected ? "item_list_custom_active" : "item_list_custom"} onClick={() => this.handleClickItem(item.maBienNhan)} >
                                    <List.Item.Meta
                                        avatar={<Avatar src="http://localhost:3000/biennhan.png" />}
                                        title={`[PBT${item.maBienNhan}] - ${dateFormat(new Date(item.ngayBienNhan), "dd/mm/yyyy")}`}
                                        description={item.inputtype === "mua-moi" ? "Mua mới từ " + ` - ${item.maNCC}` : item.inputtype === 'duoc-tang' ? "Được tặng bởi " + ` - ${item.maNCC}` : "Được chuyển từ " + ` - ${item.maNCC}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col ref={el => (this.componentRef = el)} span={16} style={{ height: '100%', paddingLeft: '10px', fontSize: '17px' }}>
                        {
                            this.state.isLoadding === true ? <div style={{ textAlign: 'center', marginTop: '45px' }}><Spin size="large" /></div>
                                :
                                this.state.phieuSelected !== null ?
                                    <div style={{ padding: '5px' }}>
                                        <div style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>PHIẾU BIÊN NHẬN</div>
                                        <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>({this.state.phieuSelected.maBienNhan})</div>
                                        <p><b>Nhà cung cấp :</b> {this.state.phieuSelected.maNCC}</p>
                                        <p><b>Ngày biên nhận :</b> {dateFormat(new Date(this.state.phieuSelected.ngayBienNhan), "dd/mm/yyyy")}</p>
                                        <p><b>Địa điểm giao :</b> {this.state.phieuSelected.diaDiemGiao}</p>
                                        <p><b>Kiểu nhập : </b>{this.state.phieuSelected.inputtype === "mua-moi" ? "Mua mới" : this.state.phieuSelected.inputtype === 'duoc-tang' ? "Được tặng " : "Được chuyển đến"} </p>
                                        <p>Danh sách thiết bị chi tiết bao gồm: </p>
                                        <Table dataSource={this.state.phieuChiTiets} columns={this.state.columns} />
                                    </div>
                                    : <div style={{ marginTop: '45px' }}><Empty /></div>
                        }
                    </Col>
                    {
                        this.state.phieuSelected !== null ?
                            <ReactToPrint
                                trigger={() => <Button type="primary">In phiếu</Button>}
                                content={() => this.componentRef}
                            />
                            : ''
                    }

                </Row>
            </div>
        );
    }
}
export default Form.create()(DanhSachPhieuBienNhan);