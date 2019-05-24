import React, { Component } from 'react';
import { Modal, Button, Table, Divider, Form, Input } from 'antd';
import { getAllUser, addNewUser, updateUser, deleteUser, deleteByList } from "../../Services/api";
import { Link } from 'react-router-dom';
import { checkKyTuDacBiet, checkDaiQua10KyTu, checkDaiQua100KyTu, checkDaiQua50KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';

class Users extends Component {
    state = {
        visible: false,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        columns: [{
            title: 'ID',
            dataIndex: 'userID',
        }, {
            title: 'Họ tên',
            dataIndex: 'fullName',
        }, {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
        }, {
            title: 'Mật khẩu',
            dataIndex: 'password'
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

                    <Divider type="vertical" />

                    <Link className="span-link" to={"/app/permission/" + record.userID}>Phân quyền</Link>

                </div>
            }
        }],
        isUpdate: false,
        isProcess: false,
        dataForm: {
            fullName: '',
            username: ''
        }
    }


    //on modal form
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
                fullName: '',
                username: ''
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

    editFunction = (record) => {
        this.setState({
            dataForm: record,
            visible: true,
            isUpdate: true
        });
    }

    // send request to get data
    getAllUser = async () => {
        let data = await getAllUser();
        this.setState({
            data: data
        });
    }

    // function in life cycle
    componentDidMount() {
        this.getAllUser();
    }

    //submitform
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.isProcess === false) {
            this.setState({ isProcess: true })
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    if (this.state.isUpdate === false) {
                        let res = await addNewUser(values);
                        if (res) {
                            this.setState({
                                data: [res, ...this.state.data]
                            });
                            this.handleCancel();
                            this.setState({ isProcess: false })
                        }
                    } else {
                        let res = await updateUser(values);
                        var item = this.state.data.find(function (element) {
                            return element.userID === values.userID;
                        });

                        item.userID = res.userID;
                        item.username = res.username;
                        item.fullName = res.fullName;
                        this.handleCancel();
                        this.setState({ isProcess: false })
                    }
                }
            });
        }

    }

    deleteFunction = async (record) => {
        if (window.confirm("Xóa " + record.fullName)) {
            await deleteUser(record.userID);
            this.setState({
                data: this.state.data.filter(e => e.userID !== record.userID)
            });
        }
    }

    onDeleteAllRecord = async () => {
        if (window.confirm("Xóa mục đã chọn?")) {
            await deleteByList(this.state.selectedRowKeys);
            this.getAllUser();
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
        const hasSelected = selectedRowKeys.length > 0;

        //setup form
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
                <Button
                    type="primary"
                    icon="plus-square-o" onClick={this.showModal}>Thêm user</Button>
                <Button
                    style={{ marginLeft: '5px' }}
                    type="danger"
                    onClick={this.onDeleteAllRecord}
                    disabled={!hasSelected}
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
                <Table rowKey='userID' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                <Modal
                    onCancel={this.handleCancel}
                    title={this.state.isUpdate === false ? "Tạo tài khoản mới" : "Cập nhật tài khoản"}
                    visible={this.state.visible}
                    footer={[
                        <Button form="addUserForm" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>
                    ]}
                >
                    <Form id="addUserForm" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="User ID"
                        >
                            {getFieldDecorator('userID', {
                                initialValue: this.state.dataForm.userID,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập ID!',
                                },{
                                    validator : checkKyTuDacBiet
                                },{
                                    validator : checkDaiQua10KyTu
                                }],
                            })(
                                (this.state.isUpdate) === true ? <Input disabled /> : <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Họ tên"
                        >
                            {getFieldDecorator('fullName', {
                                initialValue: this.state.dataForm.fullName,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập họ tên!',
                                }, {
                                    validator : checkKyTuDacBiet
                                },{
                                    validator : checkDaiQua100KyTu
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên đăng nhập"
                        >
                            {getFieldDecorator('username', {
                                initialValue: this.state.dataForm.username,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên đăng nhập!',
                                },{
                                    validator : checkKyTuDacBiet
                                },{
                                    validator : checkDaiQua50KyTu
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Mật khẩu"
                        >
                            {getFieldDecorator('password', {
                                rules : [{
                                    required: true, message: 'Yêu cầu nhập password!',
                                },{
                                    validator : checkKyTuDacBiet
                                },{
                                    validator : checkDaiQua100KyTu
                                }]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(Users);