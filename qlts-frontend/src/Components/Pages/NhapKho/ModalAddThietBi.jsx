import React, { Component } from 'react';
import { Select, Button, Form, Input, Modal, Tooltip, Divider } from 'antd';
import { connect } from 'react-redux';
import { getAllNhaCungCap, getLoaiChaByNhaCungCap, getLoaiConByLoaiCha, getAllDonViTinh } from '../../../Services/api';
import { handleCheckSoLuong, handleCheckKhauHao, handleCheckDonGia, handleCheckBaoHanh, checknotNegative, checknotAm } from '../../../Utils/ValidateForm/NhapKhoValidate';
const Option = Select.Option;
class ModalAddThietBi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstMa: {
                maNCC: null,
                maLoai: null,
                maThietBi: null,
                maDonViTinh: null,
            },
            lstNhaCungCap: [],
            lstLoaiCha: [],
            lstThietBi: [],
            tenThietBi: '',
            lstDonViTinh: []
        }
    }

    getData = async () => {
        let lstNCC = await getAllNhaCungCap();
        let lstLoaiThietBiCha = await getLoaiChaByNhaCungCap(this.props.maNhaCungCap);
        console.log(lstLoaiThietBiCha)
        let lstDonViTinh = await getAllDonViTinh();
        this.setState({ lstDonViTinh: lstDonViTinh, lstNhaCungCap: lstNCC, lstLoaiCha: lstLoaiThietBiCha, lstMa: { ...this.state.lstMa, maNCC: this.props.maNhaCungCap } })
    }

    componentDidMount() {
        this.getData();

    }

    handleChangeNhaCungCap = async (value) => {
        let lstLoaiThietBiCha = await getLoaiChaByNhaCungCap(value);
        this.setState({ lstLoaiCha: lstLoaiThietBiCha, lstMa: { ...this.state.lstMa, maNCC: value } })
    }

    getListMaDaChon = () => {
        let lstMa = [];
        let obj = this.props.nhapkho;
        console.log(this.props.nhapkho[0])
        for (let i = 0; i < obj.length; i++) {
            lstMa = [...lstMa, obj[i].maNhomThietBi];
        }
        return lstMa;
    }

    handleChangeMaLoaiCha = async (value) => {
        let lstThietBi = await getLoaiConByLoaiCha(value);
        let lstDaChon = this.getListMaDaChon();
        console.log(lstDaChon)
        let lstAdd = [];
        lstThietBi.forEach(element => {
            if (!lstDaChon.includes(element.maLoai)) {
                lstAdd = [...lstAdd, element];
            }
        });
        this.setState({ lstThietBi: lstAdd, lstMa: { ...this.state.lstMa, maLoai: value } })
    }

    handleChanDonViTinh = (value) => {
        this.setState({ lstMa: { ...this.state.lstMa, maDonViTinh: value } })
    }

    handleChangeMaThietBi = (value) => {
        let obj = this.state.lstThietBi.find(element => {
            return element.maLoai === value
        });
        this.setState({ lstMa: { ...this.state.lstMa, maThietBi: value }, tenThietBi: obj.tenLoai })
    }

    handleCancel = () => {
        this.props.form.resetFields();
        this.props.handleCancel();
        this.setState({ lstMa: { ...this.state.lstMa, maThietBi: null } })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.props.isUpdate === false) {
                    let objSave = {
                        tenThietBi: this.state.tenThietBi,
                        maLoaiThietBi: values.loaiThietBiCha,
                        maNhomThietBi: values.thietBi,
                        maLoaiCha: '',
                        maDonViTinh: this.state.lstMa.maDonViTinh,
                        soLuong: values.soLuong,
                        dongia: values.donGia,
                        baoHanh: values.baoHanh,
                        khauHao: values.khauHao,
                        lstMaThietBi: []
                    }
                    let { dispatch } = this.props;
                    dispatch({
                        type: 'ADD_ITEM_TO_LST_NHAP',
                        item: objSave
                    });
                    this.setState({ lstMa: { ...this.state.lstMa, maThietBi: null } })
                    this.handleCancel();
                } else {
                    let objSave = {
                        tenThietBi: this.props.dataForm.tenThietBi,
                        maLoaiThietBi: this.props.dataForm.maLoaiThietBi,
                        maNhomThietBi: this.props.dataForm.maNhomThietBi,
                        maLoaiCha: '',
                        maDonViTinh: this.state.lstMa.maDonViTinh === null ? this.props.dataForm.maDonViTinh : this.state.lstMa.maDonViTinh,
                        soLuong: values.soLuong,
                        dongia: values.donGia,
                        baoHanh: values.baoHanh,
                        khauHao: values.khauHao,
                        lstMaThietBi: []
                    }
                    var { dispatch } = this.props;

                    dispatch({
                        type: 'UPDATE_ITEM_TO_LST_NHAP',
                        item: objSave
                    });
                    this.handleCancel();
                    this.props.handleChangeMa(this.props.dataForm.maNhomThietBi);
                }
            }
        });
    }

    renderModalThemThietBi = () => {
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
            <Modal
                onCancel={this.handleCancel}
                title={"Thêm thiết bị"}
                visible={this.props.visibleModal}
                footer={[
                    <Button form="form_add_thietbi" key="submit" type="primary" htmlType="submit">
                        Submit </Button>,
                    <Button key="cancel" onClick={this.handleCancel}>
                        Đóng </Button>
                ]}
            >
                <Form id="form_add_thietbi" onSubmit={this.handleSubmit}>
                    {
                        this.props.isUpdate === false ?
                            <div>
                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Chọn loại thiết bị"
                                >
                                    {getFieldDecorator('loaiThietBiCha', {
                                        initialValue: this.props.dataForm.maLoaiThietBi,
                                        rules: [{
                                            required: true, message: 'Chọn loại thiết bị!'
                                        }],
                                    })(
                                        this.state.lstMa.maNCC !== null && this.state.lstLoaiCha.length > 0
                                            ?
                                            <Select placeholder="Chọn loại thiết bị" style={{ width: '100%' }} onChange={this.handleChangeMaLoaiCha}>
                                                {
                                                    this.state.lstLoaiCha.map(element => {
                                                        return <Option key={element.maLoai} value={element.maLoai}>{element.tenLoai}</Option>
                                                    })
                                                }
                                            </Select>
                                            :
                                            <Select disabled placeholder="Chọn loại thiết bị" style={{ width: '100%' }} onChange={this.handleChangeMaLoaiCha}>

                                            </Select>
                                    )}
                                </Form.Item>
                            </div>
                            :
                            ''
                    }
                    <Form.Item
                        {...formItemLayout}
                        hasFeedback
                        label="Chọn thiết bị"
                    >
                        {getFieldDecorator('thietBi', {
                            initialValue: this.props.dataForm.maNhomThietBi,
                            rules: [{
                                required: true, message: 'Chọn thiết bị!'
                            }],
                        })(
                            (this.state.lstThietBi.length <= 0 && this.state.lstLoaiCha.length <= 0) || this.props.isUpdate === true
                                ?
                                <Select disabled placeholder="Chọn thiết bị" style={{ width: '100%' }} onChange={this.handleChangeMaThietBi}>

                                </Select>
                                :
                                <Select placeholder="Chọn thiết bị" style={{ width: '100%' }} onChange={this.handleChangeMaThietBi}>
                                    {
                                        this.state.lstThietBi.map(element => {
                                            return <Option key={element.maLoai} value={element.maLoai}>{element.tenLoai}</Option>
                                        })
                                    }
                                </Select>
                        )}
                    </Form.Item>
                    {
                        (this.state.lstMa.maThietBi !== null && this.state.lstThietBi.length > 0 && this.state.lstLoaiCha.length > 0) || this.props.isUpdate === true
                            ?
                            <Divider />
                            :
                            ''
                    }

                    {
                        (this.state.lstMa.maThietBi !== null && this.state.lstThietBi.length > 0 && this.state.lstLoaiCha.length > 0) || this.props.isUpdate === true
                            ?
                            <div>
                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Nhập số lượng"
                                >
                                    {getFieldDecorator('soLuong', {
                                        initialValue: this.props.dataForm.soLuong,
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập số lượng!'
                                        }, {
                                            validator: handleCheckSoLuong
                                        }, {
                                            validator : checknotNegative
                                        }],
                                    })(
                                        <NumericInput lablefrefix="Cái" labletext={"Nhập số lượng"} style={{ width: '100%' }} />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Đơn vị tính"
                                >
                                    {getFieldDecorator('donViTinh', {
                                        initialValue: this.props.dataForm.maDonViTinh,
                                        rules: [{
                                            required: true, message: 'Chọn đơn vị tính!'
                                        }],
                                    })(
                                        <Select placeholder="Chọn đơn vị tính" style={{ width: '100%' }} onChange={this.handleChanDonViTinh}>
                                            {
                                                this.state.lstDonViTinh.map(element => {
                                                    return <Option key={element.maDonViTinh} value={element.maDonViTinh}>{element.tenDonViTinh}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Nhập đơn giá"
                                >
                                    {getFieldDecorator('donGia', {
                                        initialValue: this.props.dataForm.dongia,
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập đơn giá!'
                                        }, {
                                            validator: handleCheckDonGia
                                        }],
                                    })(
                                        <NumericInput lablefrefix="VND" labletext={"Nhập đơn giá"} style={{ width: '100%' }} />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Nhập bảo hành"
                                >
                                    {getFieldDecorator('baoHanh', {
                                        initialValue: this.props.dataForm.baoHanh,
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập bảo hành!'
                                        }, {
                                            validator: handleCheckBaoHanh
                                        },{
                                            validator : checknotNegative
                                        }],
                                    })(
                                        <NumericInput lablefrefix="tháng" labletext={"Nhập bảo hành"} style={{ width: '100%' }} />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Nhập khấu hao"
                                >
                                    {getFieldDecorator('khauHao', {
                                        initialValue: this.props.dataForm.khauHao,
                                        type: 'number',
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập khấu hao!',
                                        }, {
                                            validator: handleCheckKhauHao
                                        },{
                                            validator : checknotAm
                                        }],
                                    })(
                                        <NumericInput lablefrefix="%" labletext={"Nhập khấu hao"} style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </div>
                            :
                            ''
                    }
                </Form>
            </Modal>



        );
    }

    render() {
        return (
            <div>
                {this.renderModalThemThietBi()}
            </div>
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

var form = Form.create({ name: 'dynamic_form_item' })(ModalAddThietBi);

export default connect(function (state) {
    return { nhapkho: state.nhapkho }
})(form);