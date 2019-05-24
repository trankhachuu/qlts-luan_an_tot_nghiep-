import React, { Component } from 'react';
import { Form, Button, Input, Divider, Table, Modal, Select, DatePicker } from 'antd';
import { getAllNhanVien, addNewNhanVien, updateNhanVien, getAllChucVu, getAllPhongBan, deleteNhanVien, deleteByListNhanVien } from '../../Services/apiHuu';
import moment from 'moment';
import 'moment/locale/vi';
import history from '../../Utils/history.js';
import { checkKyTuDacBiet, checkDaiQua10KyTu, checkDaiQua50KyTu, checkNgaySinh, checkDaiQua255KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';

const { Option } = Select;



class NhanVien extends Component {

    state = {
        visible: false,   // điều khiển form thêm mới có cho nó hiển thị hay không 
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,   // 
        data: [],
        columns: [{
            title: 'Mã nhân viên',
            dataIndex: 'maNhanVien',
        }
            , {
            title: 'Tên nhân viên',
            dataIndex: 'tenNhanVien',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaySinh',
        },
        {
            title: 'Quê quán',
            dataIndex: 'queQuan',
        },
        {
            title: 'Tên chức vụ',
            dataIndex: 'tenChucVu',
        },
        {
            title: 'Tên phòng ban',
            dataIndex: 'tenPhongBan',
        },
        {
            title: 'Điều khiển',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                return <div>
                    <span className="span-link" onClick={() => this.editFunction(record)}>Chỉnh sửa</span>
                    <Divider type="vertical" />
                    <span className="span-link" onClick={() => this.deleteFunction(record)}> Xóa</span>
                    <Divider type="vertical" />
                    <span className="span-link" onClick={() => this.handleViewLst(record)}> Xem DS TB</span>
                </div>
            }
        }],
        isUpdate: false,
        dataForm: {
            maNhanVien: '',
            tenNhanVien: '',
            ngaySinh: '',
            queQuan: '',
            tenChucVu: '',
            tenPhongBan: '',
        },
        chucvus: [],
        phongbans: [],
        filter: {
            name: ''
        },
        filtersName: ''
    }

    // hien form
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    rederOptionChucVu = async () => {
        var data = await getAllChucVu();
        this.setState({
            chucvus: data
        });
    }

    rederOptionPhongBan = async () => {
        var data = await getAllPhongBan();
        this.setState({
            phongbans: data
        });
    }

    handleViewLst = (record) => {
        history.push('/app/dstb-by-nhanvien/' + record.maNhanVien);
    }

    handleCancel = (e) => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
            isUpdate: false,
            dataForm: {
                maNhanVien: '',
                tenNhanVien: '',
                ngaySinh: '',
                queQuan: '',
                maChucVu: '',
                maPhongBan: '',
            }
        });
    }

    // on table
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

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
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

    getAllNhanVien = async () => {
        let data = await getAllNhanVien();
        data.forEach(element => {
            element.ngaySinh = moment(element.ngaySinh).format('DD/MM/YYYY');
        });
        this.setState({
            data: data
        });
    }
    // life cycle
    componentDidMount() {
        this.rederOptionChucVu();
        this.rederOptionPhongBan();
        this.getAllNhanVien();
    }
     // cập nhật nhân viên
     editFunction = (record) => {
        this.setState({
            dataForm: record,
            visible: true,
            isUpdate: true
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.state.isUpdate === false) {
                    let res = await addNewNhanVien(values);
                    res.ngaySinh = moment(res.ngaySinh).format('DD/MM/YYYY');
                    if (res) {
                        this.setState({
                            data: [res, ...this.state.data]
                        });
                        this.handleCancel();
                    }
                } else {
                    let res = await updateNhanVien(values);
                    var item = this.state.data.find(function (element) {
                        return element.maNhanVien === values.maNhanVien;
                    });
                    item.maNhanVien = res.maNhanVien;
                    item.tenNhanVien = res.tenNhanVien;
                    item.ngaySinh = moment(res.ngaySinh).format('DD/MM/YYYY');
                    item.queQuan = res.queQuan;
                    item.tenChucVu = res.tenChucVu;
                    item.tenPhongBan = res.tenPhongBan;
                    this.handleCancel();
                }
            }
        });
    }
    // xóa từng nhân viên 
    deleteFunction = async (record) => {
        if (window.confirm("Xóa " + record.maNhanVien)) {
            await deleteNhanVien(record.maNhanVien);
            this.setState({
                data: this.state.data.filter(e => e.maNhanVien !== record.maNhanVien)
            });
        }

    }
    /// xóa mục chọn
    onDeleteAllRecord = async () => {
        if (window.confirm("Xóa mục đã chọn?")) {
            await deleteByListNhanVien(this.state.selectedRowKeys);
            this.getAllNhanVien();
            this.setState({
                selectedRowKeys: []
            })
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.onFilter(
            name === 'filtersName' ? value : this.state.filtersName
        )
        this.setState({
            [name]: value
        });
    }

    onFilter = (filtersName) => {
        this.setState({
            filter: {
                // toLowerCase chuyển về ký tự thường 
                name: filtersName.toLowerCase()
            }
        });
    }

    render() {
        var { loading, selectedRowKeys, filtersName, filter, data, chucvus } = this.state;
        if (filter) {
            if (filter.name) {
                data = data.filter((element) => {
                    return element.tenNhanVien.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
        }
        var rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        var hasSelected = selectedRowKeys.length > 0;
        //setup form
        const { getFieldDecorator } = this.props.form;
        var formItemLayout = {
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
                <Button
                    type="primary"
                    icon="plus-square-o" onClick={this.showModal}>Thêm nhân viên</Button>
                <Button
                    style={{ marginLeft: '5px' }}
                    type="danger"
                    disabled={!hasSelected}
                    loading={loading}
                    onClick={this.onDeleteAllRecord}
                >Xóa mục chọn</Button>
                <Button
                    style={{ marginLeft: '5px' }}
                    type="dashed"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={loading}
                >Bỏ chọn tất cả</Button>
                <Input
                    placeholder="On search name"
                    style={{ width: '20%', marginLeft: '5px' }}
                    name="filtersName"
                    value={filtersName}
                    onChange={this.onChange}

                />
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Table rowKey='maNhanVien' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={data} />
                <Modal
                    title={this.state.isUpdate === false ? "Tạo tình nhan viên" : "Cập nhật nhân viên"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button form="nhanVienFrom" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Close </Button>
                    ]}
                >
                    <Form id="nhanVienFrom" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Mã nhân viên"
                        >
                            {getFieldDecorator('maNhanVien', {
                                initialValue: this.state.dataForm.maNhanVien,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập ma!',
                                },{
                                    validator : checkKyTuDacBiet, 
                                }, {
                                    validator : checkDaiQua10KyTu
                                }],
                            })(
                                (this.state.isUpdate) === true ? <Input disabled /> : <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên nhân viên"
                        >
                            {getFieldDecorator('tenNhanVien', {
                                initialValue: this.state.dataForm.tenNhanVien,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên nhân viên!',
                                },{
                                    validator : checkKyTuDacBiet, 
                                }, {
                                    validator : checkDaiQua50KyTu
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Ngày Sinh"
                        >
                            {getFieldDecorator('ngaySinh', {
                                initialValue: moment(this.convertDay(this.state.dataForm.ngaySinh), 'DD/MM/YYYY'),
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập ngày sinh!',
                                }, {
                                    validator : checkNgaySinh
                                }]
                            })(
                                <DatePicker format='DD/MM/YYYY' />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Quê quán"
                        >
                            {getFieldDecorator('queQuan', {
                                initialValue: this.state.dataForm.queQuan,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập quê quán!',
                                }, {
                                    validator : checkDaiQua255KyTu
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>


                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên chức vụ"
                        >
                            {getFieldDecorator('maChucVu', {
                                initialValue: this.state.dataForm.tenChucVu,
                                rules: [{ required: true, message: 'Chức vụ yêu cầu chọn!' }],
                            })(
                                <Select
                                    placeholder="Chọn chức vụ"
                                >
                                    {
                                       chucvus.map(element => <Option key={element.maChucVu} value={element.maChucVu}>{element.tenChucVu}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên phòng ban"
                        >
                            {getFieldDecorator('maPhongBan', {
                                initialValue: this.state.dataForm.tenPhongBan,
                                rules: [{ required: true, message: 'Phòng ban yêu cầu chọn!' }],
                            })(
                                <Select
                                    placeholder="Chọn phòng ban"
                                >
                                    {
                                        this.state.phongbans.map(element => <Option key={element.maPhongBan} value={element.maPhongBan} >{element.tenPhongBan}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(NhanVien);