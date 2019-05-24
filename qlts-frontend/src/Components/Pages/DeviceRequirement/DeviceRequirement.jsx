import React, { Component } from 'react'
import { Form, Row, Col, Input, Select, Divider, List, Button, Avatar} from 'antd';
import { getAllDonViTinh, getAllNhanVien, addNewPhieuYeuCau } from '../../../Services/apiHuu';
import { checkKyTuDacBiet, checkDaiQua128KyTu, checkDaiQua255KyTu, checknotAm } from '../../../Utils/ValidateForm/NhapKhoValidate';
import history from '../../../Utils/history';


const Option = Select.Option;

class DeviceRequirement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chiTietYeuCaus: [],
            mucDich: '',
            nhanVien: '',
            donViTInhs: [],
            isUpdate: false,
            listdvt: {
                tenThietBi: '',
                quyCach_DatTinh: '',
                soLuong: '',
                donViTInh: ''
            },
            nhanviens: [],
            data: {},
        }
    }

    handleCancel = (e) => {
        this.props.form.resetFields();
        this.setState({
            isUpdate: false,
            listdvt: {
                tenThietBi: '',
                quyCach_DatTinh: '',
                soLuong: '',
                donViTInh: ''
            }
        });
    }


    getAllNhanVien = async () => {
        var data = await getAllNhanVien();
        this.setState({
            nhanviens: data
        });
    }

    getAllDonViTinh = async () => {
        var data = await getAllDonViTinh();
        this.setState({
            donViTInhs: data
        });
    }

    // getAllChiTietYeuCau = async () => {
    //     var data = await getAllChiTietYeuCau();
    //     this.setState({
    //         listdata : data
    //     });
    // }
    componentDidMount() {
        // this.getAllChiTietYeuCau();
        this.getAllDonViTinh();
        this.getAllNhanVien();
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('chiTietYeuCaus')) {
            var data = JSON.parse(localStorage.getItem('chiTietYeuCaus'))
            this.setState({
                chiTietYeuCaus: data
            });
        }
    }

    dataNull = () => {
        this.setState({
            chiTietYeuCaus: []
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var { chiTietYeuCaus } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.state.isUpdate === false) {
                    chiTietYeuCaus.push(values);
                    this.handleCancel();
                }
            }
        });
        localStorage.setItem('chiTietYeuCaus', JSON.stringify(chiTietYeuCaus));
    }


    handleChange = (value) => {
        console.log(value);
    }
    //select
    handleSelectChange = (value) => {
        console.log(value)
    }
    /// laays ten don vi tinh
    convertCodeByName = (id) => {
        if (this.state.donViTInhs.length > 0) {
            let objDVT = this.state.donViTInhs.find(element => element.maDonViTinh.toString() === id.toString());
            return objDVT.tenDonViTinh;
        } else {
            return 'n/a'
        }

    }
    //onchange
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.onFilter(
            name === 'mucDich' ? value : this.state.mucDich,
            name === 'nhanVien' ? value : this.state.nhanVien
        )
        this.setState({
            [name]: value
        })
    }

    onFilter = (mucDich, nhanVien) => {
        this.setState({
            mucDich: mucDich,
            nhanVien: nhanVien
        })
    }

    dataColection = async () => {
        var { chiTietYeuCaus, nhanVien, mucDich } = this.state;
        var dataSend = { nhanVien: nhanVien, mucDich: mucDich, chiTietYeuCaus: [...chiTietYeuCaus] }
        await addNewPhieuYeuCau(dataSend);
        localStorage.removeItem("chiTietYeuCaus");
        this.dataNull();
        if (window.confirm("Bạn có muốn xem danh sách phiếu bàn giao")) {
            history.push('/app/seedetailslist');
        }
    }

    render() {
        const { chiTietYeuCaus, donViTInhs, listdvt, nhanviens, nhanVien, mucDich} = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={14} sm={14} md={14} lg={14} xl={14} style={{ padding: '10px' }}>
                        <div className="ant-form ant-form-horizontal">
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                                    <label className="ant-form-item-required" title="Mục đích">Mục đích</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12"><div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <input type="text"
                                            className="ant-input"
                                            name="mucDich"
                                            value={mucDich}
                                            onChange={this.onChange}
                                        />
                                    </span>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                                <label className="ant-form-item-required" title="Tên nhân viên">Tên nhân viên</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <select className="form-control" name="nhanVien" onChange={this.onChange} value={nhanVien} checked={nhanVien}>
                                            {nhanviens.map(element => <option key={element.maNhanVien} value={element.maNhanVien}>{element.tenNhanVien}</option>)}
                                        </select>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Divider type="vertical" />
                        <Form id="maCT" onSubmit={this.handleSubmit} style={{ backgroundColor: '#fafafa' }}>
                            <Form.Item
                                {...formItemLayout}
                                hasFeedback
                                label="Tên thiết bị"
                            >
                                {getFieldDecorator('tenThietBi', {
                                    initialValue: listdvt.tenThietBi,
                                    rules: [{
                                        required: true, message: 'nhập tên thiết bị!',
                                    },{
                                    validator : checkKyTuDacBiet
                                }, {
                                    validator : checkDaiQua128KyTu
                                }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                hasFeedback
                                label="Quy cách đặt tính"
                            >
                                {getFieldDecorator('quyCach_DatTinh', {
                                    initialValue: listdvt.quyCach_DatTinh,
                                    rules: [{
                                        required: true, message: 'vui lòng nhập quy cách đặt tính!',
                                    },{
                                        validator : checkDaiQua255KyTu
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                hasFeedback
                                label="Số lượng"
                            >
                                {getFieldDecorator('soLuong', {
                                    initialValue: listdvt.soLuong,
                                    rules: [{
                                        required: true, message: 'vui lòng nhập số lượng!',
                                    }, {
                                        validator : checknotAm
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                hasFeedback
                                label="Đơn vị tính"
                            >
                                {getFieldDecorator('donViTInh', {
                                    initialValue: listdvt.donViTInh,
                                    rules: [{ required: true, message: 'yêu cầu chọn đơn vị tính!' }],
                                })(
                                    <Select
                                        placeholder="Chọn đơn vị tính"
                                        onChange={this.handleSelectChange}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {donViTInhs.map(element => <Option key={element.maDonViTinh} value={element.maDonViTinh}>{element.tenDonViTinh}</Option>)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Form>
                        <div style={{ marginLeft: '30%' }}>
                            <Button form="maCT" key="submit" type="primary" htmlType="submit" style={{ margin: '10px' }}> Lưu lại </Button>
                            <button type="submit" className="btn btn-default" onClick={() => this.dataColection()}>Xác nhận</button>
                        </div>
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                        <List
                            itemLayout="horizontal"
                            dataSource={chiTietYeuCaus}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar>{item.soLuong}</Avatar>}
                                        title={<a href="/">{item.tenThietBi}</a>}
                                        description={`Đơn vị tính: ${this.convertCodeByName(item.donViTInh)}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create()(DeviceRequirement);

