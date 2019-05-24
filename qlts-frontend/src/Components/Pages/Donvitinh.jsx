import React, { Component } from 'react';
import { Modal, Button, Table, Divider, Form, Input } from 'antd';
import { getAllDonViTinh, addNewDonViTinh, updateDonViTinh, deleteByListDonViTinh, deleteDonViTinh } from '../../Services/apiHuu';
import { checkDaiQua50KyTu, checkKyTuDacBiet } from '../../Utils/ValidateForm/NhapKhoValidate';

class Donvitinh extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            loading: false,
            data: [],
            columns: [
                {
                    title: 'Mã đơn vị',
                    dataIndex: 'maDonViTinh'
                },
                {
                    title: 'Tên đơn vị',
                    dataIndex: 'tenDonViTinh'
                },
                {
                    title: 'Mô tả',
                    dataIndex: 'moTa'
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
            fromData: {
                maDonViTinh: '',
                tenDonViTinh: '',
                moTa: ''
            }
        }
    }

    // tất cả các khi tích vào 
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    }
    // lấy tất cả tình trạng
    getAllDonViTinh = async () => {
        let data = await getAllDonViTinh();
        this.setState({
            data: data
        });
    }
    // chạy lại một lần nữa để lấy tất cả dữ liệu từ database 
    componentDidMount() {
        this.getAllDonViTinh();
    }
    // on table
    start = () => {
        this.setState({
            loading: true
        });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false
            })
        }, 1000);
    }
    // resert form
    handleCancel = (e) => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
            isUpdate: false,
            fromData: {
                maDonViTinh: '',
                tenDonViTinh: '',
                moTa: ''
            }
        });
    }
    //on modal form ===================================================
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    // onSubmitFrom
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(err)
            if (!err) {
                if (this.state.isUpdate === false) {
                    let res = await addNewDonViTinh(values);
                    if (res) {
                        this.setState({
                            data: [res, ...this.state.data]
                        });
                        this.handleCancel();
                    }
                } else {  /// update data
                    let res = await updateDonViTinh(values);
                    var item = this.state.data.find(function (element) {
                        return element.maDonViTinh === values.maDonViTinh;
                    });
                    item.maDonViTinh = res.maDonViTinh;
                    item.tenDonViTinh = res.tenDonViTinh;
                    item.moTa = res.moTa;
                    this.handleCancel();
                }
            }
        });
    }

    // update From
    editFunction = (record) => {
        this.setState({
            visible: true,
            isUpdate: true,
            fromData: record
        });
    }
    // delete data
    deleteFunction = async (record) => {
        if (window.confirm("xóa" + record.tenDonViTinh)) {
            await deleteDonViTinh(record.maDonViTinh);
            this.setState({
                data: this.state.data.filter(e => e.maDonViTinh !== record.maDonViTinh)
            });
        }
    }
    // deleteAdd data
    onDeleteAllRecord = async () => {
        if (window.confirm("xóa mục đã chọn")) {
            await deleteByListDonViTinh(this.state.selectedRowKeys);
            this.getAllDonViTinh();
            this.setState({
                selectedRowKeys: []
            });
        }
    }

    render() {
        const { selectedRowKeys, data, columns, loading } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;
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
                    icon="plus-square-o" onClick={this.showModal}>Thêm đơn vị tính</Button>
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
                    disabled={!hasSelected}
                    onClick={this.start}
                    loading={loading}
                >Bỏ chọn tất cả</Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Table rowKey='maDonViTinh' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={columns} dataSource={data} />
                <Modal
                    title={this.state.isUpdate === false ? "Tạo đơn vị tính" : "Cập nhật đơn vị tính"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button form="addDonViTinh" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Close </Button>
                    ]}
                >
                    <Form id="addDonViTinh" onSubmit={this.handleSubmit}>

                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên đơn vị"
                        >
                            {getFieldDecorator('tenDonViTinh', {
                                initialValue: this.state.fromData.tenDonViTinh,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên đơn vị!',
                                },  {
                                    validator : checkDaiQua50KyTu
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
                                initialValue: this.state.fromData.moTa,
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
export default Form.create()(Donvitinh);