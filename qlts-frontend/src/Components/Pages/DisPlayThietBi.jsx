import React, { Component } from 'react';
import { Select, Row, Table } from "antd";
import { getAllThietBi, getAllThietBiByTinhTrang, getAllThietBiByPhieuThanhLy } from '../../Services/apiHuu';
import history from '../../Utils/history.js';
const Option = Select.Option;


class DisPlayThietBi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    title: 'Mã thiết bị',
                    dataIndex: 'maTB'
                },
                {
                    title: 'Tên thiết bị',
                    dataIndex: 'tenThietBi'
                },
                {
                    title: 'Bảo hành',
                    dataIndex: 'baoHanh'
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'giaTri'
                },
                {
                    title: 'Khấu hao',
                    dataIndex: 'khauHao'
                },
                {
                    title: 'Ngày nhập',
                    dataIndex: 'ngayNhap'
                },
                {
                    title: 'Tên đơn vị tính',
                    dataIndex: 'tenDonViTinh'
                },
                {
                    title: 'Tên phòng ban',
                    dataIndex: 'tenPhongBan'
                },
                {
                    title: 'Tên tình trạng',
                    dataIndex: 'tenTinhTrang'
                }, {
                    title: 'Điều khiển',
                    fixed: 'right',
                    width: 100,
                    render: (text, record) => {
                        return <div>
                            <span className="span-link" onClick={() => {
                                history.push('/app/ttheodoi/' + record.maTB);
                            }}>Theo dõi</span>
                        </div>
                    }
                }
            ]
        }
    }

    getAllThietBi = async () => {
        let data = await getAllThietBi();
        this.setState({ data: data })
    }

    componentDidMount() {
        this.getAllThietBi();
    }

    onChange = async (value) => {
        if (value === 1) {
            let data = await getAllThietBiByTinhTrang();
            this.setState({ data: data })
        } else if (value === 0) {
            let data = await getAllThietBiByPhieuThanhLy();
            this.setState({ data: data })
        } else {
            this.getAllThietBi();
        }
    }

    render() {
        var { data, columns } = this.state;
        return (
            <div>
                <Row>
                    <div>
                        <h3>Hiển thị danh sách thiết bị</h3>
                    </div>
                    <div />
                    <div style={{ backgroundColor: '#f1f1f1', paddingTop: '10px' }}>
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-16">
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-24">
                                <div className="ant-form-item-control">
                                    <span className="ant-form-item-children">
                                        <Select
                                            showSearch
                                            style={{ width: 250 }}
                                            placeholder="Danh sách thiết bị"
                                            optionFilterProp="children"
                                            onChange={this.onChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="">Danh sách tất cả thiết bị</Option>
                                            <Option value={1}>Danh sách thiết bị trong kho</Option>
                                            <Option value={0}>Danh sách thiết bị đã thanh lý</Option>
                                        </Select>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                <Table rowKey='maTB' style={{ marginTop: '10px' }} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default DisPlayThietBi;