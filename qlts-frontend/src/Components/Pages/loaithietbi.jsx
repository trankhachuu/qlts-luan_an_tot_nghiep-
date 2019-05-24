import React, { Component } from 'react';
import { message, Row, Col, Button, Menu, Table, Divider, Modal, Form, Input, TreeSelect, Icon, Select } from 'antd';
import { gettenloaitbcha, addloaitb, updateloaitb, gettenloaibymaloai, getAllloaitb, deletetliaotbbyID, deletebylistloaitb } from '../../Services/apimanh';
import { getAllNhacungcap } from '../../Services/apimanh1';
import { getLoaiTBByNhaCungCap } from '../../Services/api';
import { checkDaiQua3KyTu, checkKyTuDacBiet, checkDaiQua50KyTu, checkDaiQua255KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';

const Option = Select.Option;
class loaitb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhaCungCap: [],
            loaiTbs: [],
            loaitb: [],
            data: [],
            visible: false,
            isUpdate: false,
            themLoaiCha: false,// đặt mặc định thêm loại con khi nào nhấn thêm loại cha thì set lại trạng thái là true
            themncc: false,
            maloaiduocchon: '',
            columns: [{
                title: 'Mã loại',
                dataIndex: 'maLoai',
            },
            {
                title: 'Tên loại ',
                dataIndex: 'tenLoai',
            },
            {
                title: 'Mô tả',
                dataIndex: 'moTa',
            },
            {
                title: 'Mã loại cha',
                dataIndex: 'maLoaiCha',
            },
            {
                title: 'Điều khiển',
                fixed: 'right',
                width: 170,
                render: (text, record) => {
                    return <div>
                        <span className="span-link"
                            onClick={() => this.editloaitb(record)}
                        >Chỉnh sửa</span>

                        <Divider type="vertical" />

                        <span className="span-link"
                            onClick={() => this.deletethietbi(record)}> Xóa</span>
                    </div>
                }
            }],
            selectedRowKeys: [], // Check here to configure the default column
            dataForm: {
                maLoai: '',
                tenLoai: '',
                moTa: '',
                maLoaiCha: '',
                maNCC: ''
            },
            tenloaiData: [],
            defaultSelectKey: [],
            maLoaiSelected: null
        }
    }
    editloaitb = (record) => {
        this.setState({
            dataForm: record,
            visible: true,
            isUpdate: true
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    getloaicha = async () => {
        let loaiTbs = await gettenloaitbcha();
        this.setState({
            loaiTbs: loaiTbs
        });
    }

    getLoaiChaFirst = async () => {
        try {
            let loaiTbs = await gettenloaitbcha();
            let tenloai = await gettenloaibymaloai();
            let loaitb = await getAllloaitb();
            let nhaCungCap = await getAllNhacungcap();

            this.setState({ nhaCungCap: nhaCungCap })
            await this.setState({
                loaiTbs: loaiTbs,
                defaultSelectKey: [this.state.maloaiduocchon === '' ? loaiTbs[0].maLoai : this.state.maloaiduocchon],
                maloaiduocchon: this.state.maloaiduocchon === '' ? loaiTbs[0].maLoai : this.state.maloaiduocchon,
                tenloai: tenloai,
                loaitb: loaitb,

            });
            console.log(this.state.nhaCungCap)
            this.getLoaiCon(this.state.maloaiduocchon);
        } catch (e) { }



    }
    componentDidMount() {
        this.getLoaiChaFirst();
    }

    mapLoaitb = () => {
        return this.state.loaiTbs.map(item => {
            return (
                <Menu.Item key={item.maLoai}>
                    <span>{item.tenLoai}</span>
                </Menu.Item>
            )
        })
    }

    mapLoaiTBToSelected = () => {
        return this.state.loaiTbs.map(element => {
            return (
                <Option key={element.maLoai} value={element.maLoai}>
                    {element.tenLoai}
                </Option>
            )
        })
    }

    mapNCCtoselect = () => {
        return this.state.nhaCungCap.map(element => {
            return (
                <Option key={element.maNCC} value={element.maNCC}>
                    {element.tenNCC}
                </Option>
            )
        })
    }

    handleClickTHemLoaiTHietBi = () => {
        this.showModal();
        this.setState({
            themLoaiCha: true,
            themncc: true
        })
    }

    handleCapNhatLoaiCha = () => {
        var { maloaiduocchon, loaiTbs } = this.state;
        var objLoai = loaiTbs.find(element => {
            return element.maLoai === maloaiduocchon;
        });

        this.setState({
            dataForm: {
                maLoai: objLoai.maLoai,
                tenLoai: objLoai.tenLoai,
                moTa: objLoai.moTa,
                maLoaiCha: objLoai.maLoaiCha,
                maNCC: objLoai.maNCC
            },
            isUpdate: true
        })

        this.handleClickTHemLoaiTHietBi();
    }


    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    deletethietbi = async (record) => {
        if (window.confirm("Xóa: " + record.maLoai)) {
            await deletetliaotbbyID(record.maLoai);
            this.getLoaiCon(this.state.maloaiduocchon);
        }

    }

    deletethietbicha = async () => {
        if (window.confirm("Xóa mục đã chọn " + this.state.maloaiduocchon)) {
            await deletetliaotbbyID(this.state.maloaiduocchon);
            this.getloaicha();
        }
    }


    onDeleteAllRecord = async () => {
        if (window.confirm("Xóa mục đã chọn")) {
            await deletebylistloaitb(this.state.selectedRowKeys);
            this.getLoaiCon(this.state.maloaiduocchon);
            this.setState(
                {
                    selectedRowKeys: []
                }
            )
        }
    }

    handleCancel = (e) => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
            isUpdate: false,
            dataForm: {
                maLoai: '',
                tenLoai: '',
                moTa: '',
                maLoaiCha: '',
                maNCC: '',
            },
            themLoaiCha: false,
            themncc: false
        });
    }

    handleOnClickItem = (e) => {
        let maLoai = e.key;
        this.getLoaiCon(maLoai);
        this.setState({
            defaultSelectKey: [maLoai],
            maLoaiSelected: e.key
        })
    }

    getLoaiCon = async (maLoai) => {
        let tenloai = await gettenloaibymaloai(maLoai);
        this.setState({
            maloaiduocchon: maLoai,
            tenloaiData: tenloai,
        });
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(values)
            if (!err) {

                if (this.state.themLoaiCha === true) {
                    if (this.state.themLoaiCha === true)
                        values.maLoaiCha = null;
                    //su ly voi loai cha
                    if (this.state.isUpdate === true) {
                        // cap nhat loai cha
                        let res = await updateloaitb(values);
                        this.getloaicha();
                        this.handleCancel();
                    } else {
                        //them loai cha
                        let res = await addloaitb(values);
                        if (res) {
                            this.handleCancel();
                            this.getloaicha();
                        }
                    }

                } else {
                    //su ly voi loai con
                    if (this.state.isUpdate === true) {
                        // cap nhat loai con
                        values.maLoaiCha = this.state.maloaiduocchon
                        let res = await updateloaitb(values);
                        this.getLoaiCon(this.state.maloaiduocchon);
                        this.handleCancel();
                    } else {
                        //them loai con
                        values.maLoaiCha = this.state.maloaiduocchon
                        let res = await addloaitb(values);
                        if (res) {
                            this.setState({
                                tenloaiData: [res, ...this.state.tenloaiData]
                            });
                            this.getLoaiCon(this.state.maloaiduocchon);

                            this.handleCancel();
                        }
                    }
                }
            }
        })

    }

    onChangeNhaCungCap = async (value) => {
        console.log(`selected ${value}`);
        let data = await getLoaiTBByNhaCungCap(value);
        this.setState({
            tenloaiData: data
        });
    }

    render() {
        const { loading, selectedRowKeys, loaitb, nhaCungCap } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
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

        const hasSelected = selectedRowKeys.length > 0;

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={8} lg={6} xl={7} style={{ padding: '10px', backgroundColor: '#fafafa' }}>
                        <Button
                            size="small"
                            type="primary"
                            icon="plus-square-o" onClick={this.handleClickTHemLoaiTHietBi}>Thêm loại thiết bị</Button>

                        {
                            this.state.maloaiduocchon.length === 0
                                ?
                                <Button
                                    disabled
                                    style={{ marginLeft: '5px' }}
                                    size="small"
                                    type="danger"
                                    icon="minus"
                                    onClick={this.deletethietbicha}
                                >Xóa mục chọn
                            </Button>
                                :
                                <Button
                                    style={{ marginLeft: '5px' }}
                                    size="small"
                                    type="danger"
                                    icon="minus"
                                    onClick={this.deletethietbicha}
                                >Xóa mục chọn
                            </Button>
                        }

                        {
                            this.state.maloaiduocchon.length === 0
                                ?
                                <Button
                                    disabled
                                    style={{ marginTop: '7px', margin: 'center' }}
                                    size="small"
                                    type="primary"
                                    icon="plus-square-o" onClick={this.handleCapNhatLoaiCha}>Cập nhật loại thiết bị</Button>
                                :
                                <Button
                                    style={{ marginTop: '7px', margin: 'center' }}
                                    size="small"
                                    type="primary"
                                    icon="plus-square-o" onClick={this.handleCapNhatLoaiCha}>Cập nhật loại thiết bị</Button>
                        }


                        <Menu style={{ background: 'none', marginTop: '10px' }}
                            className="left_menu"
                            onClick={this.handleOnClickItem}
                            mode="inline"
                            selectedKeys={this.state.defaultSelectKey}>
                            {this.mapLoaitb()}
                        </Menu>

                        <Divider />
                        <h4>Lọc theo nhà cung cấp</h4>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn loại nhà cung cấp"
                            optionFilterProp="children"
                            onChange={this.onChangeNhaCungCap}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {nhaCungCap ? nhaCungCap.map(element => <Option key={element.maNCC} value={element.maNCC}>{element.tenNCC}</Option>) :
                                <Option value=""></Option>
                            }
                        </Select>

                        <Modal
                            onCancel={this.handleCancel}
                            title={this.state.isUpdate === false ? "Thêm loại thiết bị mới" : "Cập nhật loại thiết bị"}
                            visible={this.state.visible}
                            footer={[
                                <Button form="addloaitbForm" key="submit" type="primary" htmlType="submit">
                                    Submit </Button>,
                                <Button key="cancel" onClick={this.handleCancel}>
                                    Đóng </Button>
                            ]}
                        >
                            <Form id="addloaitbForm" onSubmit={this.handleSubmit}>
                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Mã loại thiết bị"
                                >
                                    {getFieldDecorator('maLoai', {
                                        initialValue: this.state.dataForm.maLoai,
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập Mã loại chỉ với 3 ký tự!',
                                        }, {
                                            validator: checkDaiQua3KyTu
                                        }, {
                                            validator: checkKyTuDacBiet
                                        }],
                                    })(
                                        (this.state.isUpdate) === true ? <Input disabled /> : <Input />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Tên loại thiết bị"
                                >
                                    {getFieldDecorator('tenLoai', {
                                        initialValue: this.state.dataForm.tenLoai,
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập tên loại!',
                                        }, {
                                            validator: checkDaiQua50KyTu
                                        }, {
                                            validator: checkKyTuDacBiet
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Mô tả"
                                >
                                    {getFieldDecorator('moTa', {
                                        initialValue: this.state.dataForm.moTa,
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập mô tả!',
                                        }, {
                                            validator: checkDaiQua255KyTu
                                        }, {
                                            validator: checkKyTuDacBiet
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    hasFeedback
                                    label="Chọn NCC"
                                >
                                    {getFieldDecorator('maNCC', {
                                        initialValue: this.state.dataForm.maNCC
                                    })(
                                        this.state.themncc == false ?
                                            <Select
                                                initialValue={this.state.dataForm.maNCC}
                                                value="disabled" disabled
                                                style={{ width: '100%' }}
                                                onChange={this.handleselectchangeLoai}
                                            /> :
                                            <Select
                                                style={{ width: '100%' }}
                                                onChange={this.handleselectchangeLoai}
                                            >
                                                {this.mapNCCtoselect()}
                                            </Select>
                                    )
                                    }
                                </Form.Item>

                            </Form>
                        </Modal>

                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18} xl={17} style={{ padding: '10px' }}>
                        <Button
                            size="small"
                            type="primary"
                            icon="plus-square-o" onClick={this.showModal}>Thêm thiết bị</Button>
                        <Button
                            size="small"
                            style={{ marginLeft: '5px' }}
                            type="danger"
                            onClick={this.onDeleteAllRecord}
                            disabled={!hasSelected}
                            loading={loading}
                        >Xóa mục chọn</Button>
                        <Button
                            size="small"
                            style={{ marginLeft: '5px' }}
                            type="dashed"
                            onClick={this.start}
                            disabled={!hasSelected}
                            loading={loading}
                        >Bỏ chọn tất cả</Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                        <Table rowKey='maLoai' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.tenloaiData} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create()(loaitb);