import React, { Component } from 'react';
import { Modal, List, Avatar, Row, Col, Table, Tooltip, Icon, Button, Form, Input, DatePicker, Select } from 'antd';

import { getAllPhieuBaoTri, getChiTietPhieu, batDauBaoTri, hoanThanhBaoTri, getAllNhanVien } from '../../../Services/aipNam';

import moment from 'moment';
import 'moment/locale/vi';
import { checkDaiQua100KyTu, checkKyTuDacBiet, checknotAm } from '../../../Utils/ValidateForm/NhapKhoValidate';
var dateFormat = require('dateformat');

const { Option } = Select;

class DanhSachPhieuBaoTri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phieus: [],
            phieuChiTiets: [],
            nhanViens: [],
            isLoadding: false,
            maPhieu: '',
            keySelected: '',
            visible: false,   // điều khiển form thêm mới có cho nó hiển thị hay không 
            columns: [{
                title: 'Mã thiết bị',
                dataIndex: 'maThietBi',
                key: 'maThietBi',
            }, {
                title: 'Tên thiết bị',
                dataIndex: 'tenThietBi',
                key: 'tenThietBi',
            }, {
                title: 'Tình trạng',
                dataIndex: 'tenTinhTrang',
                key: 'tenTinhTrang',
            },
            {
                title: 'Ngày lập danh sách',
                key: 'tuNgay',
                render: (text, record) => {
                    return <div>
                        {dateFormat(new Date(record.tuNgay), "dd/mm/yyyy")}
                    </div>
                }
            },
            {
                title: 'Ngày hoàn thành sửa chữa',
                key: 'denNgay',
                render: (text, record) => {
                    return <div>
                        {dateFormat(new Date(record.denNgay), "dd/mm/yyyy")}
                    </div>
                }

            },
            ],
            dataForm: {
                ngayBaoTri: new Date(),
                maNhanVienChiuTrachNhiem: '',
                noiBaoTri: '',
                diaChiBaoTri: '',
                phiBaoTri: '',
            }, 
            thietBinew: null
        }
    }

    //on modal

    //on modal form
    showModal = async () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }

    // dateFormat(new Date(item.ngayBaoTri), "dd/mm/yyyy, h:MM:ss TT")

    getAllPhieu = async () => {
        let phieus = await getAllPhieuBaoTri();
        this.setState({ phieus: phieus });
    }

    getAllNhanVien = async () => {
        let nhanViens = await getAllNhanVien();
        this.setState({
            nhanViens: nhanViens
        })
    }

    componentDidMoutFace = async () => {
        await this.setState({
            thietBinew: this.props.match.params.id
        });

        if (this.props.match.params.id) {
            this.handleClickItem(this.props.match.params.id)
        }
    }

    componentDidMount() {
        this.componentDidMoutFace();
        this.getAllPhieu();
        this.getAllNhanVien();
    }

    handleClickItem = async (key) => {
        this.setState({ phieuChiTiets: [], isLoadding: true, maPhieu: key, keySelected: key + "__" })
        let data = await getChiTietPhieu(key);

        var globle = this;
        setTimeout(function () {
            globle.setState({
                phieuChiTiets: data,
                isLoadding: false
            })
        }, 500)
    }

    handleClickBatDauBaoTri = async (maPhieu) => {

        var r = window.confirm("???");
        if (r === true) {
            let data = await batDauBaoTri(maPhieu);

            var { phieus } = this.state;
            for (var i = 0; i < phieus.length; i++) {
                if (phieus[i].maPhieuBaoTri === maPhieu) {
                    phieus[i].tinhTrangPhieu = 'sua_chua'
                }
            }

            this.setState({
                phieus: phieus,
                phieuChiTiets: data
            })
        }
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

    mapDanhSachNhanVien = () => {
        return this.state.nhanViens.map(element => {
            return (
                <Option key={element.maNhanVien} value={element.maNhanVien} >{element.tenNhanVien}</Option>
            )
        })
    }

    //submitform
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                var { maPhieu } = this.state;
                var dataUpdate = {
                    maPhieuBaoTri: 'null',
                    ngayBaoTri: new Date(),
                    maNhanVienChiuTrachNhiem: values.maNhanVienChiuTrachNhiem,
                    noiBaoTri: values.noiBaoTri,
                    diaChiBaoTri: values.diaChiBaoTri,
                    phiBaoTri: values.phiBaoTri,
                    lstThietBi: null
                }

                var r = window.confirm("???");
                if (r === true) {
                    let data = await hoanThanhBaoTri(maPhieu, dataUpdate);

                    var { phieus } = this.state;
                    for (var i = 0; i < phieus.length; i++) {
                        if (phieus[i].maPhieuBaoTri === maPhieu) {
                            phieus[i].tinhTrangPhieu = 'hoang_thanh'
                        }
                    }

                    this.setState({
                        phieus: phieus,
                        phieuChiTiets: data
                    })
                    this.handleCancel();
                }
            }
        });
    }

    handleClickHoangThanhBaoTri = async (maPhieu) => {

        var r = window.confirm("???");
        if (r == true) {
            let data = await hoanThanhBaoTri(maPhieu);

            var { phieus } = this.state;
            for (var i = 0; i < phieus.length; i++) {
                if (phieus[i].maPhieuBaoTri === maPhieu) {
                    phieus[i].tinhTrangPhieu = 'hoang_thanh'
                }
            }

            this.setState({
                phieus: phieus,
                phieuChiTiets: data
            })
            
        }
    }

    render() {
        //setup form;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Row>
                    <Col span={8} style={{ overflowY: 'scroll', height: 'calc(100vh - 120px)' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.phieus}
                            renderItem={item => (
                                <List.Item key={item.maPhieuBaoTri} className={item.maPhieuBaoTri + "__" === this.state.keySelected ? "item_list_custom_active" : "item_list_custom"} onClick={() => this.handleClickItem(item.maPhieuBaoTri)} style={item.tinhTrangPhieu === "cho_sua_chua" ? { background: 'linear-gradient(141deg, #ecdec3c4 0%, #e6d4b2c9 51%, #f3eca8 75%)' } : item.tinhTrangPhieu === 'sua_chua' ? { background: '#f1f1f1' } : { background: 'none' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src="http://localhost:3000/biennhan.png" />}
                                        title={`[PBT${item.maPhieuBaoTri}] - ${dateFormat(new Date(item.ngayBaoTri), "dd/mm/yyyy, h:MM:ss TT")}`}
                                        description={item.tinhTrangPhieu === "cho_sua_chua" ? "Danh sach thiết bị đang chờ sửa chữa" : item.tinhTrangPhieu === 'sua_chua' ? "Danh sách thiết bị đang được sửa chữa" : 'Danh sách thiết bị đã được sửa chữa'}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={16} style={{ height: '100%', paddingLeft: '10px' }}>
                        {
                            this.state.isLoadding === true ?
                                <div style={{ textAlign: 'center', marginTop: '20px' }}><img height="50px" src="https://ledpanasonic.110.vn/files/product/1132/09-09-2018/blueloadingicon_Co30a4a3.gif" /></div>
                                :
                                <Table dataSource={this.state.phieuChiTiets} columns={this.state.columns} />
                        }

                        {
                            this.state.phieuChiTiets.length > 0 && this.state.phieuChiTiets[0].maTinhTrang === 'TT02' ?
                                <div style={{ textAlign: 'right' }}><Button onClick={() => this.handleClickBatDauBaoTri(this.state.maPhieu)} type="primary">
                                    Bắt đầu sửa chữa<Icon type="right" />
                                </Button></div>
                                :
                                this.state.phieuChiTiets.length > 0 && this.state.phieuChiTiets[0].maTinhTrang === 'TT03' ?
                                    <div style={{ textAlign: 'right' }}><Button type="primary" onClick={this.showModal}>
                                        {/* onClick={() => this.handleClickHoangThanhBaoTri(this.state.maPhieu)} */}
                                        Hoàn thành sửa chữa<Icon type="right" />
                                    </Button></div>
                                    :
                                    ''
                        }
                    </Col>
                </Row>

                <Modal
                    title={"Thông tin bảo trì"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button form="addTinhTrangFrom" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Close </Button>
                    ]}
                >
                    <Form id="addTinhTrangFrom" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Ngày bảo trì"
                        >
                            {getFieldDecorator('ngayBaoTri', {
                                initialValue: moment(this.convertDay(this.state.dataForm.ngayBaoTri), 'DD/MM/YYYY'),
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập ngày bảo trì!',
                                }]
                            })(
                                <DatePicker format='DD/MM/YYYY' disabled />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Nhân viên chịu trách nhiệm"
                        >
                            {getFieldDecorator('maNhanVienChiuTrachNhiem', {
                                rules: [{ required: true, message: 'Yêu cầu chọn nhân viên chịu trách nhiệm!' }],
                            })(
                                <Select
                                    placeholder="Chọn nhân viên"
                                >
                                    {this.mapDanhSachNhanVien()}
                                    {/* {
                                        this.state.phongbans.map(element => <Option key={element.maPhongBan} value={element.maPhongBan} >{element.tenPhongBan}</Option>)
                                    } */}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Nơi bảo trì"
                        >
                            {getFieldDecorator('noiBaoTri', {
                                initialValue: this.state.dataForm.noiBaoTri,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập nơi bảo trì!',
                                },{
                                    validator : checkDaiQua100KyTu
                                }, {
                                    validator : checkKyTuDacBiet
                                }]
                            })(
                                <Input placeholder="Nhập nơi bảo trì" />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Địa chỉ bảo trì"
                        >
                            {getFieldDecorator('diaChiBaoTri', {
                                initialValue: this.state.dataForm.diaChiBaoTri,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập địa chỉ bảo trì!',
                                },{
                                    validator : checkDaiQua100KyTu
                                }],
                            })(
                                <Input placeholder="Nhập địa chỉ" />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Phí bảo trì"
                        >
                            {getFieldDecorator('phiBaoTri', {
                                initialValue: this.state.dataForm.phiBaoTri,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập phí bảo trì!',
                                },{
                                    validator : checknotAm
                                }],
                            })(
                                <NumericInput max={500} lablefrefix=" VND" labletext={"Nhập sô tiền"} style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

class NumericInput extends React.Component {
    onChange = (e) => {
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        }
    }

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        try {
            const { value, onBlur, onChange } = this.props;
            if (value.charAt(value.length - 1) === '.' || value === '-') {
                onChange(value.slice(0, -1));
            }
            if (onBlur) {
                onBlur();
            }
        } catch (err) {
            // console.log(err);
        }
    }

    render() {
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">
                {value !== '-' ? formatNumber(value) + " " + this.props.lablefrefix : '-'}
            </span>
        ) : 'Chỉ được nhập số !';
        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder={this.props.labletext}
                    maxLength={25}
                    max={this.props.max}
                />
            </Tooltip>
        );
    }
}

function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export default Form.create()(DanhSachPhieuBaoTri);