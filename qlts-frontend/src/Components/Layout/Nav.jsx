import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import '../../Styles/Header.css';
import { getToken, removeToken } from '../../Utils/token'
import history from '../../Utils/history';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
class Nav extends Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    logout = () => {
        // const { history } = this.props;
        if (getToken() !== null) {
            removeToken();
            message.success("Đăng xuất thành công.");
            setTimeout(() => {
                history.push('/login');
            }, 1500);

        }
    }

    getDataMenu() {

    }

    renderMenu() {
        return this.props.lstMenu.map(item => {
            return (
                <Menu.Item key={btoa(item.moduleID)} className="menu_header_item">
                    {item.modulName}
                </Menu.Item>
            )
        })
    }

    render() {
        return (
            <Header className="header_app" style={{ padding: 0, height: 'auto', position: 'fixed', width: '100%', zIndex: 9 }}>

                <Row type="flex" justify="start">
                    <Col md={1}>
                        <Icon
                            className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    </Col>

                    <Col md={18}>
                        <Menu
                            onClick={this.props.handleMenuClick}
                            selectedKeys={[this.props.currenKey]}
                            mode="horizontal"
                            className={'menu_header'}
                        >
                            <Menu.Item key='default' className="menu_header_item">
                                <Link to="/">HomePage</Link>
                            </Menu.Item>
                            {this.renderMenu()}
                        </Menu>
                    </Col>
                    <Col md={2}>
                        <Menu
                            className="menu_canhan"
                            mode="horizontal"
                            style={{ lineHeight: '64px' }}
                            onClick={this.menuClick}
                        >
                            <Menu.SubMenu title={<span className="avatar"><img height='50px' src='http://localhost:3000/avatar.png' alt="avatar" /><i className="on bottom b-white" /></span>}>
                                <Menu.ItemGroup title={this.props.config.fullName}>
                                <Menu.Item key="info"><span onClick={this.logout}><Icon type="user" />Quản lý thông tin cá nhân</span></Menu.Item>
                                    <Menu.Item key="logout"><span onClick={this.logout}><Icon type="logout" />Logout</span></Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default connect(function (state) {
    return { config: state.config }
})(Nav);