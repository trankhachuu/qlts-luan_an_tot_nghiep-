import React, { Component } from 'react';
import { List, Avatar, Row, Col, Button, Form, Input, Empty, message } from 'antd';
import ModalAddThietBi from './ModalAddThietBi';
import CommitAdd from './CommitAdd';
import { getMaxIDThietBi } from '../../../Services/api.js';
import { connect } from 'react-redux';
import { handleCHeckInputCode } from '../../../Utils/ValidateForm/NhapKhoValidate';

let id = 0;
let thietBiID = 0;
class NhapKho1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstMapping: {

            },
            thietBiIsSelected: '',
            keySelected: '',
            objSelectedtypeCode: {
                maLoaiThietBi: '',
                maNhomThietBi: '',
                soLuong: '',
                maDonViTinh: null,
                dongia: '',
                baoHanh: '',
                khauHao: ''
            },
            visibleadd: false,
            maMax: -1,
            maNhaCungCap: null,
            isUpdateThongTin: false,
        }
    }

    // on modal
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            isUpdateThongTin: false
        });
    }
    // on modal submit nhap kho
    showModalAdd = () => {
        this.setState({
            visibleadd: true,
        });
    }

    handleCancelAdd = (e) => {
        this.setState({
            visibleadd: false
        });
    }

    // render form
    add = () => {
        console.log("-")
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    remove = (k) => {
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
    }

    handleClickItem = async (key) => {
        this.removeAll();
        let obj = this.props.nhapkho.find(element => {
            return element.maNhomThietBi === key
        });

        await this.setState({ objSelectedtypeCode: obj, keySelected: key + "__" })

        if (obj.lstMaThietBi.length === 0) {
            let i = 0
            let max = obj.soLuong;
            while (i < max) {
                this.add();
                i++;
            }
        } else {
            await this.addField(obj.soLuong);
            this.addMaTheoMaCoSan(obj.lstMaThietBi, obj.soLuong);
        }
    }

    addField = async (soLuong) => {
        for (let i = 0; i < soLuong; i++) {
            this.add();
        }
    }

    removeAll = () => {
        var { getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');

        for (var i = 0; i < keys.length; i++) {
            this.remove(keys[i])
        }
    }

    addMaTheoMaCoSan = (lstMa, soLuong) => {
        // lstMa = lstMa[0];
        var { getFieldValue, setFieldsValue } = this.props.form;
        const keys = getFieldValue('keys');

        for (var i = 0; i < soLuong; i++) {
            setFieldsValue({ [`names[${keys[i]}]`]: lstMa[i] });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var obj = this.state.objSelectedtypeCode;
                let valuesNew = values.names.filter(element => { return element !== null });
                let obj2 = { ...obj, lstMaThietBi: valuesNew }
                let { dispatch } = this.props;
                dispatch({
                    type: 'UPDATE_ITEM_TO_LST_NHAP',
                    item: obj2
                });
                message.success("Lưu thành công.");
            }

        });
    }

    handleClickUpdateThongTin = () => {
        this.setState({
            isUpdateThongTin: true,
            visible: true
        });
    }

    addMaTuDong = () => {
        var { getFieldValue, setFieldsValue } = this.props.form;
        const keys = getFieldValue('keys');
        var { maMax } = this.state;
        for (var item of keys) {
            setFieldsValue({ [`names[${item}]`]: maMax });
            maMax++;
        }
        this.setState({ maMax: maMax });
    }

    removeAllMa = () => {
        var { getFieldValue, setFieldsValue } = this.props.form;
        const keys = getFieldValue('keys');
        var { maMax } = this.state;
        for (var item of keys) {
            setFieldsValue({ [`names[${item}]`]: '' });
        }
    }

    handleClickLuuVaoKho = () => {
        this.setState({ visibleadd: true })
    }

    loadData = async () => {
        let maMax = await getMaxIDThietBi();
        let maNCC = this.props.match.params.id;
        this.setState({ maMax: maMax, maNhaCungCap: maNCC });
    }

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'UPDATE_NHAPKHO_DATA',
            item: []
        })
        this.loadData();
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
                        message: "Vui lòng nhập mã cho trường này.",
                    }, {
                            validator: handleCHeckInputCode
                    }],
                })(
                    <Input name={`names[${k}]`} placeholder={`Nhập mã cho thiết bị ${index + 1}/${this.state.objSelectedtypeCode.soLuong}`} style={{ width: '80%', marginRight: 8 }} />
                )}
            </Form.Item>
        ));


        return (
            <div>
                <Row>
                    <Col span={8} style={{ overflowY: 'scroll', height: 'calc(100vh - 120px)' }}>
                        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                            <Button type="dashed" onClick={this.showModal}>Thêm mới thiết bị</Button>
                            {
                                this.props.nhapkho.length > 0 ?
                                    <span>
                                        <Button onClick={this.handleClickLuuVaoKho} style={{ marginLeft: '5px' }} type="primary">Lưu vào kho</Button>
                                        <Button style={{ marginLeft: '5px' }} type="danger">Lưu kho và in</Button>
                                    </span>
                                    :
                                    <span>
                                        <Button disabled style={{ marginLeft: '5px' }} type="primary">Lưu vào kho</Button>
                                        <Button disabled style={{ marginLeft: '5px' }} type="danger">Lưu kho và in</Button>
                                    </span>
                            }
                        </div>
                        {/* List danh sách thiết bị đã this */}
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.nhapkho}
                            renderItem={item => (
                                // style = { item.tinhTrangPhieu === "cho_sua_chua" ? { background: 'linear-gradient(141deg, #ecdec3c4 0%, #e6d4b2c9 51%, #f3eca8 75%)' } : item.tinhTrangPhieu === 'sua_chua' ? { background: '#f1f1f1' } : { background: 'none' } }
                                <List.Item key={item.maNhomThietBi} className={item.maNhomThietBi + "__" === this.state.keySelected ? "item_list_custom_active" : "item_list_custom"} onClick={() => this.handleClickItem(item.maNhomThietBi)} style={item.lstMaThietBi.length === 0 ? { background: 'linear-gradient(141deg, #ecdec3c4 0%, #e6d4b2c9 51%, #f3eca8 75%)' } : item.soLuong > item.lstMaThietBi.length ? { background: '#f1f1f1' } : { background: 'none' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src="http://localhost:3000/biennhan.png" />}
                                        title={item.tenThietBi}
                                        description={`Số lượng: ${item.soLuong}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={16} style={{ height: '100%', paddingLeft: '10px' }}>

                        <div className="ant-row ant-form-item">
                            <div className="ant-col ant-form-item-control-wrapper ant-col-xs-24 ant-col-xs-offset-0 ant-col-sm-24 ant-col-sm-offset-2">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        {this.state.objSelectedtypeCode !== null &&  this.state.objSelectedtypeCode.maNhomThietBi != ''
                                            ?
                                            <div>
                                                <Button onClick={this.addMaTuDong} style={{ marginRight: '5px' }} type="dashed">Nhập mã tự động</Button>
                                                <Button type="dashed" style={{ marginRight: '5px' }} onClick={this.handleClickUpdateThongTin}>Chỉnh sửa thông tin</Button>
                                                <Button type="danger" style={{ marginRight: '5px' }} onClick={() => {
                                                    var r = window.confirm("Xóa tất cả mã!");
                                                    if (r == true) {
                                                        this.removeAllMa();
                                                    }
                                                }}>Xóa mã đã nhập</Button>
                                                <Button id="button_luu_ma" form="submit_form_luuma" type="primary" htmlType="submit">Lưu danh sách mã</Button>
                                            </div>
                                            : <div style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase', fontWeight: 'bold'}}>Thêm & chọn thiết bị trước</div>}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Form id="submit_form_luuma" onSubmit={this.handleSubmit}>
                            {formItems}

                            {
                                this.state.objSelectedtypeCode !== null ?
                                    ''
                                    :
                                    <div style={{ textAlign: 'center', marginTop: '95px' }}> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
                            }
                        </Form>
                    </Col>
                    <ModalAddThietBi handleChangeMa={this.handleClickItem} isUpdate={this.state.isUpdateThongTin} dataForm={this.state.objSelectedtypeCode} maNhaCungCap={this.props.match.params.id} visibleModal={this.state.visible} handleCancel={this.handleCancel}></ModalAddThietBi>
                    <CommitAdd maNhaCungCap={this.state.maNhaCungCap} visibleModal={this.state.visibleadd} handleCancel={this.handleCancelAdd}></CommitAdd>
                </Row>
            </div>
        );
    }
}

const FormCreate = Form.create({ name: 'dynamic_form_item' })(NhapKho1);

export default connect(function (state) {
    return { nhapkho: state.nhapkho }
})(FormCreate);