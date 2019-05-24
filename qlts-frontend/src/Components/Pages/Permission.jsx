import React, { Component } from 'react';
import { Row, Col, Button, Checkbox, Tree, } from 'antd';
import {
    getAllGroupAndCheck, getFunctionGroupByGroup, updatePermission, updateEnablePermission, getInfoUserByID
} from '../../Services/api';
const CheckboxGroup = Checkbox.Group;
const { TreeNode } = Tree;

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            checkedGrops: [],
            functionTree: [],
            userID: null,
            //on tree
            expandedKeys: [],
            autoExpandParent: false,
            checkedKeys: [],
            selectedKeys: [],
            infoUser: null
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
    //

    loadNhomQuyen = async (idUser) => {
        let groups = await getAllGroupAndCheck(idUser);
        let res = [];
        groups.lstGroups.forEach(element => {
            res = [...res, { label: element.groupName, value: element.groupID }]
        });
        this.setState({ checkedGrops: groups.checked, groups: res });
    }

    loadQuyen = async (id) => {
        let functions = await getFunctionGroupByGroup(id);
        let expanded = [];
        functions.lstFunctionGroupByGroup.forEach(element => {
            expanded = [...expanded, 'group_' + element.groupID];
        });
        this.setState({ functionTree: functions.lstFunctionGroupByGroup, checkedKeys: functions.lstCheck, expandedKeys: expanded });
    }

    loadPermissionOfUser = async () => {

    }

    onChangeGroups = (checkedValues) => {
        console.log('checked = ', checkedValues);
        this.setState({ checkedGrops: checkedValues });
    }

    componentDidMount() {
        this.setState({ userID: this.props.match.params.id });
        this.loadNhomQuyen(this.props.match.params.id);
        this.loadQuyen(this.props.match.params.id);
        this.loadInfoUser(this.props.match.params.id);
    }

    loadInfoUser = async (id) => {
        let data = await getInfoUserByID(id);
        if(data){
            this.setState({ infoUser: data });
        } else {
            alert("Mã không tồn tại")
        }
        
    }

    renderTreeNodes = data => {
        const iconsTree = [];
        for (let item of data) {
            let chidren = [];
            for (let child of item.lstFunction) {
                chidren.push(<TreeNode title={child.functionName} key={child.functionID} dataRef={child}></TreeNode>)
            }
            iconsTree.push(<TreeNode title={item.groupName} key={'group_' + item.groupID} dataRef={item}>{chidren}</TreeNode>)
        }
        return iconsTree;
    }

    handleUpdateGroup = async () => {
        // updatePermission
        let data = { userID: this.state.userID, groupIDs: [...this.state.checkedGrops] }

        if (window.confirm("Cập nhật group cho user?")) {
            await updatePermission(data);
            this.loadQuyen(this.state.userID);
        }
    }

    handleUpdatePermission = async () => {
        let lstFunction = this.state.checkedKeys.filter(element => {
            return element.toString().substring(0, 6) !== 'group_'
        })
        if (window.confirm("Cập nhật quyền cho user?")) {
            await updateEnablePermission(lstFunction, this.state.userID);
        }
    }


    render() {
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ padding: '10px', backgroundColor: 'rgba(0,250,154, 0.5)' }}>
                        <div className="user_avatar">
                            {this.state.infoUser !== null ? "[" + this.state.infoUser.userID + "]" : '...n/a'}
                        </div>
                        <h2 className="name_username">{this.state.infoUser !== null ? this.state.infoUser.fullName : 'n/a'}</h2>
                    </Col>
                    <Col xs={24} sm={24} md={5} lg={5} xl={5} style={{ padding: '10px', paddingLeft: '20px', backgroundColor: '#fafafa' }}>
                        <Col md={24} style={{ marginBottom: '10px' }}>
                            <Button onClick={this.handleUpdateGroup} size="small" type="primary">Cập nhật group</Button>
                        </Col>
                        <Col md={24}>
                            {this.state.groups.length > 0 ? <CheckboxGroup defaultValue={this.state.checkedGrops} options={this.state.groups} onChange={this.onChangeGroups} /> : 'Chờ load data'}
                        </Col>
                    </Col>
                    <Col xs={24} sm={24} md={13} lg={13} xl={13} style={{ padding: '10px', backgroundColor: 'rgba(126,192,238, 0.5)' }}>
                        <Col md={24} style={{ marginBottom: '10px' }}>
                            <Button onClick={this.handleUpdatePermission} size="small" type="primary">Cập nhật quyền</Button>
                        </Col>
                        <Col md={24}>
                            {this.state.functionTree.length > 0 ? <Tree
                                checkable
                                expandedKeys={this.state.expandedKeys}
                                onExpand={this.onExpand}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                                onSelect={this.onSelect}
                                selectedKeys={this.state.selectedKeys}
                            >
                                {this.renderTreeNodes(this.state.functionTree)}
                            </Tree> : 'Loadding data...'}
                        </Col>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Group;