import React, { Component } from 'react';
import { Modal, Button, Table, Divider, Form, Input } from 'antd';
import { getAllChucvu, addNewChucvu, updateChucvu, deleteChucVu } from '../../Services/apimanh';
import { checkDaiQua50KyTu, checkKyTuDacBiet, checkDaiQua255KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';

class Chucvu extends Component{
    state = {
        visible: false,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        columns:[{
            title: 'Mã chức vụ',
            dataIndex: 'maChucVu'
        },{
            title:'Tên Chức vụ',
            dataIndex:'tenChucVu'
        },{
            title:'Mô tả',
            dataIndex: 'moTa'
        },{
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
        maChucVu:'',
        tenChucVu:'',
        moTa:'',
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
                maChucVu : '',
                tenChucVu: '',
                moTa:'',
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
    getAllChucvu = async () => {
        let data = await getAllChucvu();
        this.setState({
            data: data
        });
    }
    componentDidMount(){
        this.getAllChucvu();
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                if(this.state.isUpdate === false){
                    let res = await addNewChucvu(values);
                    if(res){
                        this.setState({
                            data:[res, ...this.state.data]
                        });
                        this.handleCancel();
                    }
                }else{
                    let res = await updateChucvu(values);
                    var item = this.state.data.find(function(element){
                        return element.maChucVu === values.maChucVu;
                    });

                    item.maChucVu = res.maChucVu;
                    item.tenChucVu = res.tenChucVu;
                    item.moTa = res.moTa;
                    this.handleCancel();
        
                }

            }
        } )
    }
    deleteFunction = async(record) =>{
        if(window.confirm("Xóa" + record.maChucVu)){
            await deleteChucVu(record.maChucVu);
            this.setState({
                data: this.state.data.filter(e => e.maChucVu !== record.maChucVu)
            });
        }
    }
    onDeleteAllRecord = async() => {
        if (window.confirm("Xóa mục đã chọn")){
            await deleteChucVu(this.state.selectedRowKeys);
            this.getAllChucvu();
            this.setState(
                {
                    selectedRowKeys: []
                }
            )
        }
    }
    render(){
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
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
                    icon="plus-square-o" onClick={this.showModal}>Thêm chức vụ</Button>
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
                <Table rowKey='maChucVu' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                <Modal
                    onCancel={this.handleCancel}
                    title={this.state.isUpdate === false ? "Thêm Chức vụ mới" : "Cập nhật chức vụ"}
                    visible={this.state.visible}
                    footer={[
                        <Button form="addChucvuForm" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>

                    ]}
                    >
                    <Form id="addChucvuForm" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Mã chức vụ"
                        >
                            {getFieldDecorator('maChucVu', {
                                initialValue: this.state.dataForm.maChucVu,
                            })(
                                (this.state.isUpdate) === true ? <Input disabled /> : <Input disabled/>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên chức vụ"
                        >
                            {getFieldDecorator('tenChucVu', {
                                initialValue: this.state.dataForm.tenChucVu,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên chức vụ!',
                                }, {
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
                                initialValue: this.state.dataForm.moTa,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập mô tả!',
                                }, {
                                    validator : checkDaiQua255KyTu
                                }, {
                                    validator : checkKyTuDacBiet
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

export default Form.create()(Chucvu);