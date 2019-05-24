import React, { Component } from 'react';
import { Row, Col, List, Avatar, Table } from 'antd';
import { getAllPhieuYeucau, getAllByIdPhieuYeucau } from '../../../Services/apiHuu';


class SeeDetailedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [{
                title: 'Mã chi tiết',
                dataIndex: 'maCT',
            }
                , {
                title: 'đơn vị tính',
                dataIndex: 'donViTInh',
            },
            {
                title: 'Quy cách đặt tính',
                dataIndex: 'quyCach_DatTinh',
            },
            {
                title: 'Số lượng',
                dataIndex: 'soLuong',
            },
            {
                title: 'Tên thiết bị',
                dataIndex: 'tenThietBi',
            }
        ],
        dataList: []
        }
    }
    getAllPhieuYeucau = async () => {
        let data = await getAllPhieuYeucau();
        this.setState({
            data: data
        });
    }

    componentDidMount() {
        this.getAllPhieuYeucau();
    }

    onShowTable = async (dataId) => {
        let data = await getAllByIdPhieuYeucau(dataId);
        this.setState({
            dataList : data
        });
        // console.log(data);
    }

    render() {
        var { data, dataList } = this.state;
        return (
            <div>
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ padding: '10px' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        key = {index}
                                        avatar={<Avatar>{index + 1}</Avatar>}
                                        title={<span onClick = {() => this.onShowTable(item.maPhieu)}>Phiếu {item.maPhieu}</span>}
                                        description={item.mucDich}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} style={{ padding: '10px', marginTop : '20px' }}>
                        {dataList.length > 0 ? <Table style={{ marginTop: '10px', marginLeft: '10px', textAlign : 'center' }} rowKey='maCT' columns={this.state.columns} dataSource={dataList} /> : ''}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SeeDetailedList;