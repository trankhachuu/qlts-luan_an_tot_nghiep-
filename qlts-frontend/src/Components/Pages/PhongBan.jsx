import React, { Component } from 'react';
import { Modal, Button, Table, Divider, Form, Input } from 'antd';
import { getAllPhongBan, addNewPhongBan, updatePhongBan, deletePhongBan,deleteByListPhongBan } from '../../Services/apitan';
import { checkDaiQua5KyTu, checkKyTuDacBiet, checkDaiQua255KyTu } from '../../Utils/ValidateForm/NhapKhoValidate';

class PhongBan extends Component{
    state = {
        visible: false,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        columns:[{
            title: 'Mã Phòng Ban',
            dataIndex: 'maPhongBan',
        },{
            title:'Tên Phòng Ban',
            dataIndex:'tenPhongBan',
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
        maPhongBan:'',
        tenPhongBan:'',
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
                maPhongBan : '',
                tenPhongBan: '',
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
    getAllPhongBan = async () => {
        let data = await getAllPhongBan();
        this.setState({
            data: data
        });
    }
    componentDidMount(){
        this.getAllPhongBan();
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                if(this.state.isUpdate === false){
                    let res = await addNewPhongBan(values);
                    if(res){
                        this.setState({
                            data:[res, ...this.state.data]
                        });
                        this.handleCancel();
                    }
                }else{
                    let res = await updatePhongBan(values);
                    var item = this.state.data.find(function(element){
                        return element.maPhongBan === values.maPhongBan;
                    });

                    item.maPhongBan = res.maPhongBan;
                    item.tenPhongBan = res.tenPhongBan;
                    this.handleCancel();
        
                }

            }
        } )
    }
    deleteFunction = async(record) =>{
        if(window.confirm("Xóa" + record.maPhongBan)){
            await deletePhongBan(record.maPhongBan);
            this.setState({
                data: this.state.data.filter(e => e.maPhongBan !== record.maPhongBan)
            });
        }
    }
    onDeleteAllRecord = async() => {
        if (window.confirm("Xóa mục đã chọn")){
            await deleteByListPhongBan(this.state.selectedRowKeys);
            this.getAllPhongBan();
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
                    icon="plus-square-o" onClick={this.showModal}>Thêm Phòng Ban</Button>
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
                <Table rowKey='maPhongBan' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                <Modal
                    onCancel={this.handleCancel}
                    title={this.state.isUpdate === false ? "Thêm Phòng Ban mới" : "Cập nhật Phòng Ban"}
                    visible={this.state.visible}
                    footer={[
                        <Button form="addPhongBanForm" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>

                    ]}
                    >
                    <Form id="addPhongBanForm" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Mã Phòng Ban"
                        >
                            {getFieldDecorator('maPhongBan', {
                                initialValue: this.state.dataForm.maPhongBan,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập Mã Phòng Ban !!!',
                                },{
                                    validator : checkDaiQua5KyTu
                                }, {
                                    validator : checkKyTuDacBiet
                                }],
                            })(
                                (this.state.isUpdate) === true ? <Input disabled /> : <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Tên Phòng Ban"
                        >
                            {getFieldDecorator('tenPhongBan', {
                                initialValue: this.state.dataForm.tenPhongBan,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên Phòng Ban !!!',
                                },{
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

export default Form.create()(PhongBan);