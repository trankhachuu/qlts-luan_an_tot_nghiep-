import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Badge, Select, Icon, Form, Input, Button, message } from 'antd';
import { getAllNhanVien, getAllPhongBan, getDanhSachThietBi, updateNhanVienRefThietBi, getNhanVienRefPhongBan } from '../../../Services/apiHuu';
import { actFetchThietBi } from './../../../Reducers/actions/index';
import history from '../../../Utils/history';
const { TextArea } = Input;

const Option = Select.Option;

class ListRotationType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NhanVien: [],
            PhongBan: [],
            DanhSachTB: [],
            maNhanVien: '',
            maPhongBan: '',
            kieuBanGiao: '',
            NhanVienPhongbans: [],
            mathietbis: [],
        }
    }

    getAllNhanVien = async () => {
        var data = await getAllNhanVien();
        this.setState({
            NhanVien: data
        });
    }

    getAllPhongBan = async () => {
        let data = await getAllPhongBan();
        this.setState({
            PhongBan: data
        });
    }

    getDanhSachThietBi = async () => {
        let res = await getDanhSachThietBi();
        this.setState({
            DanhSachTB: res
        });
    }

    componentDidMount() {
        this.getAllNhanVien();
        this.getAllPhongBan();
        this.getDanhSachThietBi();
    }

    convertCodeByName = (id) => {
        if (this.state.DanhSachTB.length > 0) {
            let objDS = this.state.DanhSachTB.find(element => element.maThietBi === id);
            return objDS.tenLoai;
        } else {
            return 'n/a'
        }

    }

    handleChangeDVT = (value) => {
        this.setState({
            maDonViTinh: value
        });
    }

    handleChangenv = (value) => {
        this.setState({
            maNhanVien: value
        });
    }

    handleChangepb = async (value) => {
        let NhanVienPhongban = await getNhanVienRefPhongBan(value);
        this.setState({
            NhanVienPhongbans: NhanVienPhongban
        });
        this.setState({
            maPhongBan: value
        });
    }

    handleChangeKieuBanGiao = (value) => {
        this.setState({
            kieuBanGiao: value
        })
    }

    disabledSelectDonVi = () => {
        var { kieuBanGiao } = this.state;
        if (kieuBanGiao === 0) {
            return true;
        } else {
            return false;
        }
    }



    disabledSelectCaNhan = () => {
        var { kieuBanGiao, maPhongBan } = this.state;
        if (kieuBanGiao === 1 && maPhongBan) {
            return false;
        } else if (kieuBanGiao === 1) {
            return true;
        }
        else {
            return false;
        }

    }

    getListThietBi = () => {
        var lstThietBi = [];
        for (var element of this.props.thietbis) {
            for (var tb of element.options) {
                lstThietBi = [...lstThietBi, tb.value];
            }
        }
        return lstThietBi;
    }

    onRotation = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.state.NhanVienPhongbans.length > 0) {
                    var list = await this.getListThietBi();
                    var { kieuBanGiao, maNhanVien } = this.state;
                    var dataSend = { maPhongBanNhan: values.maPhongBan, maNhanVien: maNhanVien, kieuBanGiao: kieuBanGiao, lstThietBi: [...list], noiDungBanGiao: values.noiDungBanGiao };

                    console.log(dataSend);

                    await updateNhanVienRefThietBi(dataSend);
                    this.props.fetAllThietBi([]);
                } else {
                    message.error('Chọn nhân viên nhận bàn giao trước');
                }
            }
        });
    }
    

    onComeBack = () => {
        this.props.fetAllThietBi([]);
        history.push('/app/rotationtype');
    }

    render() {
        var { PhongBan, NhanVien, maPhongBan, NhanVienPhongbans, mathietbis, NhanVienPhongbans } = this.state;
        var nhanviens = !maPhongBan ? NhanVien : NhanVienPhongbans;
        var { thietbis } = this.props;
        //set upda form\
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
        var dataList = thietbis.map((element, index) => {
            return (
                <div key={index}>
                    <button className="collapsible">{`[${element.value}] ${element.label}`}</button>
                    <div className="content">
                        {
                            element.options.map(element1 => {
                                return (
                                    <div key={element1.value} className="sub-item">
                                        <h3>
                                            <Badge
                                                count={`Mã: ${element1.value}`}
                                                style={{ backgroundColor: "#52c41a" }}
                                            />
                                            <Badge
                                                count={`${element1.label}`}
                                                style={{
                                                    backgroundColor: "#f1f1f1",
                                                    color: "rgb(0, 160, 209)",
                                                    fontWeight: "bold",
                                                    fontSize: "15px"
                                                }}
                                            />
                                        </h3>
                                        <span>{element1.tenTinhTrang}</span>
                                        <br />
                                        <span className="mota">{element1.moTa}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
        return (

            <div>
                <Row type="flex" justify="start">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px', backgroundColor: '#fcfcfc', height: 'calc(100vh - 120px)', position: 'relative' }}>
                        <h3 style={{ fontSize: '20px', borderBottom: '2px solid #4caf50', padding: '10px', textTransform: 'uppercase' }}>Danh sách thiết bị luân chuyển</h3>
                        {dataList}

                        <div className="btn pull-left" style={{ position: 'absolute', bottom: '20px', left: '10px' }}>
                            <Button type="primary" onClick={() => this.onComeBack()} className="btn btn-primary"><Icon type="left" />Chọn lại</Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px' }}>
                        <h3 style={{ fontSize: '20px', borderBottom: '2px solid #4caf50', padding: '10px', textTransform: 'uppercase' }}>Hoàn tất luân chuyển</h3>
                        <Form id="form_ht_bangiao" onSubmit={this.onRotation}>

                            <Form.Item
                                hasFeedback
                                label="Kiểu bàn giao"
                            >
                                {getFieldDecorator('kieuBanGiao', {
                                    rules: [{
                                        required: true, message: 'Chọn kiểu bàn giao!'
                                    }],
                                })(
                                    <Select
                                        placeholder="Chọn kiểu bàn giao"
                                        onChange={this.handleChangeKieuBanGiao}
                                    >
                                        <Option value="ca_nhan">Cá nhân</Option>
                                        <Option value="don_vi">Đơn vị</Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                label="Phòng ban bàn giao"
                            >
                                {getFieldDecorator('maPhongBan', {
                                    rules: [{
                                        required: true, message: 'Chọn phòng ban bàn giao!'
                                    }],
                                })(
                                    <Select
                                        placeholder="Chọn phòng ban"
                                        onChange={this.handleChangepb}
                                    >
                                        {PhongBan.map(element => (
                                            <Option key={element.maPhongBan} value={element.maPhongBan}>
                                                {element.tenPhongBan}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                label="Cá nhân nhận bàn giao"
                            >
                                {getFieldDecorator('maNhanVien', {
                                    rules: [{
                                        required: true, message: 'Chọn người nhận bàn giao!'
                                    }],
                                })(
                                    NhanVienPhongbans.length > 0 ?
                                        <Select
                                            placeholder="Chọn Nhân viên"
                                            onChange={this.handleChangenv}
                                        >
                                            {NhanVienPhongbans.map(element => (
                                                <Option key={element.maNhanVien} value={element.maNhanVien}>
                                                    {element.tenNhanVien}
                                                </Option>
                                            ))}
                                        </Select>
                                        :
                                        <Select
                                            disabled
                                            placeholder="Chọn Nhân viên"
                                            onChange={this.handleChangenv}
                                        >

                                        </Select>
                                )}
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                label="Nội dung bàn giao"
                            >
                                {getFieldDecorator('noidungbangiao', {
                                    rules: [{
                                        required: true, message: 'Nội dung bàn giao bắt buộc!'
                                    }],
                                })(
                                    <TextArea />
                                )}
                            </Form.Item>
                        </Form>
                        <div style={{ float: 'right', marginRight: '22px' }}>
                            <Button form="form_ht_bangiao" key="submit" type="primary" htmlType="submit">
                                Hoàn tất chuyển </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        thietbis: state.thietbis,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetAllThietBi: (thietbis) => {
            dispatch(actFetchThietBi(thietbis))
        }
    }
}

var form = Form.create({ name: 'dynamic_form_item' })(ListRotationType)

export default connect(mapStateToProps, mapDispatchToProps)(form)
