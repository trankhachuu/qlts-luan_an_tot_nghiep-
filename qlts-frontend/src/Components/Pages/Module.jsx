// import React, { Component } from 'react';
// import { Modal, Button, Table, Divider, Form, Input } from 'antd';
// import { getAllModule, addNewModule, updateModule, deleteModule, deleteModuleByList } from "../../Services/api";

// class Module extends Component {
//     state = {
//         visible: false,
//         selectedRowKeys: [], // Check here to configure the default column
//         loading: false,
//         data: [],
//         columns: [{
//             title: 'ID',
//             dataIndex: 'moduleID',
//         }, {
//             title: 'Họ tên',
//             dataIndex: 'moduleName',
//         }, {
//             title: 'Điều khiển',
//             fixed: 'right',
//             width: 150,
//             render: (text, record) => {
//                 return <div>
//                     <span className="span-link"
//                         onClick={() => this.editFunction(record)}
//                     >Chỉnh sửa</span>

//                     <Divider type="vertical" />

//                     <span className="span-link"
//                         onClick={() => this.deleteFunction(record)}> Xóa</span>
//                 </div>
//             }
//         }],
//         isUpdate: false,
//         dataForm: {
//             moduleID: '',
//             moduleName: ''
//         }
//     }

//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     }

//     handleCancel = (e) => {
//         this.props.form.resetFields();
//         this.setState({
//             visible: false,
//             isUpdate: false,
//             dataForm: {
//                 moduleID: '',
//                 moduleName: ''
//             }
//         });
//     }

//     // on table

//     start = () => {
//         this.setState({ loading: true });
//         // ajax request after empty completing
//         setTimeout(() => {
//             this.setState({
//                 selectedRowKeys: [],
//                 loading: false,
//             });
//         }, 1000);
//     }

//     onSelectChange = (selectedRowKeys) => {
//         this.setState({ selectedRowKeys });
//     }

//     editFunction = (record) => {
//         this.setState({
//             dataForm: record,
//             visible: true,
//             isUpdate: true
//         });
//     }

//     deleteFunction = async (record) => {
//         if (window.confirm("Xóa " + record.fullName)) {
//             await deleteModule(record.userID);
//             this.setState({
//                 data: this.state.data.filter(e => e.userID !== record.userID)
//             });
//         }
//     }

//     // send request to get data

//     getAllUser = async () => {
//         let data = await getAllModule();
//         this.setState({
//             data: data
//         });
//     }

//     // function in life cycle
//     componentDidMount() {
//         this.getAllUser();
//     }

//     //submitform
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields(async (err, values) => {
//             if (!err) {
//                 if (this.state.isUpdate === false) {
//                     let res = await addNewModule(values);
//                     if (res) {
//                         this.setState({
//                             data: [res, ...this.state.data]
//                         });
//                         this.handleCancel();
//                     }
//                 } else {
//                     let res = await updateModule(values);
//                     var item = this.state.data.find(function (element) {
//                         return element.userID === values.userID;
//                     });

//                     item.userID = res.userID;
//                     item.username = res.username;
//                     item.fullName = res.fullName;
//                     this.handleCancel();
//                 }
//             }
//         });
//     }

//     onDeleteAllRecord = async () => {

//         if (window.confirm("Xóa mục đã chọn?")) {
//             await deleteModuleByList(this.state.selectedRowKeys);
//             this.getAllUser();
//             this.setState({
//                 selectedRowKeys: []
//             })
//         }
//     }

//     render() {
//         const { loading, selectedRowKeys } = this.state;
//         const rowSelection = {
//             selectedRowKeys,
//             onChange: this.onSelectChange,
//         };
//         const hasSelected = selectedRowKeys.length > 0;

//         //setup form
//         const { getFieldDecorator } = this.props.form;
//         const formItemLayout = {
//             labelCol: {
//                 xs: { span: 24 },
//                 sm: { span: 7 },
//             },
//             wrapperCol: {
//                 xs: { span: 24 },
//                 sm: { span: 16 },
//             },
//         };
//         return (
//             <div>
//                 <Button
//                     type="primary"
//                     icon="plus-square-o" onClick={this.showModal}>Thêm module</Button>
//                 <Button
//                     style={{ marginLeft: '5px' }}
//                     type="danger"
//                     onClick={this.onDeleteAllRecord}
//                     disabled={!hasSelected}
//                     loading={loading}
//                 >Xóa mục chọn</Button>
//                 <Button
//                     style={{ marginLeft: '5px' }}
//                     type="dashed"
//                     onClick={this.start}
//                     disabled={!hasSelected}
//                     loading={loading}
//                 >Bỏ chọn tất cả</Button>
//                 <span style={{ marginLeft: 8 }}>
//                     {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//                 </span>
//                 <Table rowKey='userID' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
//                 <Modal
//                     onCancel={this.handleCancel}
//                     title={this.state.isUpdate === false ? "Tạo module mới" : "Cập nhật module"}
//                     visible={this.state.visible}
//                     footer={[
//                         <Button form="addUserForm" key="submit" type="primary" htmlType="submit">
//                             Submit </Button>,
//                         <Button key="cancel" onClick={this.handleCancel}>
//                             Đóng </Button>
//                     ]}
//                 >
//                     <Form id="addUserForm" onSubmit={this.handleSubmit}>
//                         <Form.Item
//                             {...formItemLayout}
//                             hasFeedback
//                             label="User ID"
//                         >
//                             {getFieldDecorator('userID', {
//                                 initialValue: this.state.dataForm.userID,
//                                 rules: [{
//                                     required: true, message: 'Yêu cầu nhập ID!',
//                                 }],
//                             })(
//                                 (this.state.isUpdate) === true ? <Input disabled /> : <Input />
//                             )}
//                         </Form.Item>

//                         <Form.Item
//                             {...formItemLayout}
//                             hasFeedback
//                             label="Họ tên"
//                         >
//                             {getFieldDecorator('fullName', {
//                                 initialValue: this.state.dataForm.fullName,
//                                 rules: [{
//                                     required: true, message: 'Yêu cầu nhập họ tên!',
//                                 }],
//                             })(
//                                 <Input />
//                             )}
//                         </Form.Item>

//                         <Form.Item
//                             {...formItemLayout}
//                             hasFeedback
//                             label="Tên đăng nhập"
//                         >
//                             {getFieldDecorator('username', {
//                                 initialValue: this.state.dataForm.username,
//                                 rules: [{
//                                     required: true, message: 'Yêu cầu nhập tên đăng nhập!',
//                                 }],
//                             })(
//                                 <Input />
//                             )}
//                         </Form.Item>
//                         <Form.Item
//                             {...formItemLayout}
//                             hasFeedback
//                             label="Mật khẩu"
//                         >
//                             {getFieldDecorator('password')(
//                                 <Input />
//                             )}
//                         </Form.Item>
//                     </Form>
//                 </Modal>
//             </div>
//         );
//     }
// }

// export default Form.create()(Module);