import React, { Component } from 'react';
import { Layout } from 'antd';
import history from '../../Utils/history';
import '../../Styles/Layout.css';
import Nav from '../Layout/Nav';
import Sidebar from '../Layout/Sidebar';
import MyBreadcrumb from '../Layout/MyBreadcrumb';
import ContentRouter from '../../Routers/ContentRouter';
import { connect } from 'react-redux';
import { getFunctionMenu, getInfoUser } from '../../Services/api';
import { getToken } from '../../Utils/token';

const { Content } = Layout;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            lstMenu: [],
            lstSubMenu: [],
            currenKey: "none",
        }
    }

    handleMenuClick = (e) => {
        for (let i = 0; i < this.state.lstMenu.length; i++) {
            if (btoa(this.state.lstMenu[i].moduleID) === e.key) {
                this.setState({
                    lstSubMenu: this.state.lstMenu[i].lstFunction,
                    currenKey: e.key
                });
                break;
            }
        }
    }

    updateBreadcrumb = (e) => {
        let breadArray = [];
        let key = this.state.currenKey;
        let a = this.state.lstMenu.find(function (element) {
            return element.moduleID === parseInt(atob(key), 10);
        });
        breadArray = [...breadArray, {
            name: a.modulName,
            icon: 'none'
        }]

        let b = this.state.lstSubMenu.find(function (element) {
            return element.functionID === parseInt(e.key, 10);
        });
        breadArray = [...breadArray, {
            name: b.functionName,
            icon: b.iconType
        }]
        this.props.dispatch({
            type: 'UPDATE_PATH',
            item: breadArray
        });
    }

    runGetInfoUser = async () => {
        let data = await getInfoUser();
        let { dispatch } = this.props;
        dispatch({
            type: 'ADD_INFO_USER',
            item: data
        });
        this.getLstMenu();
    }

    componentDidMount() {
        let token = getToken();
        if (token)
            this.runGetInfoUser();
        else {
            history.push('/login');
        }
    }

    getLstMenu = async () => {
        let data = await getFunctionMenu();
        let functionPermission = [];
        if (data.length > 0) {
            data.forEach(element => {
                element.lstFunction.forEach(functionElement => {
                    functionPermission = [...functionPermission, functionElement.url];
                });
            });
        }

        let { dispatch } = this.props;
        dispatch({
            type: 'ADD_PERMISSION',
            item: functionPermission
        });

        this.setState({
            lstMenu: data,
            // currenKey: btoa(data[0].moduleID)
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout style={{height: "calc(100vh)"}}>
                <Sidebar handleClickMenu={this.updateBreadcrumb.bind()} lstSubMenu={this.state.lstSubMenu} collapsed={this.state.collapsed}></Sidebar>
                <Layout style={{ background: '#fff' }}>
                    <Nav currenKey={this.state.currenKey} handleMenuClick={this.handleMenuClick} lstMenu={this.state.lstMenu} collapsed={this.state.collapsed} toggle={this.toggle}></Nav>
                    <MyBreadcrumb data={this.props.path} style={{ padding: '10px 10px 10px 17px', background: 'rgb(250, 250, 250)', marginTop: '64px' }}></MyBreadcrumb>
                    <Content style={{ padding: '16px 12px', background: '#fff' }}>
                        <ContentRouter></ContentRouter>
                    </Content>
                    {/* <MyFooter></MyFooter> */}
                </Layout>
            </Layout>
        );
    }
}

export default connect(function (state) {
    return { path: state.path, PermissionReducer: state.PermissionReducer }
})(Dashboard);