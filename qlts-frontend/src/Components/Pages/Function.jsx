import React, { Component } from 'react';
import { message, Row, Col, Button, Menu, Table, Divider, Modal, Form, Input, TreeSelect, Icon, Switch } from 'antd';
import { getAllModule, getFunctionByModuleID, addNewModule, updateModule, deleteModule, addNewFunction, deleteFunctionByID, deleteFunctionByList, updateFunction } from '../../Services/api';
import Icons from '../../Utils/Icons';
import { checkDaiQua128KyTu, checkKyTuDacBiet } from '../../Utils/ValidateForm/NhapKhoValidate';
const SelectTreeNode = TreeSelect.TreeNode;

const iconsTree = [];
for (let item of Icons) {
    let chidren = [];
    for (let child of item.icons) {
        chidren.push(<SelectTreeNode value={child.icon} title={<span><Icon type={child.icon} style={{ color: '#08c' }} /> &nbsp;&nbsp;{child.title}</span>} key={child.icon} />)
    }
    iconsTree.push(<SelectTreeNode title={item.title} key={item.title}>{chidren}</SelectTreeNode>)
}

class Function extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            functionIDUpdate: null,
            visibleAddModule: 'none',
            moduleSelected: null,
            modules: [],
            functionData: [],
            iconLoading: false,
            isUpdateModule: false,
            isUpdate: false,
            columns: [{
                title: 'ID',
                dataIndex: 'functionID',
            },
            {
                title: 'Tên chức năng',
                dataIndex: 'functionName',
            },
            {
                title: 'icon',
                dataIndex: 'iconType',
            },
            {
                title: 'URL',
                dataIndex: 'url',
            },
            {
                title: 'Cho phép hiển thị',
                render: (text, record) => {
                    if (record.enable === true) {
                        return (
                            'Cho phép'
                        )
                    } else {
                        return (
                            'Không cho phép'
                        )
                    }

                }
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
            selectedRowKeys: [], // Check here to configure the default column
            dataForm: {
                functionID: '',
                functionName: '',
                iconType: '',
                url: ''
            }
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

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    }

    //set height
    setHeight = () => {
        var visiblea = 'true';
        if (this.state.visibleAddModule === 'none')
            visiblea = 'block';
        this.setState({
            visibleAddModule: visiblea,
            isUpdateModule: false
        });
        this.refs.moduleName.value = "";
    }

    //get data from server
    getAllModules = async () => {
        try {
            let modules = await getAllModule();
            let functions = await getFunctionByModuleID(modules[0].moduleID);
            this.setState({
                modules: modules,
                moduleSelected: this.state.moduleSelected === null ? modules[0].moduleID : this.state.moduleSelected,
                functionData: functions
            });
        } catch (e) { }
    }
    // Sử dụng JSX trong omponent 

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

    //on module list
    //map data to module list
    mapFunction = () => {
        return this.state.modules.map(item => {
            return (
                <Menu.Item key={item.moduleID}>
                    <span>{item.moduleName}</span>
                </Menu.Item>
            )
        });
    }

    handleOnClickItem = async (e) => {
        let moduleID = e.key;
        let functions = await getFunctionByModuleID(moduleID);
        let moduleItem = this.state.modules.find(element => {
            return element.moduleID.toString() === e.key
        });
        this.refs.moduleName.value = moduleItem.moduleName;
        this.setState({
            moduleSelected: moduleID,
            functionData: functions,
            isUpdateModule: true,
            visibleAddModule: 'block'
        });
    }

    deleteModuleSelected = async () => {
        if (window.confirm("Xóa module đã chọn đã chọn?")) {
            await deleteModule(this.state.moduleSelected);
            this.setState({ modules: [] })
            this.getAllModules();
        }
    }

    themModule = async () => {
        this.setState({ iconLoading: true });
        if (this.refs.moduleName.value.length >= 1) {
            if (this.state.isUpdateModule === false) {
                let newModule = await addNewModule({ moduleName: this.refs.moduleName.value });

                setTimeout(() => {
                    this.setState({ modules: [...this.state.modules, newModule], iconLoading: false });
                    this.refs.moduleName.value = "";
                }, 600);
            } else {
                await updateModule({ moduleID: this.state.moduleSelected, moduleName: this.refs.moduleName.value });
                this.setState({ iconLoading: false });
                this.getAllModules();
            }
        } else {
            message.error("Tên module không được để trống.");
            this.setState({ iconLoading: false })
        }
    }

    editFunction = (record) => {
        this.setState({
            dataForm: record,
            visible: true,
            isUpdate: true,
            functionIDUpdate: record.functionID
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.state.isUpdate === false) {
                    let newFunction = await addNewFunction({ functionName: values.functionName, url: values.url, iconType: values.iconType, moduleID: this.state.moduleSelected, enable: values.enable });
                    this.setState({
                        functionData: [newFunction, ...this.state.functionData]
                    })
                    this.handleCancel();
                } else {
                    let idUpdate = this.state.functionIDUpdate;
                    let res = await updateFunction({ functionID: this.state.functionIDUpdate, functionName: values.functionName, url: values.url, iconType: values.iconType, moduleID: this.state.moduleSelected, enable: values.enable });
                    var item = this.state.functionData.find(function (element) {
                        return element.functionID.toString() === idUpdate.toString();
                    });

                    item.functionID = res.functionID;
                    item.functionName = res.functionName;
                    item.iconType = res.iconType;
                    item.url = res.url;
                    item.enable = res.enable;
                    this.handleCancel();
                }
            }
        });
    }

    deleteFunction = async (record) => {
        if (window.confirm("Xóa " + record.functionName)) {
            await deleteFunctionByID(record.functionID);
            this.setState({
                functionData: this.state.functionData.filter(element => element.functionID.toString() !== record.functionID.toString())
            })
        }
    }

    deleteFunctionSelected = async () => {
        if (window.confirm("Xóa các mục đã chọn?")) {
            let recordDelete = await deleteFunctionByList(this.state.selectedRowKeys);
            message.success("Đã xóa " + recordDelete + " function thành công!");
            let lstNew = [...this.state.functionData];
            this.state.selectedRowKeys.forEach(element => {
                console.log(element);
                lstNew = lstNew.filter(e => {
                    return e.functionID !== element
                });
            });
            this.setState({ functionData: lstNew });
        }
    }

    //component in life cycle
    componentDidMount() {
        this.getAllModules();
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
                <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{ padding: '10px', backgroundColor: '#fafafa' }}>
                        <Button
                            size="small"
                            type="primary"
                            icon="plus-square-o" onClick={this.setHeight}>Thêm module</Button>
                        <Button
                            style={{ marginLeft: '5px' }}
                            size="small"
                            type="danger"
                            icon="minus" onClick={this.deleteModuleSelected}>Xóa mục chọn</Button>
                        {/* render list */}
                        <Row style={{ display: this.state.visibleAddModule }}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <input ref="moduleName" style={{ marginTop: '10px' }} className="pg_collapse_moduleadd ant-input" type="text" placeholder="Module name"></input>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Button onClick={this.themModule} style={{ marginTop: '10px', marginLeft: '5px', width: '100%' }} type="primary" loading={this.state.iconLoading}>
                                    {this.state.isUpdateModule === false ? 'Thêm' : "Cập nhật"}
                                </Button>
                            </Col>
                        </Row>


                        <Menu style={{ background: 'none', marginTop: '10px' }}
                            className="left_menu"
                            onClick={this.handleOnClickItem}
                            mode="inline"
                            defaultSelectedKeys={['1']}>
                            {this.mapFunction()}
                        </Menu>


                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18} xl={18} style={{ padding: '10px' }}>
                        <Button
                            size="small"
                            type="primary"
                            icon="plus-square-o" onClick={this.showModal}>Thêm function</Button>
                        <Button
                            size="small"
                            style={{ marginLeft: '5px' }}
                            type="danger"
                            onClick={this.deleteFunctionSelected}
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
                        <Table rowKey='functionID' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.functionData} />
                    </Col>
                </Row>

                <Modal
                    onCancel={this.handleCancel}
                    title={this.state.isUpdate === false ? "Thêm chức năng mới" : "Cập nhật chức năng"}
                    visible={this.state.visible}
                    footer={[
                        <Button form="addFunctionForm" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>
                    ]}
                >
                    <Form id="addFunctionForm" onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Function Name"
                        >
                            {getFieldDecorator('functionName', {
                                initialValue: this.state.dataForm.functionName,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập họ tên!',
                                },{
                                    validator : checkDaiQua128KyTu
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
                            label="Đường dẩn (url)"
                        >
                            {getFieldDecorator('url', {
                                initialValue: this.state.dataForm.url,
                                rules: [{
                                    required: true, message: 'Yêu cầu nhập tên đăng nhập!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="icon"
                        >
                            {getFieldDecorator('iconType', { initialValue: this.state.dataForm.iconType })(
                                <TreeSelect
                                    showSearch
                                    dropdownStyle={{ overflow: 'auto' }}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                >
                                    {iconsTree}
                                </TreeSelect>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Cho phép hiển thị"

                        >
                            {getFieldDecorator('enable', { initialValue: this.state.dataForm.enable, valuePropName: 'checked' })(
                                <Switch />
                            )}
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

export default Form.create()(Function);