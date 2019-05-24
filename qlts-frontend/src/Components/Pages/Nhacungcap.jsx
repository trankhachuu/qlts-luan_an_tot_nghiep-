import React, { Component } from 'react';
import { Modal, Button, Table, Divider, Form, Input } from 'antd';
import { getAllNhacungcap, addNewNhacungcap, deleteNhacungcap, deletebylistncc, updateNhacungcap } from '../../Services/apimanh1';
import { checkDaiQua2KyTu, checkKyTuDacBiet, checkDaiQua255KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';



class Nhacungcap extends Component {
    state = {
        visible: false,
        selectedRowKeys: [],
        loading: false,
        data: [],
        columns: [{
            title: 'Mã Nhà Cung Cấp',
            dataIndex: 'maNCC',
        }, {
            title: 'Tên Nhà Cung Cấp',
            dataIndex: 'tenNCC',
        }, {
            title: 'Địa Chỉ',
            dataIndex: 'diaChi',
        }, {
            title: 'Điều khiển',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                return <div>
                    <span className="span-link"
                        onClick={() => this.editFunction(record)}
                    >Chỉnh sửa</span>

                    <Divider type="vertical" />

                    <span className="span-link"
                        onClick={() => this.deleteFunction(record)}> Xóa</span>
                </div>
            }
        }],
        isUpdate: false,
        dataForm: {
            maNCC: '',
            tenNCC: '',
            diaChi: '',
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
            isUpdate: false,
            dataForm: {
                maNCC: '',
                tenNCC: '',
                diaChi: '',
            }
        });
    }
    // on table trong ham arrow function
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
    editFunction = (record) => {
        this.setState({
            dataForm: record,
            visible: true,
            isUpdate: true
        });
    }
    getAllNhacungcap = async () => {
        let data = await getAllNhacungcap();
        this.setState({
            data: data
        })
    }
    componentDidMount() {
        this.getAllNhacungcap();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.state.isUpdate === false) {
                    let res = await addNewNhacungcap(values);
                    if (res) {
                        this.setState({
                            data: [res, ...this.state.data]
                        });
                        this.handleCancel();
                    }
                } else {
                    let res = await updateNhacungcap(values);
                    var item = this.state.data.find(function (element) {
                        return element.maNCC === values.maNCC;
                    });
                    item.maNCC = res.maNCC;
                    item.tenNCC = res.tenNCC;
                    item.diaChi = res.diaChi;
                    this.handleCancel();
                }

            }
        })
    }

    deleteFunction = async (record) => {
        if (window.confirm("Xóa" + record.maNCC)) {
            await deleteNhacungcap(record.maNCC);
            this.setState({
                data: this.state.data.filter(e => e.maNCC !== record.maNCC)
            });
        }
    }

    onDeleteAllRecord = async () => {
        if (window.confirm("Xóa mục đã chọn?")) {
            await deletebylistncc(this.state.selectedRowKeys);
            this.getAllNhacungcap();
            this.setState({
                selectedRowKeys: []
            })
        }
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { getFieldDecorator } = this.props.form;
        const hasSelected = selectedRowKeys.length > 0;
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
                <Button
                    type="primary"
                    icon="plus-square-o" onClick={this.showModal}>Thêm Nhà Cung Cấp </Button>
                <Button
                    style={{ marginLeft: '5px' }}
                    type="danger"
                    onClick={this.onDeleteAllRecord}
                    disabled={!hasSelected}
                    loading={loading}
                >Xóa mục chọn</Button>
                <Button
                    style={{ marginLeft: '5px' }}
                    type="dashed"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={loading}
                >Bỏ chọn tất cả</Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                {console.log(rowSelection)}
                <Table rowKey='maNCC' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                <Modal
                    onCancel={this.handleCancel}
                    title={this.state.isUpdate === false ? "Thêm nhà cung cấp " : "Cập nhật nhà cung cấp"}
                    visible={this.state.visible}
                    footer={[
                        <Button form="addNCCForm" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>

                    ]}
                >
                    <Form id="addNCCForm" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Mã nhà cung cấp"
                        >
                            {getFieldDecorator('maNCC', {
                                initialValue: this.state.dataForm.maNCC,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập Mã nhà cung cấp!',
                                }, {
                                    validator : checkDaiQua2KyTu
                                },{
                                    validator : checkKyTuDacBiet
                                }],
                            })(
                                (this.state.isUpdate) === true ? <Input disabled /> : <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên nhà cung cấp"
                        >
                            {getFieldDecorator('tenNCC', {
                                initialValue: this.state.dataForm.tenNCC,
                                rules: [{
                                    min: 5, message: 'Tên Nhà Cung Cấp yêu cầu trên 5 kí tự',
                                }, {
                                    validator : checkDaiQua255KyTu
                                },{
                                    validator : checkKyTuDacBiet
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Địa chỉ"
                        >
                            {getFieldDecorator('diaChi', {
                                initialValue: this.state.dataForm.diaChi,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập địa chỉ!',
                                }, {
                                    validator : checkDaiQua255KyTu
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }

}
export default Form.create()(Nhacungcap);