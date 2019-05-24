import React, { Component } from 'react';
import { Modal, Button, Table, Divider, Form, Input } from 'antd';
import { getAllTinhTrang, addNewTinhTrang, updateTinhTrang, deleteTinhTrang, deleteByListTinhTrang } from "../../Services/apiHuu";
import { checkDaiQua5KyTu, checkKyTuDacBiet, checkDaiQua100KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';


class TinhTrang extends Component {

    state = {
        visible: false,   // điều khiển form thêm mới có cho nó hiển thị hay không 
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,   // 
        data: [],
        columns: [{
            title: 'Mã Tình Trạng',
            dataIndex: 'maTinhTrang',
        }
            , {
            title: 'Tên Tình Trạng',
            dataIndex: 'tenTinhTrang',
        }, {
            title: 'Mô tả',
            dataIndex: 'moTa',
        },
        {
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
            maTinhTrang: '',
            tenTinhTrang: '',
            moTa: ''
        }
    }
    //on modal form ===================================================
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
                maTinhTrang: '',
                tenTinhTrang: '',
                moTa: ''
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

    getAllTinhTrang = async () => {
        let data = await getAllTinhTrang();
        this.setState({
            data: data
        });
    }

    // function in life cycle
    componentDidMount() {
        this.getAllTinhTrang();
    }

    //submitform
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.state.isUpdate === false) {
                    let res = await addNewTinhTrang(values);
                    if (res) {
                        this.setState({
                            data: [res, ...this.state.data]
                        });
                        this.handleCancel();
                    }
                    console.log(res);
                }else {
                    let res = await updateTinhTrang(values);
                    var item = this.state.data.find(function (element) {
                        return element.maTinhTrang === values.maTinhTrang;
                    });

                    item.maTinhTrang = res.maTinhTrang;
                    item.tenTinhTrang = res.tenTinhTrang;
                    item.moTa = res.moTa;
                    this.handleCancel();
                }
            }
        });
    }

    deleteFunction = async (record) => {
        if (window.confirm("Xóa " + record.maTinhTrang)) {
            await deleteTinhTrang(record.maTinhTrang);
            this.setState({
                data: this.state.data.filter(e => e.maTinhTrang !== record.maTinhTrang)
            });
        }
        console.log(record);
    }

    onDeleteAllRecord = async () => {
        if (window.confirm("Xóa mục đã chọn?")) {
            await deleteByListTinhTrang(this.state.selectedRowKeys);
            this.getAllTinhTrang();
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
//initialValue giá trị khởi tạo 
        return (
            <div>
                <Button
                    type="primary"
                    icon="plus-square-o" onClick={this.showModal}>Thêm tình trạng</Button>
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
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Table rowKey='maTinhTrang' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                <Modal
                    title={this.state.isUpdate === false ? "Tạo tình trạng mới" : "Cập nhật tình trạng"}
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
                            label="Mã tình trạng"
                        >
                            {getFieldDecorator('maTinhTrang', {
                                initialValue: this.state.dataForm.maTinhTrang, 
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập mã tình trạng!',
                                }, {
                                    validator : checkDaiQua5KyTu
                                }, {
                                    validator : checkKyTuDacBiet
                                }]
                            })(
                                (this.state.isUpdate) === true ? <Input disabled /> : <Input />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên tình trạng"
                        >
                            {getFieldDecorator('tenTinhTrang', {
                                initialValue: this.state.dataForm.tenTinhTrang,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên tình trạng!',
                                },  {
                                    validator : checkDaiQua100KyTu
                                }, {
                                    validator : checkKyTuDacBiet
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
export default Form.create()(TinhTrang);
