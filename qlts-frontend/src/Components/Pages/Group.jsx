import React, { Component } from 'react';
import { message, Row, Col, Button, Menu, Table, Modal, Tree } from 'antd';
import {
    getAllGroup, addNewGroup, updateGroup, deleteGroup, getAllFunctionByGroupID, getAllFunctionGroupByModule, getAllFunctionSelectedByGroup, updateFunctionByGroupID
} from '../../Services/api';
const { TreeNode } = Tree;

class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            functionIDUpdate: null,
            visibleAddGroup: 'none',
            groupSelected: null,
            groups: [],
            functionData: [],
            iconLoading: false,
            isUpdateGroup: false,
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
            }],
            //on tree
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            functionTree: []
        }
    }

    // onTree selected

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    }

    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
    }

    renderTreeNodes = data => {
        const iconsTree = [];
        for (let item of data) {
            let chidren = [];
            for (let child of item.lstFunction) {
                chidren.push(<TreeNode title={child.functionName} key={child.functionID} dataRef={child}></TreeNode>)
            }
            iconsTree.push(<TreeNode title={item.functionName} key={'module_' + item.functionID} dataRef={item}>{chidren}</TreeNode>)
        }
        return iconsTree;
    }

    //on modal form
    showModal = async () => {
        let functionSelected;
        functionSelected = await getAllFunctionSelectedByGroup(this.state.groupSelected);
        console.log(functionSelected);
        this.setState({ checkedKeys: functionSelected });
        this.getFunctionGroupByID();
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    }

    //set height
    setHeight = () => {
        var visiblea = 'true';
        if (this.state.visibleAddGroup === 'none')
            visiblea = 'block';
        this.setState({
            visibleAddGroup: visiblea,
            isUpdateGroup: false
        });
        this.refs.groupNameAdd.value = "";
    }

    //get data from server
    getAllGroups = async () => {
        let groups = await getAllGroup();
        let functions = await getAllFunctionByGroupID(groups[0].groupID);
        this.setState({
            groups: groups,
            groupSelected: this.state.groupSelected === null ? groups[0].groupID : this.state.groupSelected,
            functionData: functions
        });
    }

    getFunctionGroupByID = async () => {
        let data = await getAllFunctionGroupByModule();
        this.setState({ functionTree: data })
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

    //on module list
    //map data to module list
    mapListGroups = () => {
        return this.state.groups.map(item => {
            return (
                <Menu.Item key={item.groupID}>
                    <span>{item.groupName}</span>
                </Menu.Item>
            )
        });
    }

    handleOnClickItem = async (e) => {
        let groupID = e.key;
        let functions = await getAllFunctionByGroupID(groupID);
        let groupItem = this.state.groups.find(element => {
            return element.groupID.toString() === e.key
        });
        this.refs.groupNameAdd.value = groupItem.groupName;
        this.setState({
            groupSelected: e.key,
            functionData: functions,
            isUpdateGroup: true,
            visibleAddGroup: 'block'
        });
    }

    deleteGroupSelected = async () => {
        if (window.confirm("Xóa nhóm quyền đã chọn?")) {
            await deleteGroup(this.state.groupSelected);
            this.setState({ groups: [] })
            this.getAllGroups();
        }
    }

    addNewGroup = async () => {
        this.setState({ iconLoading: true });
        if (this.refs.groupNameAdd.value.length >= 1) {
            if (this.state.isUpdateGroup === false) {
                let groupNew = await addNewGroup({ groupName: this.refs.groupNameAdd.value });

                setTimeout(() => {
                    this.setState({ groups: [...this.state.groups, groupNew], iconLoading: false });
                    this.refs.groupNameAdd.value = "";
                }, 600);
            } else {
                await updateGroup({ groupID: this.state.groupSelected, groupName: this.refs.groupNameAdd.value });
                this.setState({ iconLoading: false });
                this.getAllGroups();
            }
        } else {
            message.error("Tên [group] không được để trống.");
            this.setState({ iconLoading: false })
        }
    }

    handleSubmit = async () => {
        let mang = this.state.checkedKeys.filter(element => {
            return element.substring(0, 7) !== 'module_'
        })
        let data = {
            groupID: this.state.groupSelected,
            lstFunction: [
                ...mang
            ]
        }
        let datasFunction = await updateFunctionByGroupID(data);
        console.log(datasFunction)
        this.setState({ functionData: datasFunction, visible: false })
    }

    //component in life cycle
    componentDidMount() {
        this.getAllGroups();
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{ padding: '10px', backgroundColor: '#fafafa' }}>
                        <Button
                            size="small"
                            type="primary"
                            icon="plus-square-o" onClick={this.setHeight}>Thêm mới group</Button>
                        <Button
                            style={{ marginLeft: '5px' }}
                            size="small"
                            type="danger"
                            icon="minus" onClick={this.deleteGroupSelected}>Xóa mục chọn</Button>
                        {/* render list */}
                        <Row style={{ display: this.state.visibleAddGroup }}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <input ref="groupNameAdd" style={{ marginTop: '10px' }} className="pg_collapse_moduleadd ant-input" type="text" placeholder="Tên nhóm quyền"></input>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Button onClick={this.addNewGroup} style={{ marginTop: '10px', marginLeft: '5px', width: '100%' }} type="primary" loading={this.state.iconLoading}>
                                    {this.state.isUpdateGroup === false ? 'Thêm' : "Cập nhật"}
                                </Button>
                            </Col>
                        </Row>


                        <Menu style={{ background: 'none', marginTop: '10px' }}
                            className="left_menu"
                            onClick={this.handleOnClickItem}
                            mode="inline"
                            defaultSelectedKeys={['1']}>
                            {this.mapListGroups()}
                        </Menu>


                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18} xl={18} style={{ padding: '10px' }}>
                        <Button
                            size="small"
                            type="primary"
                            icon="plus-square-o" onClick={this.showModal}>Chỉnh sửa quyền</Button>
                        <Table rowKey='functionID' style={{ marginTop: '10px' }}  columns={this.state.columns} dataSource={this.state.functionData} />
                    </Col>
                </Row>

                <Modal
                    onCancel={this.handleCancel}
                    title="Cập nhật chức năng"
                    visible={this.state.visible}
                    footer={[
                        <Button onClick={this.handleSubmit} key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>
                    ]}
                >
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {this.renderTreeNodes(this.state.functionTree)}
                    </Tree>
                </Modal>
            </div>
        );
    }
}

export default Permission;
