import React, { Component } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import { getAllNhaCungCap } from '../../../Services/api';
import { Link } from 'react-router-dom';

class SelectedNhaCungCap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstNCC: []
        }
    }


    loadData = async () => {
        let NhaCungCap = await getAllNhaCungCap();
        this.setState({
            lstNCC: NhaCungCap
        })
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <h3>Nhập từ nhà cung cấp?</h3>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.lstNCC}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://flatworld.com.vn/wp-content/uploads/2017/10/Icon-About-Us.png" />}
                                    title={<Link to={"/app/nhapkho/" + item.maNCC}>{item.tenNCC}</Link>}
                                    description={"[" + item.maNCC + "] - " + item.diaChi}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={6}></Col>
            </Row>
        );
    }
}

export default SelectedNhaCungCap;