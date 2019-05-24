import React, { Component } from 'react';
import { getThietBiRefNhanVien } from '../../Services/apiHuu.js';
import { thuHoiThietBi } from '../../Services/api';
import { Row, Table, Button } from "antd";
import history from '../../Utils/history'

class ThietBiThuocNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: 'Mã thiết bị',
                dataIndex: 'maThietBi',
            }, {
                title: 'Tên thiết bị',
                dataIndex: 'tenThietBi',
            },
            {
                title: 'Tên nhân viên',
                dataIndex: 'tenNhanVien',
            },
            {
                title: 'Giá trị',
                dataIndex: 'giaTri',
            },
            {
                title: 'Khấu hao',
                dataIndex: 'khauHao',
            },
            {
                title: 'Ngày nhập',
                dataIndex: 'ngayNhap',
            },
            {
                title: 'Bảo hành',
                dataIndex: 'baoHanh',
            },
            {
                title: 'Tên tình trạng',
                dataIndex: 'tenTinhTrang',
            },
            {
                title: 'Tên nhà cung cấp',
                dataIndex: 'tenNhaCungCap',
            },
            ],
            dataThietbi: [],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,   // 
        }
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    componentDidMount() {
        this.getDanhSachthietbiByIdNhanVien();
    }

    getDanhSachthietbiByIdNhanVien = async () => {
        let dsThietbi = this.props.match.params.id;
        let data = await getThietBiRefNhanVien(dsThietbi);
        this.setState({
            dataThietbi: data
        });
    }

    thuHoiThietBi = async () => {
        var res = await thuHoiThietBi(this.state.selectedRowKeys);
        if (res) {
            // chuyen den trang ds ban giao
            history.push('/app/phieubangiao/' + res.maBanGiao);
        }
    }

    render() {
        var { dataThietbi, columns, selectedRowKeys, loading } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Row>
                    <div style={{ borderBottom: 'solid 2px #8df1d8', textTransform: 'uppercase', marginBottom: '5px' }}><h3>Danh sách thiết bị của nhân viên {` ${this.props.match.params.id}`}</h3></div>
                </Row>
                <Button
                    style={{ marginLeft: '5px' }}
                    type="danger"
                    disabled={!hasSelected}
                    loading={loading}
                    onClick={this.thuHoiThietBi}
                >Thu hồi thiết bị</Button>

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

                {
                    dataThietbi ?
                        <Table rowKey='maThietBi' style={{ marginTop: '10px' }} rowSelection={rowSelection} columns={columns} dataSource={dataThietbi} /> :
                        <div style={{ textAlign: 'center', marginTop: '20px' }}><img height="50px" src="https://ledpanasonic.110.vn/files/product/1132/09-09-2018/blueloadingicon_Co30a4a3.gif" /></div>
                }

            </div>
        );
    }
}

export default ThietBiThuocNhanVien;