import React, { Component } from 'react';
import { message, Row, Col, Button, Divider, Select, Input, Tooltip, List, Avatar, Form, Icon, Switch } from 'antd';
import { removeLstMaThietBi, setLstMaThietBi, getLstMaThietBi } from '../../../Utils/khoLocalStorage';
import {
    getAllNhaCungCap, getAllDonViTinh, getAllTenThietBiExits, getAllLoaiThietBi, nhapKhoHangLoat, getAllTenThietBiExitsByNCC
} from '../../../Services/api';
import history from '../../../Utils/history.js'
const Option = Select.Option;

let id = 0;
let soLuongMax = 100

class NhapKho extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thongTinNhap: {
                nhaCungCap: '',
                kieuNhap: ''
            },
            soLuong: '',
            //
            soLuongRender: 0,
            dongia: '',
            tenThietBi: '',
            maNhomThietBi: '',
            tenThietBiCoSan: '',
            donViTinh: '',
            maLoaiThietBi: '',
            lstMaThietBi: [],
            baoHanh: '',
            khauHao: '',
            //
            lstMapping: {
                lstLoaiThietBi: [],
                lstDonViTinh: [],
                lstNhaCungCap: [],
                lstThietBi: [],
                lstKieuNhap: [
                    {
                        key: 'mua-moi',
                        value: 'Thiết bị mua mới'
                    },
                    {
                        key: 'duoc-tang',
                        value: 'Thiết bị được tặng'
                    },
                    {
                        key: 'luan-chuyen',
                        value: 'Thiết bị được luân chuyển'
                    }
                ]
            },
            mappingList: [],
            switchKieuThem: true,
            disabledSwitch: false,
            isSelectThietBi: false,
            isRenderField: false
        };
    }

    toggleSwitch = () => {
        this.setState({
            disabledSwitch: !this.state.disabledSwitch,
        });
    }

    onChangeSoLuong = (soLuong) => {
        if (soLuong <= 1000)
            this.setState({ soLuong: soLuong });
        else
            alert("Số lượng phải nhỏ hơn 1000");
    }

    onChangeBaoHanh = (baoHanh) => {
        this.setState({ baoHanh });
    }

    onChangeKhauHao = (khauHao) => {
        this.setState({ khauHao });
    }

    changeSoLuongField = () => {
        console.log("____1");
        let loop = parseInt(this.state.soLuong) - this.state.soLuongRender;
        if (loop > 0) {
            for (let i = 0; i < loop; i++) {
                this.add(false);
                console.log("add" + i)
            }
            this.setState({
                soLuongRender: parseInt(this.state.soLuong)
            })
        } else if (loop < 0) {
            if (window.confirm("Thay đổi sẻ xóa mã bạn đã nhập trước đó! bạn có chắc ?")) {
                const keys = this.props.form.getFieldValue('keys');
                let indexKey = keys.length - 1;
                for (let i = 0; i < Math.abs(loop); i++) {
                    this.remove(keys[indexKey], false);
                    indexKey--;
                }
                this.setState({
                    soLuongRender: parseInt(this.state.soLuong)
                })
            }
        }
    }

    handkeUpdateSoLuong = async (e) => {
        if (e.charCode === 13 && this.state.soLuong.toString() !== this.state.soLuongRender.toString()) {
            this.setState({ isRenderField: true });
            await this.changeSoLuongField();
            this.setState({ isRenderField: false });
        }
    }

    handkeUpdateSoLuongUnfocus = async (e) => {
        if (this.state.soLuong.toString() !== this.state.soLuongRender.toString()) {
            this.setState({ isRenderField: true });
            await this.changeSoLuongField();
            this.setState({ isRenderField: false });
        } else {
            console.log("Tuổi loz chơi t")
        }

    }

    onChangeDonGia = (dongia) => {
        this.setState({ dongia });
    }

    onChangeField = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleChangeNhaCungCap = async (value) => {
        let lstTB = await getAllTenThietBiExitsByNCC(value.key);
        console.log(lstTB);
        this.setState({ thongTinNhap: { ...this.state.thongTinNhap, nhaCungCap: value.key }, lstMapping: { ...this.state.lstMapping, lstThietBi: lstTB }, isSelectThietBi: true })
    }

    handleChangeLoaiThietBi = (value) => {
        this.setState({ maLoaiThietBi: value.key })
    }

    handleChangeKieuNhap = (value) => {
        this.setState({ thongTinNhap: { ...this.state.thongTinNhap, kieuNhap: value.key } })
    }

    handleChangeDonViTinh = (value) => {
        this.setState({ donViTinh: value.key })
    }

    handleChangeTenThietBi = (value) => {
        this.setState({ tenThietBiCoSan: value.key, tenThietBi: value.label })
    }

    handleChangeDonViTinh = (value) => {
        this.setState({ donViTinh: value.key })
    }

    // on form input key
    remove = (k, isUpdate) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        // if (keys.length === 1) {
        //     return;
        // }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
        if (isUpdate === true) {
            this.setState({ soLuong: (parseInt(this.state.soLuongRender) - 1) })
            this.setState({ soLuongRender: parseInt(this.state.soLuongRender) - 1 })
        }
    }

    add = (isUpdate) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });

        // form.setFieldsValue({ [`names[${nextKeys}]`]: soLuongMax });

        if (isUpdate === true) {
            this.setState({ soLuong: (parseInt(this.state.soLuongRender) + 1) })
            this.setState({ soLuongRender: parseInt(this.state.soLuongRender) + 1 })
        }
    }

    addMaTuDong = () => {
        var { getFieldValue, setFieldsValue } = this.props.form;
        const keys = getFieldValue('keys');
        for (var item of keys) {
            setFieldsValue({ [`names[${item}]`]: soLuongMax });
            soLuongMax++;
        }
    }

    checkTrungTen(lst, strKey) {
        lst.forEach(element => {
            console.log(element.tenThietBi.toString() + " -- " + strKey.toString());
            if (element.tenThietBi.toString() === strKey.toString())
                return true;
        });
        return false;
    }

    resetFieldThemThietBi = () => {
        const keys = this.props.form.getFieldValue('keys');
        keys.forEach(element => {
            this.remove(element, false);
        });
        this.setState({
            soLuong: '0',
            //
            soLuongRender: 0,
            dongia: '',
            baoHanh: '',
            khauHao: '',
            tenThietBi: '',
            tenThietBiCoSan: '',
            donViTinh: '',
            lstMaThietBi: [],
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let lstTmp = getLstMaThietBi();
        if (lstTmp === null)
            lstTmp = [];
        else
            lstTmp = JSON.parse(lstTmp);
        // validate
        this.props.form.validateFields((err, values) => {
            let isTrungTen = this.checkTrungTen(lstTmp, this.state.tenThietBi)
            if (!isTrungTen) {
                if (!err) {
                    const { keys, names } = values;
                    let lstIDThietBi = keys.map(key => names[key]);
                    let objectInput = {
                        kieuNhap: this.state.switchKieuThem === true ? 'them_moi' : 'co_san',
                        maLoaiThietBi: this.state.tenThietBiCoSan,
                        tenThietBi: this.state.tenThietBi,
                        maNhomThietBi: this.state.maNhomThietBi,
                        maLoaiCha: this.state.maLoaiThietBi,
                        maDonViTinh: this.state.donViTinh,
                        baoHanh: this.state.baoHanh,
                        khauHao: this.state.khauHao,
                        dongia: this.state.dongia,
                        soLuong: this.state.soLuongRender,
                        lstMaThietBi: lstIDThietBi,
                    }
                    setLstMaThietBi(JSON.stringify([...lstTmp, objectInput]));
                    this.setState({ mappingList: [...lstTmp, objectInput] });
                    this.resetFieldThemThietBi();
                } else {
                    message.error("Thông tin nhập không chính sác.");
                }
            } else {
                message.error("Tên thiết bị đã tồn tại.");
            }
        });
    }

    handleSUbMitForm = async () => {
        if (this.state.thongTinNhap.nhaCungCap.length >= 2 && this.state.thongTinNhap.kieuNhap.length > 0 && this.state.mappingList.length > 0) {
            let data = {
                maNhaCungCap: this.state.thongTinNhap.nhaCungCap,
                kieuNhap: this.state.thongTinNhap.kieuNhap,
                lstThietBi: [...this.state.mappingList]
            }
            let res = await nhapKhoHangLoat(data);
            if (res) {
                history.push('/app/dsphieubiennhan');
                removeLstMaThietBi();
            }

        } else {
            alert('Thông tin nhập chưa chính sác');
        }
    }

    onChangeKieuThem = (checked) => {
        this.setState({
            switchKieuThem: checked
        })
    }

    getData = async () => {
        let lstNCC = await getAllNhaCungCap();
        let lstDVT = await getAllDonViTinh();

        let lstLoaiTB = await getAllLoaiThietBi();
        this.setState({
            lstMapping: { ...this.state.lstMapping, lstNhaCungCap: lstNCC, lstDonViTinh: lstDVT, lstLoaiThietBi: lstLoaiTB }
        })

    }

    componentDidMount() {
        let lstTmp = getLstMaThietBi();
        if (lstTmp === null)
            lstTmp = [];
        else
            lstTmp = JSON.parse(lstTmp);

        if (lstTmp.length > 0) {
            if (window.confirm("Bạn muốn giữ lại danh sách thiết bị củ ?") === false) {
                removeLstMaThietBi();
                this.setState({ mappingList: [] });
            } else {
                this.setState({ mappingList: [...lstTmp] });
            }
        }

        this.getData();
    }

    render() {
        // on form input key
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 24, offset: 2 },
            }
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => (
            <Form.Item
                {...formItemLayoutWithOutLabel}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Vui lòng nhập mã cho thiết bị hoặc xóa trường này.",
                    }],
                })(
                    <Input name={`names[${k}]`} placeholder={`Nhập mã cho thiết bị ${index + 1}/${this.state.soLuongRender}`} style={{ width: '80%', marginRight: 8 }} />
                )}
                {keys.length > 0 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k, true)}
                    />
                ) : null}
            </Form.Item>
        ));

        return (
            <Row type="flex" justify="start">
                <Col className="custom-scroll" xs={24} sm={24} md={8} lg={8} xl={8} style={{ padding: '10px', paddingLeft: '20px', backgroundColor: '#fff', overflowY: 'scroll', height: 'calc(100vh - 110px)' }}>
                    <Divider dashed>Thông tin nhập kho</Divider>
                    <div id="addTinhTrangFrom" className="ant-form ant-form-horizontal">
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Mã tình trạng">Nhà cung cấp</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <Select name="fdgdfg" labelInValue defaultValue={{ key: 'Chọn nhà cung cấp' }} style={{ width: '100%' }} onChange={this.handleChangeNhaCungCap}>
                                            {
                                                this.state.lstMapping.lstNhaCungCap.map(element => {
                                                    return <Option key={element.maNCC} value={element.maNCC}>{element.tenNCC}</Option>
                                                })
                                            }
                                        </Select>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="tenTinhTrang" className="ant-form-item-required" title="Tên tình trạng">Kiểu nhập</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <Select labelInValue defaultValue={{ key: 'Chọn kiểu nhập' }} style={{ width: '100%' }} onChange={this.handleChangeKieuNhap}>
                                            {
                                                this.state.lstMapping.lstKieuNhap.map(element => {
                                                    return <Option key={element.key} value={element.key}>{element.value}</Option>
                                                })
                                            }
                                        </Select>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider dashed>Nhập thiết bị</Divider>
                    <div id="addTinhTrangFrom" className="ant-form ant-form-horizontal">
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                {/* <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Mã tình trạng">Tên thiết bị</label> */}
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <Switch disabled={this.state.disabledSwitch} onChange={this.onChangeKieuThem} checkedChildren="Nhập mới" unCheckedChildren="Có sẳn" defaultChecked />
                                        <Button size="small" style={{ marginLeft: '10px' }} type="primary" onClick={this.toggleSwitch}>{this.state.disabledSwitch === true ? 'Bỏ khóa' : 'Khóa'}</Button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.switchKieuThem === true
                                ?
                                <div>
                                    <div className="ant-row ant-form-item">
                                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                            <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Mã tình trạng">Tên thiết bị</label>
                                        </div>
                                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                            <div className="ant-form-item-control">
                                                <span className="ant-form-item-children">
                                                    <Input
                                                        placeholder="Nhập tên thiết bị"
                                                        name="tenThietBi"
                                                        value={this.state.tenThietBi}
                                                        onChange={this.onChangeField}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ant-row ant-form-item">
                                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                            <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Mã tình trạng">Mã nhóm</label>
                                        </div>
                                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                            <div className="ant-form-item-control">
                                                <span className="ant-form-item-children">
                                                    <Input
                                                        placeholder="Nhập mã nhóm thiết bị"
                                                        name="maNhomThietBi"
                                                        value={this.state.maNhomThietBi}
                                                        onChange={this.onChangeField}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="ant-row ant-form-item">
                                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                        <label htmlFor="tenTinhTrang" className="ant-form-item-required" title="Thiết bị">Thiết bị</label>
                                    </div>
                                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                        <div className="ant-form-item-control">
                                            <span className="ant-form-item-children">
                                                {
                                                    this.state.isSelectThietBi === true && this.state.lstMapping.lstThietBi.length > 0
                                                        ?
                                                        <Select labelInValue defaultValue={{ key: 'Chọn thiết bị' }} style={{ width: '100%' }} onChange={this.handleChangeTenThietBi}>
                                                            {
                                                                this.state.lstMapping.lstThietBi.map(element => {
                                                                    return <Option key={element.maLoai} value={element.maLoai}>{element.tenLoai}</Option>
                                                                })
                                                            }
                                                        </Select>
                                                        :
                                                        <Select disabled labelInValue defaultValue={{ key: 'Vui lòng chọn nhà cung cấp' }} style={{ width: '100%' }} onChange={this.handleChangeTenThietBi}>
                                                            {
                                                                this.state.lstMapping.lstThietBi.map(element => {
                                                                    return <Option key={element.maLoai} value={element.maLoai}>{element.tenLoai}</Option>
                                                                })
                                                            }
                                                        </Select>
                                                }

                                            </span>
                                        </div>
                                    </div>
                                </div>
                        }

                        {
                            this.state.switchKieuThem === true ? <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                    <label htmlFor="tenTinhTrang" className="ant-form-item-required" title="LoaiThietBi">Loại thiết bị</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                    <div className="ant-form-item-control">
                                        <span className="ant-form-item-children">
                                            <Select labelInValue defaultValue={{ key: 'Chọn loại thiết bị' }} style={{ width: '100%' }} onChange={this.handleChangeLoaiThietBi}>
                                                {
                                                    this.state.lstMapping.lstLoaiThietBi.map(element => {
                                                        return <Option key={element.maLoai} value={element.maLoai}>{element.tenLoai}</Option>
                                                    })
                                                }
                                            </Select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                                :
                                ''
                        }

                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="tenTinhTrang" className="ant-form-item-required" title="Tên tình trạng">Đơn vị tính</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <Select labelInValue defaultValue={{ key: 'Chọn đơn vị tính' }} style={{ width: '100%' }} onChange={this.handleChangeDonViTinh}>
                                            {
                                                this.state.lstMapping.lstDonViTinh.map(element => {
                                                    return <Option key={element.maDonViTinh} value={element.maDonViTinh}>{element.tenDonViTinh}</Option>
                                                })
                                            }
                                        </Select>
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Mã tình trạng">Số lượng</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <NumericInput max={500} lablefrefix="-> Press [Enter]" labletext={"Nhập sô lượng"} style={{ width: '100%' }} value={this.state.soLuong} onChange={this.onChangeSoLuong} onKeyPress={this.handkeUpdateSoLuong} onBlur={this.handkeUpdateSoLuongUnfocus} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Mã tình trạng">Đơn giá</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <NumericInput lablefrefix="VND" labletext={"Nhập đơn giá"} style={{ width: '100%' }} value={this.state.dongia} onChange={this.onChangeDonGia} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Bảo hành(tháng)">Bảo hành(tháng)</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <NumericInput lablefrefix="Tháng" labletext={"Nhập bảo hành"} style={{ width: '100%' }} value={this.state.baoHanh} onChange={this.onChangeBaoHanh} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
                                <label htmlFor="maTinhTrang" className="ant-form-item-required" title="Khấu hao">Khấu hao</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <NumericInput lablefrefix="%" labletext={"Nhập khấu hao"} style={{ width: '100%' }} value={this.state.khauHao} onChange={this.onChangeKhauHao} />
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Col>
                <Col className="custom-scroll" xs={24} sm={24} md={8} lg={8} xl={8} style={{ padding: '10px', paddingLeft: '20px', backgroundColor: '#fafafa', overflowY: 'scroll', height: 'calc(100vh - 110px)' }}>
                    <Divider dashed>Nhập mã cho thiết bị</Divider>
                    <button onClick={this.addMaTuDong}>Reder ma tu dong</button>
                    <Form onSubmit={this.handleSubmit}>
                        {
                            this.state.isRenderField === false ?
                                <div>
                                    {formItems}
                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                        <Button type="dashed" onClick={() => this.add(true)} style={{ width: '80%' }}>
                                            <Icon type="plus" /> Thêm</Button>
                                    </Form.Item>
                                </div>
                                :
                                <div style={{ textAlign: 'center', marginTop: '20px' }}><img height="50px" src="https://ledpanasonic.110.vn/files/product/1132/09-09-2018/blueloadingicon_Co30a4a3.gif" /></div>

                        }

                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button style={{ width: '80%' }} type="primary" htmlType="submit">Nhập</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col className="custom-scroll" xs={24} sm={24} md={8} lg={8} xl={8} style={{ padding: '10px', paddingLeft: '20px', backgroundColor: '#fff', overflowY: 'scroll', height: 'calc(100vh - 110px)' }}>
                    <Divider dashed>Danh sách thiết bị nhập</Divider>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.mappingList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="http://localhost:3000/package.ico" />}
                                    title={<span>{item.tenThietBi}</span>}
                                    description={`Số lượng ${item.soLuong} | Đơn giá : ${item.dongia} VND`}
                                />
                            </List.Item>
                        )}
                    />
                    <div className="ant-row ant-form-item"><div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-xs-offset-0 ant-col-sm-24 ant-col-sm-offset-2"><div className="ant-form-item-control"><span className="ant-form-item-children"><Button onClick={this.handleSUbMitForm} style={{ width: '80%' }} type="primary" htmlType="submit">Lưu vào kho</Button></span></div></div></div>
                </Col>
            </Row>
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

export default Form.create({ name: 'dynamic_form_item' })(NhapKho);